import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TimeSeriesChart, BarChart } from "../Charts";
import type { BuoyTimeSeriesData } from "../../hooks/useBuoyData";
import { getChartValue, isValidNumber } from "../../utils/buoyDataFormatter";

const ChartContainer = styled(Box)(({ theme }) => ({
  padding: "16px",
  backgroundColor: theme.palette.background.default,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
}));

interface BuoyChartsProps {
  data: BuoyTimeSeriesData[];
  buoyName: string;
}

export const BuoyCharts = ({ data, buoyName }: BuoyChartsProps) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 200,
          backgroundColor: "background.default",
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No data available for {buoyName}
        </Typography>
      </Box>
    );
  }

  // Transform data for time series charts
  const temperatureData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: getChartValue(item.temperature),
  }));

  const waveHeightData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: getChartValue(item.waveHeight),
  }));

  const windSpeedData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: getChartValue(item.windSpeed),
  }));

  const pressureData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: getChartValue(item.pressure),
  }));

  // Calculate averages for bar chart (excluding null values)
  const validTemperatureData = data.filter((item) =>
    isValidNumber(item.temperature),
  );
  const validWaveHeightData = data.filter((item) =>
    isValidNumber(item.waveHeight),
  );
  const validWindSpeedData = data.filter((item) =>
    isValidNumber(item.windSpeed),
  );
  const validPressureData = data.filter((item) => isValidNumber(item.pressure));

  const averages = [
    {
      name: "Avg Temperature",
      value:
        validTemperatureData.length > 0
          ? validTemperatureData.reduce(
              (sum, item) => sum + (item.temperature as number),
              0,
            ) / validTemperatureData.length
          : 0,
    },
    {
      name: "Avg Wave Height",
      value:
        validWaveHeightData.length > 0
          ? validWaveHeightData.reduce(
              (sum, item) => sum + (item.waveHeight as number),
              0,
            ) / validWaveHeightData.length
          : 0,
    },
    {
      name: "Avg Wind Speed",
      value:
        validWindSpeedData.length > 0
          ? validWindSpeedData.reduce(
              (sum, item) => sum + (item.windSpeed as number),
              0,
            ) / validWindSpeedData.length
          : 0,
    },
    {
      name: "Avg Pressure",
      value:
        validPressureData.length > 0
          ? validPressureData.reduce(
              (sum, item) => sum + (item.pressure as number),
              0,
            ) / validPressureData.length
          : 0,
    },
  ];

  // Get latest readings for current status
  const latest = data[data.length - 1];
  const currentReadings = [
    {
      name: "Current Temp",
      value: getChartValue(latest.temperature),
    },
    {
      name: "Current Waves",
      value: getChartValue(latest.waveHeight),
    },
    {
      name: "Current Wind",
      value: getChartValue(latest.windSpeed),
    },
    {
      name: "Current Pressure",
      value: getChartValue(latest.pressure),
    },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: "text.primary",
          fontWeight: 600,
        }}
      >
        {buoyName} - Environmental Data
      </Typography>

      {/* Time Series Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <ChartContainer>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Water Temperature Over Time
          </Typography>
          <TimeSeriesChart
            data={temperatureData}
            height={300}
            color={theme.palette.error.main}
            yAxisLabel="Temperature (°C)"
          />
        </ChartContainer>
        <ChartContainer>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Wave Height Trends
          </Typography>
          <TimeSeriesChart
            data={waveHeightData}
            height={300}
            color={theme.palette.info.main}
            yAxisLabel="Wave Height (m)"
          />
        </ChartContainer>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <ChartContainer>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Wind Speed Analysis
          </Typography>
          <TimeSeriesChart
            data={windSpeedData}
            height={300}
            color={theme.palette.primary.main}
            yAxisLabel="Wind Speed (m/s)"
          />
        </ChartContainer>
        <ChartContainer>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Atmospheric Pressure
          </Typography>
          <TimeSeriesChart
            data={pressureData}
            height={300}
            color={theme.palette.success.main}
            yAxisLabel="Pressure (hPa)"
          />
        </ChartContainer>
      </Box>

      {/* Summary Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <ChartContainer>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Average Conditions
          </Typography>
          <BarChart
            data={averages}
            height={300}
            yAxisLabel="Value"
            colors={[
              theme.palette.error.main,
              theme.palette.info.main,
              theme.palette.primary.main,
              theme.palette.success.main,
            ]}
          />
        </ChartContainer>
        <ChartContainer>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Current Readings
          </Typography>
          <BarChart
            data={currentReadings}
            height={300}
            yAxisLabel="Current Value"
            colors={[
              theme.palette.error.main,
              theme.palette.info.main,
              theme.palette.primary.main,
              theme.palette.success.main,
            ]}
          />
        </ChartContainer>
      </Box>
    </Box>
  );
};
