import { Box, useTheme } from "@mui/material";
import { TimeSeriesChart } from "../Charts";
import type { BuoyTimeSeriesData } from "../../hooks/useBuoyData";
import { getChartValue } from "../../utils/buoyDataFormatter";

interface WindSpeedChartProps {
  data: BuoyTimeSeriesData[];
  height?: number;
}

export const WindSpeedChart = ({ data, height = 300 }: WindSpeedChartProps) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height,
          backgroundColor: "background.default",
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ color: "text.secondary", fontSize: "2rem", mb: 1 }}>
            💨
          </Box>
          <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            No wind data available
          </Box>
        </Box>
      </Box>
    );
  }

  // Transform data for wind speed chart
  const windSpeedData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
    }),
    value: getChartValue(item.windSpeed),
  }));

  return (
    <TimeSeriesChart
      data={windSpeedData}
      height={height}
      color={theme.palette.primary.main}
      yAxisLabel="Wind Speed (m/s)"
    />
  );
};
