import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  "& .leaflet-container": {
    height: "100%",
    width: "100%",
    borderRadius: "12px",
  },
  // Custom Leaflet popup styling to match brand colors
  "& .leaflet-popup": {
    marginBottom: "20px",
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
  },
  "& .leaflet-popup-content": {
    margin: "0",
    fontSize: "14px",
    lineHeight: "1.4",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
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
  },
  "& .leaflet-popup-tip-container": {
    marginTop: "-1px",
  },
}));

const PopupContainer = styled(Box)(({ theme }) => ({
  padding: "12px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  minWidth: "260px",
}));

const BuoyTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h6.fontFamily,
  fontWeight: 600,
  fontSize: "16px",
  color: theme.palette.text.primary,
  marginBottom: "4px",
  lineHeight: "1.2",
}));

const LocationText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
  marginBottom: "8px",
  fontFamily: "Menlo, Monaco, Consolas, monospace",
}));

const DataContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: "6px",
  padding: "10px",
  border: `1px solid ${theme.palette.divider}`,
}));

const DataRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2px",
  "&:last-child": {
    marginBottom: "0",
  },
}));

const DataLabel = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const DataValue = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontFamily: "Menlo, Monaco, Consolas, monospace",
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
  temperature?: number;
  waveHeight?: number;
  windSpeed?: number;
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
        map.fitBounds(group.getBounds(), { padding: [20, 20] });
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

        // Calculate offset to position buoy at center-bottom (75% from top)
        const offsetY = mapSize.y * 0.25; // Move up by 25% of the map height
        const targetPoint = map.project(
          [selectedBuoy.lat, selectedBuoy.lng],
          map.getZoom(),
        );
        targetPoint.y -= offsetY;
        const targetLatLng = map.unproject(targetPoint, map.getZoom());

        // Center on the calculated position with smooth animation
        map.setView(targetLatLng, 6, {
          animate: true,
          duration: 1.5, // Smooth 1.5 second animation
          easeLinearity: 0.5,
        });

        // Open the popup for the selected buoy after a short delay to ensure map has centered
        setTimeout(() => {
          const marker = markersRef.current[selectedBuoyId];
          if (marker) {
            marker.openPopup();
          }
        }, 1600); // Slightly after the animation completes
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
            <Popup>
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
                        {buoy.temperature !== undefined
                          ? `${buoy.temperature.toFixed(1)}°C`
                          : "N/A"}
                      </DataValue>
                    </DataRow>

                    {buoy.waveHeight !== undefined && (
                      <DataRow>
                        <DataLabel>Wave Height</DataLabel>
                        <DataValue>{buoy.waveHeight.toFixed(1)}m</DataValue>
                      </DataRow>
                    )}

                    {buoy.windSpeed !== undefined && (
                      <DataRow>
                        <DataLabel>Wind Speed</DataLabel>
                        <DataValue>{buoy.windSpeed.toFixed(1)} m/s</DataValue>
                      </DataRow>
                    )}
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
