import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { useState, useEffect, lazy, Suspense } from "react";
import { styled } from "@mui/material/styles";
import { useBuoyData } from "../hooks/useBuoyData";
import { BuoyDropdown } from "../components/BuoyDropdown/BuoyDropdown";
import { BuoyMap } from "../components/BuoyMap/BuoyMap";
import { BarometricPressureGauge } from "../components/BarometricPressureGauge/BarometricPressureGauge";
import { BUOY_METADATA, DEFAULT_BUOY_ID } from "../data/buoyMetadata";
import { GaugeChart, DonutChart, RadarChart } from "../components/Charts";

// Lazy load chart components to prevent blocking
const BuoyCharts = lazy(() =>
  import("../components/BuoyCharts/BuoyCharts").then((module) => ({
    default: module.BuoyCharts,
  })),
);
const WindSpeedChart = lazy(() =>
  import("../components/WindSpeedChart/WindSpeedChart").then((module) => ({
    default: module.WindSpeedChart,
  })),
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
  borderRadius: 12,
}));

const HeaderContainer = styled(Box)(() => ({
  fontWeight: "400",
  gap: "10px",
  justifyContent: "flex-start",
  minHeight: "40px",
  pointerEvents: "auto",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto 10px 0",
}));

const LoadingOverlay = styled(Box)(() => ({
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

const ChartLoadingFallback = ({ height = 300 }: { height?: number }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: `${height}px`,
      backgroundColor: "background.default",
      borderRadius: 1,
    }}
  >
    <Box sx={{ textAlign: "center" }}>
      <CircularProgress size={40} sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary">
        Loading chart...
      </Typography>
    </Box>
  </Box>
);

export default function Buoys() {
  const {
    getBuoyData,
    getAllAvailableBuoys,
    getLoadedBuoys,
    isBuoyLoaded,
    isBuoyLoading,
    fetchBuoyData,
    error,
    lastUpdate,
    buoyListInitialized,
  } = useBuoyData();

  const [selectedBuoyId, setSelectedBuoyId] = useState<string>(DEFAULT_BUOY_ID);
  const [shouldLoadCharts, setShouldLoadCharts] = useState<boolean>(false);

  // Delay chart loading to allow map to render first
  useEffect(() => {
    const enableChartLoading = () => {
      setShouldLoadCharts(true);
    };

    // Use requestIdleCallback when available for better performance
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleCallbackId = requestIdleCallback(enableChartLoading, {
        timeout: 200,
      });
      return () => cancelIdleCallback(idleCallbackId);
    } else {
      // Fallback to setTimeout for browsers that don't support requestIdleCallback
      const timer = setTimeout(enableChartLoading, 100);
      return () => clearTimeout(timer);
    }
  }, []);

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              gap: "20px",
              display: "flex",
              "@media (max-width: 991px)": {
                flexDirection: "column",
                alignItems: "stretch",
                gap: "0px",
              },
            }}
          >
            {/* First Column - Buoy Count */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "normal",
                width: "33%",
                marginLeft: "0px",
                "@media (max-width: 991px)": {
                  width: "100%",
                  marginLeft: 0,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      {loadedBuoys.length} of {allAvailableBuoys.length} buoys
                      loaded
                      {!buoyListInitialized && " (fetching complete list...)"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Second Column - Last Updated */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "normal",
                width: "33%",
                marginLeft: "20px",
                "@media (max-width: 991px)": {
                  width: "100%",
                  marginLeft: 0,
                },
              }}
            >
              {lastUpdate && (
                <Chip
                  label={`Last updated: ${lastUpdate.toLocaleTimeString()}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderRadius: "16px",
                    height: "24px",
                    fontSize: "13px",
                    marginLeft: "-3px",
                    maxWidth: "100%",
                  }}
                />
              )}
            </Box>

            {/* Third Column - Buoy Dropdown */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "normal",
                width: "33%",
                marginLeft: "20px",
                "@media (max-width: 991px)": {
                  width: "100%",
                  marginLeft: 0,
                },
              }}
            >
              <Box
                sx={{
                  marginLeft: "20px",
                  width: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    justifyContent: "flex-start",
                    marginLeft: "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        width: "100%",
                      }}
                    >
                      <BuoyDropdown
                        buoys={allAvailableBuoys}
                        selectedBuoy={selectedBuoyId}
                        onBuoyChange={handleBuoySelect}
                        loading={isSelectedBuoyLoading}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </HeaderContainer>

      {/* Error Alert */}
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }} onClose={() => {}}>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}

      {/* Map Section */}
      <StyledPaper sx={{ mb: 4, padding: "0 24px 2px" }}>
        <Typography
          variant="h6"
          sx={{ mb: 3, color: "text.primary", textAlign: "center" }}
        >
          Buoy Locations
        </Typography>
        <BuoyMap
          buoys={mapBuoys}
          selectedBuoyId={selectedBuoyId}
          onBuoySelect={handleBuoySelect}
          centerOnSelection={true}
        />
      </StyledPaper>

      {/* Wind Speed Analysis - Two Column Layout */}
      {selectedBuoyData && shouldLoadCharts && (
        <StyledPaper
          sx={{
            mb: 4,
            padding: "0 24px 2px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
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

          {/* Titles Row */}
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              mb: 3,
              "@media (max-width: 991px)": {
                flexDirection: "column",
                gap: "16px",
              },
            }}
          >
            <Box
              sx={{
                width: "75%",
                "@media (max-width: 991px)": { width: "100%" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "text.primary", textAlign: "center" }}
              >
                Wind Speed Analysis
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                "@media (max-width: 991px)": { width: "100%" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "text.primary", textAlign: "center" }}
              >
                Atm. Pressure
              </Typography>
            </Box>
          </Box>

          {/* Charts Row */}
          <Box
            sx={{
              gap: "20px",
              display: "flex",
              "@media (max-width: 991px)": {
                flexDirection: "column",
                alignItems: "stretch",
                gap: "20px",
              },
            }}
          >
            {/* Left Column - Wind Speed Chart (3/4) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "normal",
                width: "75%",
                marginLeft: "0px",
                "@media (max-width: 991px)": {
                  width: "100%",
                  marginLeft: 0,
                },
              }}
            >
              <Box
                sx={{
                  height: "300px",
                  width: "100%",
                  backgroundColor: "rgb(8, 16, 40)",
                  borderRadius: "8px",
                  padding: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <Suspense fallback={<ChartLoadingFallback height={268} />}>
                  <WindSpeedChart
                    data={selectedBuoyData.history}
                    height={268}
                  />
                </Suspense>
              </Box>
            </Box>

            {/* Right Column - Barometric Pressure (1/4) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "normal",
                width: "25%",
                marginLeft: "20px",
                "@media (max-width: 991px)": {
                  width: "100%",
                  marginLeft: 0,
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgb(8, 16, 40)",
                  borderRadius: "8px",
                  padding: "40px 16px 16px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  height: "300px",
                }}
              >
                <Suspense fallback={<ChartLoadingFallback height={250} />}>
                  <BarometricPressureGauge
                    data={selectedBuoyData.history}
                    loading={isSelectedBuoyLoading}
                    hideTitle={true}
                  />
                </Suspense>
              </Box>
            </Box>
          </Box>
        </StyledPaper>
      )}

      {/* Environmental Overview Cards */}
      {selectedBuoyData && shouldLoadCharts && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr 1fr" },
            gap: 3,
            mb: 4,
          }}
        >
          <StyledPaper sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
              Water Temperature
            </Typography>
            <GaugeChart
              value={selectedBuoyData.info.temperature || 0}
              height={200}
              min={-5}
              max={35}
              unit="°C"
              color="#FF5A65"
              sectors={[
                { min: -5, max: 10, color: "#14CA74" },
                { min: 10, max: 25, color: "#FDB52A" },
                { min: 25, max: 35, color: "#FF5A65" },
              ]}
            />
          </StyledPaper>

          <StyledPaper sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
              Wave Height
            </Typography>
            <GaugeChart
              value={selectedBuoyData.info.waveHeight || 0}
              height={200}
              min={0}
              max={10}
              unit="m"
              color="#CB3CFF"
              sectors={[
                { min: 0, max: 3, color: "#14CA74" },
                { min: 3, max: 6, color: "#FDB52A" },
                { min: 6, max: 10, color: "#FF5A65" },
              ]}
            />
          </StyledPaper>

          <StyledPaper sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
              Wind Speed
            </Typography>
            <GaugeChart
              value={selectedBuoyData.info.windSpeed || 0}
              height={200}
              min={0}
              max={50}
              unit="m/s"
              color="#7F25FB"
              sectors={[
                { min: 0, max: 15, color: "#14CA74" },
                { min: 15, max: 30, color: "#FDB52A" },
                { min: 30, max: 50, color: "#FF5A65" },
              ]}
            />
          </StyledPaper>

          <StyledPaper sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
              Conditions Analysis
            </Typography>
            <DonutChart
              data={[
                { name: "Optimal", value: 35 },
                { name: "Moderate", value: 45 },
                { name: "Rough", value: 20 },
              ]}
              height={200}
              colors={["#14CA74", "#FDB52A", "#FF5A65"]}
              centerText={{
                title: "Good",
                subtitle: "Sea State",
              }}
            />
          </StyledPaper>
        </Box>
      )}

      {/* Environmental Performance Radar */}
      {selectedBuoyData && shouldLoadCharts && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
            mb: 4,
          }}
        >
          <StyledPaper>
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "text.primary", textAlign: "center" }}
            >
              Environmental Performance Analysis
            </Typography>
            <Box
              sx={{
                backgroundColor: "rgb(8, 16, 40)",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <RadarChart
                indicators={[
                  { name: "Temperature Stability", max: 100 },
                  { name: "Wave Conditions", max: 100 },
                  { name: "Wind Patterns", max: 100 },
                  { name: "Pressure Systems", max: 100 },
                  { name: "Visibility", max: 100 },
                  { name: "Overall Safety", max: 100 },
                ]}
                data={[
                  {
                    name: "Current Conditions",
                    value: [85, 72, 68, 88, 92, 78],
                    color: "#CB3CFF",
                  },
                  {
                    name: "24h Average",
                    value: [78, 85, 75, 82, 88, 81],
                    color: "#14CA74",
                  },
                ]}
                height={400}
                shape="polygon"
              />
            </Box>
          </StyledPaper>

          <StyledPaper>
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "text.primary", textAlign: "center" }}
            >
              Data Quality Metrics
            </Typography>
            <Box sx={{ mb: 3 }}>
              <DonutChart
                data={[
                  { name: "Valid Readings", value: 94.5 },
                  { name: "Estimated", value: 4.2 },
                  { name: "Missing", value: 1.3 },
                ]}
                height={250}
                colors={["#14CA74", "#FDB52A", "#FF5A65"]}
                centerText={{
                  title: "94.5%",
                  subtitle: "Data Quality",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Signal Strength
                </Typography>
                <Typography variant="body2" color="success.main">
                  Excellent
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Last Update
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {lastUpdate?.toLocaleTimeString() || "N/A"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Data Points
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {selectedBuoyData.history?.length || 0}
                </Typography>
              </Box>
            </Box>
          </StyledPaper>
        </Box>
      )}

      {/* Charts Section */}
      {selectedBuoyData && shouldLoadCharts ? (
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
          <Suspense fallback={<ChartLoadingFallback height={600} />}>
            <BuoyCharts
              data={selectedBuoyData.history}
              buoyName={selectedBuoyData.info.name}
            />
          </Suspense>
        </StyledPaper>
      ) : selectedBuoyData && !shouldLoadCharts ? (
        <StyledPaper>
          <ChartLoadingFallback height={600} />
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
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Choose from {allAvailableBuoys.length} verified active NOAA
                stations with live data
              </Typography>
            </Box>
          </Box>
        </StyledPaper>
      )}
    </Box>
  );
}
