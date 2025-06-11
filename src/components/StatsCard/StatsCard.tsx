import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
  width: "100%",
  boxSizing: "border-box",
}));

interface StatsCardProps {
  title: string;
  value: string;
  icon?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <StyledPaper>
      <Box display="flex" alignItems="center" gap={1}>
        {icon && (
          <img
            src={icon}
            alt=""
            style={{
              width: "14px",
              height: "14px",
              objectFit: "contain",
            }}
          />
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h4" color="text.primary">
          {value}
        </Typography>
        {trend && (
          <Box
            sx={{
              backgroundColor: trend.positive ? "success.light" : "error.light",
              border: "0.6px solid",
              borderColor: trend.positive ? "success.main" : "error.main",
              borderRadius: "2px",
              padding: "2px 4px",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: trend.positive ? "success.main" : "error.main",
                fontWeight: 500,
              }}
            >
              {trend.value}
            </Typography>
          </Box>
        )}
      </Box>
    </StyledPaper>
  );
};
