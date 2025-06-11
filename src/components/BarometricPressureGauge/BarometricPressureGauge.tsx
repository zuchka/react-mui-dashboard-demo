import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { BuoyTimeSeriesData } from "../../hooks/useBuoyData";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
  borderRadius: 12,
  height: "fit-content",
}));

const GaugeContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "140px",
  height: "140px",
  margin: "0 auto",
}));

const GaugeValue = styled(Box)(() => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
}));

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
  // Get current (latest) pressure reading
  const currentPressure =
    data && data.length > 0 ? data[data.length - 1]?.pressure : 0;

  // Calculate pressure trend from last two readings
  const calculateTrend = () => {
    if (!data || data.length < 2) return null;

    const current = data[data.length - 1]?.pressure || 0;
    const previous = data[data.length - 2]?.pressure || 0;

    if (current === 0 || previous === 0) return null;

    const difference = current - previous;
    const percentChange = (difference / previous) * 100;

    return {
      value: Math.abs(difference).toFixed(1),
      positive: difference > 0,
      percentChange: percentChange.toFixed(1),
    };
  };

  const trend = calculateTrend();

  // Normalize pressure value for gauge (typical range: 980-1040 hPa)
  const normalizedValue =
    currentPressure > 0
      ? Math.min(Math.max((currentPressure - 980) / (1040 - 980), 0), 1) * 100
      : 0;

  // Determine pressure status
  const getPressureStatus = (pressure: number) => {
    if (pressure === 0) return { label: "No Data", color: "text.secondary" };
    if (pressure < 1000) return { label: "Low", color: "error.main" };
    if (pressure > 1020) return { label: "High", color: "success.main" };
    return { label: "Normal", color: "primary.main" };
  };

  const status = getPressureStatus(currentPressure);

  if (loading) {
    return (
      <StyledPaper>
        {!hideTitle && (
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ textAlign: "center" }}
          >
            Barometric Pressure
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Loading pressure data...
            </Typography>
          </Box>
        </Box>
      </StyledPaper>
    );
  }

  if (!data || data.length === 0 || currentPressure === 0) {
    return (
      <StyledPaper>
        {!hideTitle && (
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ textAlign: "center" }}
          >
            Barometric Pressure
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ color: "text.secondary", fontSize: "2rem", mb: 1 }}>
              ⚡
            </Box>
            <Typography variant="body2" color="text.secondary">
              No pressure data available
            </Typography>
          </Box>
        </Box>
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
          sx={{ textAlign: "center" }}
        >
          Barometric Pressure
        </Typography>
      )}

      <GaugeContainer
        role="img"
        aria-label={`Current barometric pressure: ${currentPressure.toFixed(1)} hectopascals, status: ${status.label}`}
      >
        {/* Background circle */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={140}
          thickness={6}
          sx={{
            color: "rgba(0, 0, 0, 0.1)",
            position: "absolute",
          }}
          aria-hidden="true"
        />

        {/* Pressure gauge */}
        <CircularProgress
          variant="determinate"
          value={normalizedValue}
          size={140}
          thickness={6}
          sx={{
            color: status.color,
            position: "absolute",
            transform: "rotate(-90deg) !important",
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
          aria-hidden="true"
        />

        {/* Center value display */}
        <GaugeValue>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: status.color, fontSize: "25px" }}
            aria-live="polite"
          >
            {currentPressure.toFixed(1)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
            aria-label="hectopascals"
          >
            hPa
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: status.color,
              fontWeight: 500,
              mt: 0.5,
            }}
            aria-live="polite"
          >
            {status.label}
          </Typography>
        </GaugeValue>
      </GaugeContainer>

      {/* Trend indicator */}
      {trend && (
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: trend.positive ? "success.light" : "error.light",
              border: "0.6px solid",
              borderColor: trend.positive ? "success.main" : "error.main",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: trend.positive ? "success.main" : "error.main",
                fontWeight: 500,
              }}
            >
              {trend.positive ? "↗" : "↘"} {trend.value} hPa
            </Typography>
          </Box>
        </Box>
      )}
    </StyledPaper>
  );
};
