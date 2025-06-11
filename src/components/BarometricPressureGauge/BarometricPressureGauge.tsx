import { Box, Typography, Paper, CircularProgress, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import type { BuoyTimeSeriesData } from "../../hooks/useBuoyData";
import { isValidNumber } from "../../utils/buoyDataFormatter";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
  borderRadius: 12,
  height: "100%",
  overflow: "hidden",
}));

const PressureDisplayContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "8px",
  flex: 1,
  minHeight: 0,
}));

const MainPressureDisplay = styled(Box)(() => ({
  textAlign: "center",
  padding: "12px 16px",
  borderRadius: "8px",
  background:
    "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)",
  border: "1px solid rgba(25, 118, 210, 0.2)",
  width: "100%",
  maxWidth: "140px",
}));

const PressureValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 700,
  lineHeight: 1.1,
  fontFamily: "'Roboto Mono', monospace",
  color: theme.palette.primary.main,
}));

const PressureUnit = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  letterSpacing: "0.5px",
  marginTop: "2px",
}));

const StatusIndicator = styled(Box)<{ status: string }>(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "very-low":
        return theme.palette.error.main;
      case "low":
        return theme.palette.warning.main;
      case "normal":
        return theme.palette.success.main;
      case "high":
        return theme.palette.warning.main;
      case "very-high":
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return {
    padding: "6px 14px",
    borderRadius: "20px",
    backgroundColor: `${getStatusColor()}20`,
    border: `1px solid ${getStatusColor()}`,
    color: getStatusColor(),
    fontWeight: 600,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };
});

const TrendContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "center",
  width: "100%",
}));

const TrendItem = styled(Box)<{ direction: "up" | "down" | "stable" }>(({
  theme,
  direction,
}) => {
  const getColor = () => {
    switch (direction) {
      case "up":
        return theme.palette.success.main;
      case "down":
        return theme.palette.error.main;
      case "stable":
        return theme.palette.text.secondary;
    }
  };

  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 8px",
    borderRadius: "6px",
    backgroundColor: `${getColor()}15`,
    border: `1px solid ${getColor()}30`,
    color: getColor(),
    fontSize: "0.75rem",
    fontWeight: 500,
  };
});

interface BarometricPressureGaugeProps {
  data: BuoyTimeSeriesData[];
  loading?: boolean;
  hideTitle?: boolean;
}

export const BarometricPressureGauge = ({
  data,
  loading = false,
  hideTitle = false,
}: BarometricPressureGaugeProps) => {
  const pressureAnalysis = useMemo(() => {
    if (!data || data.length === 0) return null;

    // Filter out invalid pressure readings
    const validPressureData = data.filter(
      (d) => isValidNumber(d.pressure) && (d.pressure as number) < 1100,
    );

    if (validPressureData.length === 0) return null;

    const currentPressure =
      validPressureData[validPressureData.length - 1]?.pressure || 0;

    // Calculate 24-hour trend (or available data range)
    const pressureValues = validPressureData.map((d) => d.pressure);
    const minPressure = Math.min(...pressureValues);
    const maxPressure = Math.max(...pressureValues);
    const avgPressure =
      pressureValues.reduce((sum, p) => sum + p, 0) / pressureValues.length;

    // Calculate recent trend (last 6 readings)
    const recentReadings = validPressureData.slice(-6);
    let trend = "stable";
    let trendValue = 0;

    if (recentReadings.length >= 2) {
      const oldValue = recentReadings[0].pressure;
      const newValue = currentPressure;
      trendValue = newValue - oldValue;

      if (Math.abs(trendValue) < 1) {
        trend = "stable";
      } else if (trendValue > 0) {
        trend = "up";
      } else {
        trend = "down";
      }
    }

    // Determine pressure status based on meteorological standards
    const getPressureStatus = (pressure: number) => {
      if (pressure < 980)
        return {
          label: "Very Low",
          status: "very-low",
          description: "Storm conditions likely",
        };
      if (pressure < 1000)
        return {
          label: "Low",
          status: "low",
          description: "Unsettled weather",
        };
      if (pressure > 1030)
        return {
          label: "Very High",
          status: "very-high",
          description: "Clear, stable conditions",
        };
      if (pressure > 1020)
        return { label: "High", status: "high", description: "Fair weather" };
      return {
        label: "Normal",
        status: "normal",
        description: "Typical conditions",
      };
    };

    const status = getPressureStatus(currentPressure);

    return {
      current: currentPressure,
      min: minPressure,
      max: maxPressure,
      average: avgPressure,
      trend: trend as "up" | "down" | "stable",
      trendValue,
      status,
      dataPoints: validPressureData.length,
    };
  }, [data]);

  const formatTrendValue = (value: number) => {
    const abs = Math.abs(value);
    if (abs < 0.1) return "0.0";
    return abs.toFixed(1);
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      case "stable":
        return "→";
    }
  };

  const getTrendDescription = (
    trend: "up" | "down" | "stable",
    value: number,
  ) => {
    const absValue = Math.abs(value);
    if (trend === "stable") return "Stable pressure";

    const intensity =
      absValue > 3 ? "Rapidly" : absValue > 1 ? "Moderately" : "Slightly";
    const direction = trend === "up" ? "rising" : "falling";
    return `${intensity} ${direction}`;
  };

  if (loading) {
    return (
      <StyledPaper>
        {!hideTitle && (
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ textAlign: "center" }}
          >
            Atmospheric Pressure
          </Typography>
        )}
        <PressureDisplayContainer>
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Loading pressure data...
          </Typography>
        </PressureDisplayContainer>
      </StyledPaper>
    );
  }

  if (!pressureAnalysis) {
    return (
      <StyledPaper>
        {!hideTitle && (
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ textAlign: "center" }}
          >
            Atmospheric Pressure
          </Typography>
        )}
        <PressureDisplayContainer>
          <Box sx={{ color: "text.secondary", fontSize: "2rem", mb: 1 }}>
            📊
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            No pressure data available
          </Typography>
        </PressureDisplayContainer>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper
      role="region"
      aria-labelledby={hideTitle ? undefined : "barometric-pressure-title"}
      aria-describedby="barometric-pressure-description"
    >
      {!hideTitle && (
        <Typography
          id="barometric-pressure-title"
          variant="h6"
          color="text.primary"
          sx={{ textAlign: "center", fontWeight: 600 }}
        >
          Atmospheric Pressure
        </Typography>
      )}

      <PressureDisplayContainer>
        {/* Main Pressure Display */}
        <MainPressureDisplay
          role="img"
          aria-label={`Current atmospheric pressure: ${pressureAnalysis.current.toFixed(1)} hectopascals, status: ${pressureAnalysis.status.label}`}
        >
          <PressureValue aria-live="polite">
            {pressureAnalysis.current.toFixed(1)}
          </PressureValue>
          <PressureUnit aria-label="hectopascals">hPa</PressureUnit>
        </MainPressureDisplay>

        {/* Status Indicator */}
        <StatusIndicator status={pressureAnalysis.status.status}>
          <Typography
            variant="caption"
            sx={{ fontWeight: "inherit", fontSize: "inherit" }}
            aria-live="polite"
          >
            {pressureAnalysis.status.label}
          </Typography>
        </StatusIndicator>

        {/* Weather Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", fontStyle: "italic" }}
        >
          {pressureAnalysis.status.description}
        </Typography>

        {/* Trend Analysis */}
        <TrendContainer>
          <TrendItem direction={pressureAnalysis.trend}>
            <span style={{ fontSize: "1rem" }}>
              {getTrendIcon(pressureAnalysis.trend)}
            </span>
            <Typography variant="caption" sx={{ fontWeight: "inherit" }}>
              {getTrendDescription(
                pressureAnalysis.trend,
                pressureAnalysis.trendValue,
              )}
            </Typography>
            {pressureAnalysis.trend !== "stable" && (
              <Chip
                label={`${formatTrendValue(pressureAnalysis.trendValue)} hPa`}
                size="small"
                sx={{
                  height: "16px",
                  fontSize: "0.65rem",
                  backgroundColor: "transparent",
                  border: "1px solid currentColor",
                  color: "inherit",
                }}
              />
            )}
          </TrendItem>
        </TrendContainer>
      </PressureDisplayContainer>
    </StyledPaper>
  );
};
