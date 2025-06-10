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
import { BUOY_METADATA, DEFAULT_BUOY_ID } from "../data/buoyMetadata";

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

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  zIndex: 1,
}));

export default function Buoys() {
  const {
    getBuoyData,
    getAllAvailableBuoys,
    getLoadedBuoys,
    isBuoyLoaded,
    isBuoyLoading,
    fetchBuoyData,
    loading,
    error,
    lastUpdate,
  } = useBuoyData();

  const [selectedBuoyId, setSelectedBuoyId] = useState<string>(DEFAULT_BUOY_ID);

  const allAvailableBuoys = getAllAvailableBuoys();
  const loadedBuoys = getLoadedBuoys();
  const selectedBuoyData = selectedBuoyId ? getBuoyData(selectedBuoyId) : null;
  const isSelectedBuoyLoading = isBuoyLoading(selectedBuoyId);

  // Prepare map data using static metadata with live data overlay
  const mapBuoys = BUOY_METADATA.map((buoy) => {
    const data = getBuoyData(buoy.id);
    return {
      id: buoy.id,
      name: buoy.name,
      lat: buoy.lat,
      lng: buoy.lng,
      temperature: data?.info.temperature,
      waveHeight: data?.info.waveHeight,
      windSpeed: data?.info.windSpeed,
      hasData: !!data,
    };
  });

  const handleBuoySelect = async (buoyId: string) => {
    setSelectedBuoyId(buoyId);

    // Fetch data if not already loaded
    if (!isBuoyLoaded(buoyId)) {
      await fetchBuoyData(buoyId);
    }
  };

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
              {loadedBuoys.length} of {allAvailableBuoys.length} buoys loaded
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
                label="Loading data..."
                size="small"
                color="info"
                icon={<CircularProgress size={12} />}
              />
            )}
            {error && (
              <Chip
                label="Data load error"
                size="small"
                color="warning"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        <BuoyDropdown
          buoys={allAvailableBuoys}
          selectedBuoy={selectedBuoyId}
          onBuoyChange={handleBuoySelect}
          loading={isSelectedBuoyLoading}
        />
      </HeaderContainer>

      {/* Error Alert */}
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }} onClose={() => {}}>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}

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
            position: "relative",
          }}
        >
          {isSelectedBuoyLoading && (
            <LoadingOverlay>
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress size={40} sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Loading {selectedBuoyData.info.name}...
                </Typography>
              </Box>
            </LoadingOverlay>
          )}

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
          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            sx={{ ml: 2 }}
          >
            Map loads instantly with static coordinates. Click any buoy to load
            live data.
          </Typography>
        </Typography>
        <BuoyMap
          buoys={mapBuoys}
          selectedBuoyId={selectedBuoyId}
          onBuoySelect={handleBuoySelect}
        />
      </StyledPaper>

      {/* Charts Section */}
      {selectedBuoyData ? (
        <StyledPaper sx={{ position: "relative" }}>
          {isSelectedBuoyLoading && (
            <LoadingOverlay>
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress size={60} sx={{ mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Loading environmental data...
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Fetching real-time data for {selectedBuoyData.info.name}
                </Typography>
              </Box>
            </LoadingOverlay>
          )}
          <BuoyCharts
            data={selectedBuoyData.history}
            buoyName={selectedBuoyData.info.name}
          />
        </StyledPaper>
      ) : isBuoyLoading(selectedBuoyId) ? (
        <StyledPaper>
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
                Loading buoy data...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Fetching real-time data from NOAA for {selectedBuoyId}
              </Typography>
            </Box>
          </Box>
        </StyledPaper>
      ) : (
        <StyledPaper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Select a buoy to view environmental data
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose from {allAvailableBuoys.length} available NOAA buoy
                stations
              </Typography>
            </Box>
          </Box>
        </StyledPaper>
      )}
    </Box>
  );
}
