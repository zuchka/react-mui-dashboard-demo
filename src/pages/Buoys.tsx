import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useBuoyData } from "../hooks/useBuoyData";
import { BuoyDropdown } from "../components/BuoyDropdown/BuoyDropdown";
import { BuoyMap } from "../components/BuoyMap/BuoyMap";
import { BuoyCharts } from "../components/BuoyCharts/BuoyCharts";
import { StatsCard } from "../components/StatsCard/StatsCard";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
  borderRadius: 12,
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export default function Buoys() {
  const {
    groupedData,
    loading,
    error,
    lastUpdate,
    getBuoyList,
    getBuoyData,
    getAllAvailableBuoys,
  } = useBuoyData();
  const [selectedBuoyId, setSelectedBuoyId] = useState<string>("");

  const loadedBuoyList = getBuoyList();
  const allAvailableBuoys = getAllAvailableBuoys();
  const selectedBuoyData = selectedBuoyId ? getBuoyData(selectedBuoyId) : null;

  // Auto-select first loaded buoy when data loads
  useEffect(() => {
    if (loadedBuoyList.length > 0 && !selectedBuoyId) {
      setSelectedBuoyId(loadedBuoyList[0].id);
    }
  }, [loadedBuoyList, selectedBuoyId]);

  // Prepare map data (only for loaded buoys with valid coordinates)
  const mapBuoys = loadedBuoyList
    .map((buoy) => {
      const data = getBuoyData(buoy.id);
      return {
        id: buoy.id,
        name: buoy.name,
        lat: data?.info.location.lat || 0,
        lng: data?.info.location.lng || 0,
        temperature: data?.info.temperature,
        waveHeight: data?.info.waveHeight,
        windSpeed: data?.info.windSpeed,
      };
    })
    .filter((buoy) => buoy.lat !== 0 || buoy.lng !== 0); // Filter out invalid coordinates

  const handleBuoySelect = (buoyId: string) => {
    setSelectedBuoyId(buoyId);
  };

  if (loading && Object.keys(groupedData).length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "text.primary", fontWeight: 600 }}
        >
          Buoy Monitoring Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Loading real-time buoy data from NOAA...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Fetching data for {allAvailableBuoys.length} buoys
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error && Object.keys(groupedData).length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "text.primary", fontWeight: 600 }}
        >
          Buoy Monitoring Dashboard
        </Typography>
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Typography variant="body2" color="text.secondary">
              Data will retry automatically in 10 minutes
            </Typography>
          }
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Error Loading Buoy Data
          </Typography>
          {error}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Available buoys: {allAvailableBuoys.map((b) => b.name).join(", ")}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <HeaderContainer>
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              mb: 1,
            }}
          >
            Buoy Monitoring Dashboard
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Real-time oceanographic data from NOAA NDBC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {loadedBuoyList.length} of {allAvailableBuoys.length} buoys loaded
              successfully
            </Typography>
            {lastUpdate && (
              <Chip
                label={`Last updated: ${lastUpdate.toLocaleTimeString()}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {loading && (
              <Chip
                label="Updating..."
                size="small"
                color="info"
                icon={<CircularProgress size={12} />}
              />
            )}
            {error && loadedBuoyList.length > 0 && (
              <Chip
                label="Partial data loaded"
                size="small"
                color="warning"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        <BuoyDropdown
          buoys={loadedBuoyList.length > 0 ? loadedBuoyList : allAvailableBuoys}
          selectedBuoy={selectedBuoyId}
          onBuoyChange={handleBuoySelect}
          loading={loading}
        />
      </HeaderContainer>

      {/* Overview Stats */}
      {selectedBuoyData && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          <StatsCard
            title="Water Temperature"
            value={`${selectedBuoyData.info.temperature.toFixed(1)}°C`}
            trend={{
              value:
                selectedBuoyData.history.length > 1
                  ? `${(selectedBuoyData.info.temperature - selectedBuoyData.history[selectedBuoyData.history.length - 2].temperature).toFixed(1)}°C`
                  : "0°C",
              positive:
                selectedBuoyData.history.length > 1
                  ? selectedBuoyData.info.temperature >=
                    selectedBuoyData.history[
                      selectedBuoyData.history.length - 2
                    ].temperature
                  : true,
            }}
          />
          <StatsCard
            title="Wave Height"
            value={`${selectedBuoyData.info.waveHeight.toFixed(1)}m`}
            trend={{
              value:
                selectedBuoyData.history.length > 1
                  ? `${(selectedBuoyData.info.waveHeight - selectedBuoyData.history[selectedBuoyData.history.length - 2].waveHeight).toFixed(1)}m`
                  : "0m",
              positive:
                selectedBuoyData.history.length > 1
                  ? selectedBuoyData.info.waveHeight >=
                    selectedBuoyData.history[
                      selectedBuoyData.history.length - 2
                    ].waveHeight
                  : true,
            }}
          />
          <StatsCard
            title="Wind Speed"
            value={`${selectedBuoyData.info.windSpeed.toFixed(1)} m/s`}
            trend={{
              value:
                selectedBuoyData.history.length > 1
                  ? `${(selectedBuoyData.info.windSpeed - selectedBuoyData.history[selectedBuoyData.history.length - 2].windSpeed).toFixed(1)} m/s`
                  : "0 m/s",
              positive:
                selectedBuoyData.history.length > 1
                  ? selectedBuoyData.info.windSpeed >=
                    selectedBuoyData.history[
                      selectedBuoyData.history.length - 2
                    ].windSpeed
                  : true,
            }}
          />
          <StatsCard
            title="Pressure"
            value={`${selectedBuoyData.info.pressure.toFixed(0)} hPa`}
            trend={{
              value:
                selectedBuoyData.history.length > 1
                  ? `${(selectedBuoyData.info.pressure - selectedBuoyData.history[selectedBuoyData.history.length - 2].pressure).toFixed(0)} hPa`
                  : "0 hPa",
              positive:
                selectedBuoyData.history.length > 1
                  ? selectedBuoyData.info.pressure >=
                    selectedBuoyData.history[
                      selectedBuoyData.history.length - 2
                    ].pressure
                  : true,
            }}
          />
        </Box>
      )}

      {/* Map Section */}
      <StyledPaper sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
          Buoy Locations
        </Typography>
        <BuoyMap
          buoys={mapBuoys}
          selectedBuoyId={selectedBuoyId}
          onBuoySelect={handleBuoySelect}
        />
      </StyledPaper>

      {/* Charts Section */}
      {selectedBuoyData && (
        <StyledPaper>
          <BuoyCharts
            data={selectedBuoyData.history}
            buoyName={selectedBuoyData.info.name}
          />
        </StyledPaper>
      )}
    </Box>
  );
}
