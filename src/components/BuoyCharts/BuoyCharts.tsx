import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TimeSeriesChart, BarChart } from "../Charts";
import type { BuoyTimeSeriesData } from "../../hooks/useBuoyData";

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
    value: item.temperature,
  }));

  const waveHeightData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: item.waveHeight,
  }));

  const windSpeedData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: item.windSpeed,
  }));

  const pressureData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: item.pressure,
  }));

  // Calculate averages for bar chart
  const averages = [
    {
      name: "Avg Temperature",
      value:
        data.reduce((sum, item) => sum + item.temperature, 0) / data.length,
    },
    {
      name: "Avg Wave Height",
      value: data.reduce((sum, item) => sum + item.waveHeight, 0) / data.length,
    },
    {
      name: "Avg Wind Speed",
      value: data.reduce((sum, item) => sum + item.windSpeed, 0) / data.length,
    },
    {
      name: "Avg Pressure",
      value: data.reduce((sum, item) => sum + item.pressure, 0) / data.length,
    },
  ];

  // Get latest readings for current status
  const latest = data[data.length - 1];
  const currentReadings = [
    {
      name: "Current Temp",
      value: latest.temperature,
    },
    {
      name: "Current Waves",
      value: latest.waveHeight,
    },
    {
      name: "Current Wind",
      value: latest.windSpeed,
    },
    {
      name: "Current Pressure",
      value: latest.pressure,
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
            color={theme.palette.warning.main}
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
              theme.palette.warning.main,
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
              theme.palette.warning.main,
              theme.palette.success.main,
            ]}
          />
        </ChartContainer>
      </Box>
    </Box>
  );
};
