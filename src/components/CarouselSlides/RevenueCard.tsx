import { Box, Typography, Paper, Chip } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

interface LegendItemProps {
  label: string;
  color?: string;
}

const LegendItem = ({ label }: LegendItemProps) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      fontSize: "10px",
      color: "text.secondary",
      fontWeight: 500,
      lineHeight: 1.4,
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "text.secondary",
        flexShrink: 0,
      }}
    />
    <Typography
      variant="caption"
      sx={{ fontSize: "10px", color: "text.secondary" }}
    >
      {label}
    </Typography>
  </Box>
);

export default function RevenueCard() {
  return (
    <Box
      sx={{
        maxWidth: "689px",
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: "0.6px solid var(--Neutral-Colors-600, #0B1739)",
          boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
          p: { xs: 2.5, sm: 3.625 },
          background: "var(--Secondary-Colors-Color-1, #0B1739)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1,
            mb: 1.25,
          }}
        >
          Revenue by customer type
        </Typography>

        {/* Main revenue section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: { xs: 2, sm: 5.5 },
            flexWrap: "wrap",
            width: "100%",
            mb: 3.625,
          }}
        >
          {/* Revenue amount and growth */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              whiteSpace: { xs: "normal", sm: "nowrap" },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: 1.33,
              }}
            >
              $240.8K
            </Typography>
            <Chip
              icon={
                <TrendingUpIcon sx={{ fontSize: 8, color: "success.main" }} />
              }
              label="14.8%"
              size="small"
              sx={{
                height: "auto",
                borderRadius: "2px",
                border:
                  "0.6px solid var(--Other-Green-50, rgba(5, 193, 104, 0.20))",
                background: "var(--Other-Green-50, rgba(5, 193, 104, 0.20))",
                color: "success.main",
                fontSize: "10px",
                fontWeight: 500,
                lineHeight: 1.4,
                px: 0.5,
                py: 0.25,
                "& .MuiChip-label": {
                  px: 0.5,
                },
                "& .MuiChip-icon": {
                  margin: 0,
                  marginRight: 0.25,
                },
              }}
            />
          </Box>

          {/* Legend and date picker */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.375,
              flexGrow: 1,
              fontSize: "10px",
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            {/* Legend items */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                lineHeight: 1.4,
                flexGrow: 1,
              }}
            >
              <LegendItem label="Current clients" />
              <LegendItem label="Subscribers" />
              <LegendItem label="New customers" />
            </Box>

            {/* Date picker */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderRadius: "4px",
                border: "0.6px solid var(--Neutral-Colors-600, #0B1739)",
                boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
                background: "var(--Neutral-Colors-700, #0A1330)",
                px: 1.125,
                py: 1.125,
                lineHeight: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarIcon
                  sx={{ width: 10, height: 10, color: "text.secondary" }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontSize: "10px", color: "text.secondary" }}
                >
                  Jan 2024 - Dec 2024
                </Typography>
              </Box>
              <ExpandMoreIcon
                sx={{ width: 12, height: 12, color: "text.secondary" }}
              />
            </Box>
          </Box>
        </Box>

        {/* Chart section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            ml: 1.625,
            fontSize: "10px",
            color: "text.secondary",
            fontWeight: 500,
            whiteSpace: { xs: "normal", sm: "nowrap" },
            textAlign: "right",
            lineHeight: 1.4,
            flexWrap: "wrap",
          }}
        >
          {/* Y-axis labels */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "10px", color: "text.secondary" }}
            >
              100K
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "10px",
                color: "text.secondary",
                mt: 6.875,
              }}
            >
              80K
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "10px",
                color: "text.secondary",
                mt: 7,
              }}
            >
              40K
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                mt: 6.75,
                px: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "text.secondary" }}
              >
                20K
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "10px",
                  color: "text.secondary",
                  mt: 6.875,
                }}
              >
                0K
              </Typography>
            </Box>
          </Box>

          {/* Chart placeholder */}
          <Box
            component="img"
            src="https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/e366a3f370b5bbd6b00cbf2b09e61835cad416d3"
            alt="Revenue chart"
            sx={{
              position: "relative",
              display: "flex",
              mt: 1.25,
              flexGrow: 1,
              width: "fit-content",
              maxWidth: { xs: "100%", sm: "none" },
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
