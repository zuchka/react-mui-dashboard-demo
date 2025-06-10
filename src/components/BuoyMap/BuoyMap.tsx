import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Box, Typography, Paper } from "@mui/material";
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
}));

const InfoBox = styled(Box)(({ theme }) => ({
  padding: "8px 12px",
  backgroundColor: theme.palette.background.default,
  borderRadius: "8px",
  marginTop: "8px",
}));

interface BuoyLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  temperature?: number;
  waveHeight?: number;
  windSpeed?: number;
}

interface BuoyMapProps {
  buoys: BuoyLocation[];
  selectedBuoyId?: string;
  onBuoySelect?: (buoyId: string) => void;
}

// Component to fit map bounds to show all buoys
const MapBoundsUpdater = ({ buoys }: { buoys: BuoyLocation[] }) => {
  const map = useMap();

  useEffect(() => {
    if (buoys.length > 0) {
      const group = new L.FeatureGroup(
        buoys.map((buoy) => L.marker([buoy.lat, buoy.lng])),
      );
      map.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
  }, [buoys, map]);

  return null;
};

export const BuoyMap = ({
  buoys,
  selectedBuoyId,
  onBuoySelect,
}: BuoyMapProps) => {
  const mapRef = useRef<L.Map | null>(null);

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

        <MapBoundsUpdater buoys={buoys} />

        {buoys.map((buoy) => (
          <Marker
            key={buoy.id}
            position={[buoy.lat, buoy.lng]}
            icon={buoy.id === selectedBuoyId ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onBuoySelect?.(buoy.id),
            }}
          >
            <Popup>
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {buoy.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Location: {buoy.lat.toFixed(4)}°N, {buoy.lng.toFixed(4)}°W
                </Typography>
                {buoy.temperature !== undefined && (
                  <InfoBox>
                    <Typography variant="body2">
                      Temperature: {buoy.temperature.toFixed(1)}°C
                    </Typography>
                    {buoy.waveHeight !== undefined && (
                      <Typography variant="body2">
                        Wave Height: {buoy.waveHeight.toFixed(1)}m
                      </Typography>
                    )}
                    {buoy.windSpeed !== undefined && (
                      <Typography variant="body2">
                        Wind Speed: {buoy.windSpeed.toFixed(1)} m/s
                      </Typography>
                    )}
                  </InfoBox>
                )}
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};
