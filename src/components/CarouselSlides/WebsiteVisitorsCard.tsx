import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { GetApp as ExportIcon } from "@mui/icons-material";

interface StatItemProps {
  label: string;
  percentage: string;
}

const StatItem = ({ label, percentage }: StatItemProps) => (
  <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontSize: "14px" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.primary", fontSize: "14px", fontWeight: 500 }}
      >
        {percentage}
      </Typography>
    </Box>
    <Divider
      sx={{
        my: 2,
        borderColor: "var(--Neutral-Colors-600, #0B1739)",
        borderWidth: "0.6px",
      }}
    />
  </>
);

export default function WebsiteVisitorsCard() {
  return (
    <Box
      sx={{
        maxWidth: "341px",
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: "0.6px solid var(--Neutral-Colors-600, #0B1739)",
          boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
          p: { xs: 2.5, sm: 4.25 },
          background: "var(--Secondary-Colors-Color-1, #0B1739)",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {/* Header with title and export button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 14.125,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              fontFamily:
                "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: 1.13,
            }}
          >
            Website Visitors
          </Typography>
          <Button
            variant="contained"
            size="small"
            endIcon={<ExportIcon sx={{ width: 10, height: 10 }} />}
            sx={{
              background: "var(--Neutral-Colors-700, #0A1330)",
              color: "text.primary",
              fontFamily:
                "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: 1.17,
              textTransform: "none",
              px: 1,
              py: 1,
              gap: 0.75,
              minWidth: "auto",
              borderRadius: "4px",
              "&:hover": {
                background: "var(--Neutral-Colors-700, #0A1330)",
                opacity: 0.8,
              },
            }}
          >
            Export
          </Button>
        </Box>

        {/* Main stat number */}
        <Typography
          variant="h3"
          sx={{
            color: "text.primary",
            textAlign: "center",
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "28px",
            fontWeight: 600,
            lineHeight: 1.14,
            mb: 14,
          }}
        >
          150k
        </Typography>

        {/* Stats breakdown */}
        <Box
          sx={{
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "14px",
          }}
        >
          <StatItem label="Organic" percentage="30%" />
          <StatItem label="Social" percentage="50%" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "14px" }}
            >
              Direct
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontSize: "14px", fontWeight: 500 }}
            >
              20%
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
