import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  formatTemperature,
  formatWaveHeight,
  formatWindSpeed,
} from "../../utils/buoyDataFormatter";

// Fix for default markers in react-leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const MapWrapper = styled(Paper)(({ theme }) => ({
  height: "400px",
  width: "100%",
  overflow: "hidden",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  "& .leaflet-container": {
    height: "100%",
    width: "100%",
    borderRadius: "12px",
  },
  // Custom Leaflet popup styling to match brand colors
  "& .leaflet-popup": {
    marginBottom: "20px",
    zIndex: "1001 !important", // Higher than sidebar to ensure visibility
  },
  "& .leaflet-popup-content-wrapper": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: "12px",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.32)",
    fontFamily: theme.typography.fontFamily,
    padding: "0",
    minWidth: "280px",
    maxWidth: "320px",
    zIndex: "1001 !important", // Higher than sidebar
    position: "relative",
  },
  "& .leaflet-popup-content": {
    margin: "0",
    fontSize: "14px",
    lineHeight: "1.4",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    overflow: "visible",
  },
  "& .leaflet-popup-close-button": {
    color: theme.palette.text.secondary,
    fontSize: "18px",
    fontWeight: "bold",
    padding: "8px",
    top: "8px",
    right: "8px",
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    zIndex: "1002 !important",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
  },
  "& .leaflet-popup-tip": {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderTop: "none",
    borderRight: "none",
    zIndex: "1001 !important",
  },
  "& .leaflet-popup-tip-container": {
    marginTop: "-1px",
    zIndex: "1001 !important",
  },
  // Ensure all Leaflet pane layers respect z-index hierarchy but popups are on top
  "& .leaflet-pane": {
    zIndex: "auto !important",
  },
  "& .leaflet-popup-pane": {
    zIndex: "1001 !important", // Popups above everything including sidebar
  },
  "& .leaflet-tooltip-pane": {
    zIndex: "999 !important", // Tooltips below popups
  },
  "& .leaflet-marker-pane": {
    zIndex: "600 !important", // Markers well below popups
  },
  "& .leaflet-overlay-pane": {
    zIndex: "400 !important", // Overlays lowest
  },
  // Ensure map controls are clearly below popups
  "& .leaflet-control-zoom": {
    zIndex: "500 !important", // Well below popups
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(4px)",
  },
  "& .leaflet-control-attribution": {
    zIndex: "500 !important", // Well below popups
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(4px)",
  },
  "& .leaflet-control": {
    zIndex: "500 !important", // All controls well below popups
  },
  "& .leaflet-top": {
    zIndex: "500 !important",
    // Add increased margin to avoid popup collision area
    "& .leaflet-control-zoom": {
      margin: "20px !important", // Increased from 10px to 20px for more buffer space
    },
  },
  "& .leaflet-bottom": {
    zIndex: "500 !important",
  },
  "& .leaflet-left": {
    zIndex: "500 !important",
  },
  "& .leaflet-right": {
    zIndex: "500 !important",
  },
  // Override Leaflet's default control positioning to avoid popup overlap
  "& .leaflet-control-zoom a": {
    backgroundColor: `${theme.palette.background.paper} !important`,
    color: `${theme.palette.text.primary} !important`,
    border: `1px solid ${theme.palette.divider} !important`,
    transition: "all 0.2s ease",
    fontWeight: "bold !important",
    fontSize: "16px !important",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15) !important",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: "white !important",
      borderColor: `${theme.palette.primary.main} !important`,
      transform: "scale(1.05)",
    },
  },
}));

const PopupContainer = styled(Box)(({ theme }) => ({
  padding: "4px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  minWidth: "220px",
  maxWidth: "300px",
  position: "relative",
  zIndex: 1,
}));

const BuoyTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h6.fontFamily,
  fontWeight: 600,
  fontSize: "14px",
  color: theme.palette.text.primary,
  lineHeight: "1.1",
  margin: "1px 0",
}));

const LocationText = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  color: theme.palette.text.secondary,
  fontFamily: "Menlo, Monaco, Consolas, monospace",
  margin: "1px 0",
}));

const DataContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: "4px",
  padding: "0 4px",
  border: `1px solid ${theme.palette.divider}`,
  marginTop: "2px",
}));

const DataRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1px 0",
  "&:first-of-type": {
    paddingTop: "2px",
  },
  "&:last-child": {
    paddingBottom: "2px",
  },
}));

const DataLabel = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  margin: "1px 0",
}));

const DataValue = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontFamily: "Menlo, Monaco, Consolas, monospace",
  margin: "1px 0",
}));

const NoDataMessage = styled(Box)(({ theme }) => ({
  padding: "12px 16px",
  backgroundColor: theme.palette.action.selected,
  borderRadius: "8px",
  border: `1px dashed ${theme.palette.divider}`,
  textAlign: "center",
}));

interface BuoyLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  temperature?: number | null;
  waveHeight?: number | null;
  windSpeed?: number | null;
  hasData?: boolean;
}

interface BuoyMapProps {
  buoys: BuoyLocation[];
  selectedBuoyId?: string;
  onBuoySelect?: (buoyId: string) => void;
  centerOnSelection?: boolean;
}

// Component to handle map bounds and centering
const MapController = ({
  buoys,
  selectedBuoyId,
  centerOnSelection,
  markersRef,
}: {
  buoys: BuoyLocation[];
  selectedBuoyId?: string;
  centerOnSelection?: boolean;
  markersRef: React.MutableRefObject<{ [key: string]: L.Marker }>;
}) => {
  const map = useMap();
  const [hasInitialized, setHasInitialized] = useState(false);
  const previousSelectedBuoyId = useRef<string | undefined>(undefined);

  // Configure popup options to prevent overlap with controls
  useEffect(() => {
    map.options.zoomControl = true;

    // Customize popup behavior to avoid control overlap
    const originalOpenPopup = map.openPopup;
    map.openPopup = function (
      popup: L.Popup,
      latlng?: L.LatLngExpression,
      options?: L.PopupOptions,
    ) {
      // Calculate optimal popup position to avoid control overlap
      if (popup && latlng) {
        const popupOptions = {
          ...options,
          autoPan: true,
          autoPanPadding: [60, 60], // Increased padding to avoid control overlap
          autoPanPaddingTopLeft: [100, 100], // Extra padding for zoom controls - increased from 70 to 100
          autoPanPaddingBottomRight: [40, 40], // Increased bottom-right padding
          keepInView: true,
          maxWidth: 300,
          className: "elevated-popup",
        };
        return originalOpenPopup.call(this, popup, latlng, popupOptions);
      }
      return originalOpenPopup.call(this, popup, latlng, options);
    };
  }, [map]);

  // Initial map bounds setup
  useEffect(() => {
    if (buoys.length > 0 && !hasInitialized) {
      const buoysWithValidCoords = buoys.filter(
        (buoy) => buoy.lat !== 0 && buoy.lng !== 0,
      );
      if (buoysWithValidCoords.length > 0) {
        const group = new L.FeatureGroup(
          buoysWithValidCoords.map((buoy) => L.marker([buoy.lat, buoy.lng])),
        );
        map.fitBounds(group.getBounds(), { padding: [80, 80] }); // Further increased padding to ensure better spacing
      }
      setHasInitialized(true);
    }
  }, [buoys, map, hasInitialized]);

  // Center on selected buoy and open popup
  useEffect(() => {
    if (
      selectedBuoyId &&
      centerOnSelection &&
      hasInitialized &&
      selectedBuoyId !== previousSelectedBuoyId.current
    ) {
      const selectedBuoy = buoys.find((buoy) => buoy.id === selectedBuoyId);
      if (selectedBuoy && selectedBuoy.lat !== 0 && selectedBuoy.lng !== 0) {
        const mapSize = map.getSize();

        // Calculate offset to center buoy while avoiding control overlap
        const offsetY = mapSize.y * 0.08; // Increased offset for better spacing from controls
        const offsetX = mapSize.x * 0.05; // Increased horizontal offset to better account for zoom controls

        const targetPoint = map.project(
          [selectedBuoy.lat, selectedBuoy.lng],
          map.getZoom(),
        );
        targetPoint.y -= offsetY; // Slight upward shift to account for popup space
        targetPoint.x += offsetX; // Minimal right shift to avoid zoom controls
        const targetLatLng = map.unproject(targetPoint, map.getZoom());

        // Center on the calculated position with smooth animation
        map.setView(targetLatLng, 6, {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.5,
        });

        // Open the popup for the selected buoy after animation
        setTimeout(() => {
          const marker = markersRef.current[selectedBuoyId];
          if (marker) {
            marker.openPopup();
          }
        }, 1600);
      }
      previousSelectedBuoyId.current = selectedBuoyId;
    }
  }, [
    selectedBuoyId,
    centerOnSelection,
    buoys,
    map,
    hasInitialized,
    markersRef,
  ]);

  return null;
};

export const BuoyMap = ({
  buoys,
  selectedBuoyId,
  onBuoySelect,
  centerOnSelection = true,
}: BuoyMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Create custom icon for selected buoy
  const selectedIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
    shadowSize: [48, 48],
    className: "selected-buoy-marker",
  });

  const defaultIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Default center (approximate center of world's oceans)
  const defaultCenter: [number, number] = [0, 0];
  const defaultZoom = 2;

  if (buoys.length === 0) {
    return (
      <MapWrapper>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No buoy location data available
          </Typography>
        </Box>
      </MapWrapper>
    );
  }

  return (
    <MapWrapper>
      <MapContainer
        ref={mapRef}
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          buoys={buoys}
          selectedBuoyId={selectedBuoyId}
          centerOnSelection={centerOnSelection}
          markersRef={markersRef}
        />

        {buoys.map((buoy) => (
          <Marker
            key={buoy.id}
            position={[buoy.lat, buoy.lng]}
            icon={buoy.id === selectedBuoyId ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onBuoySelect?.(buoy.id),
            }}
            ref={(ref) => {
              if (ref) {
                markersRef.current[buoy.id] = ref;
              }
            }}
          >
            <Popup
              autoPan={true}
              autoPanPadding={[60, 60]}
              keepInView={true}
              maxWidth={300}
              className="elevated-popup"
            >
              <PopupContainer>
                <BuoyTitle>{buoy.name}</BuoyTitle>

                <LocationText>
                  {buoy.lat.toFixed(4)}°N, {Math.abs(buoy.lng).toFixed(4)}°
                  {buoy.lng < 0 ? "W" : "E"}
                </LocationText>

                {buoy.hasData ? (
                  <DataContainer>
                    <DataRow>
                      <DataLabel>Temperature</DataLabel>
                      <DataValue>
                        {formatTemperature(buoy.temperature)}
                      </DataValue>
                    </DataRow>

                    <DataRow>
                      <DataLabel>Wave Height</DataLabel>
                      <DataValue>{formatWaveHeight(buoy.waveHeight)}</DataValue>
                    </DataRow>

                    <DataRow>
                      <DataLabel>Wind Speed</DataLabel>
                      <DataValue>{formatWindSpeed(buoy.windSpeed)}</DataValue>
                    </DataRow>
                  </DataContainer>
                ) : (
                  <NoDataMessage>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "13px", fontWeight: 500 }}
                    >
                      Click marker to load real-time data
                    </Typography>
                    <Chip
                      label="Load Data"
                      size="small"
                      variant="outlined"
                      sx={{
                        mt: 1,
                        fontSize: "11px",
                        height: "24px",
                        borderColor: "primary.main",
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "primary.contrastText",
                        },
                      }}
                    />
                  </NoDataMessage>
                )}
              </PopupContainer>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};
