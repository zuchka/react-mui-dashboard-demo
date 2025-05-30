import { Box, Typography, Card } from "@mui/material";

const WebsiteVisitorsCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "341px",
        flexDirection: "column",
        alignItems: "stretch",
        fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
        margin: "0 auto",
      }}
    >
      <Card
        sx={{
          borderRadius: "12px",
          border: "0.6px solid var(--Neutral-Colors-600, #0B1739)",
          boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
          display: "flex",
          width: "100%",
          padding: "28px 30px",
          flexDirection: "column",
          alignItems: "start",
          background: "var(--Secondary-Colors-Color-1, #0B1739)",
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "var(--Neutral-Colors-100, #FFF)",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.13,
          }}
        >
          Website Visitors
        </Typography>

        <Box
          sx={{
            alignSelf: "center",
            display: "flex",
            marginTop: "79px",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "nowrap",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "var(--Neutral-Colors-100, #FFF)",
              fontFeatureSettings: "'liga' off, 'clig' off",
              fontSize: "32px",
              fontWeight: 600,
              lineHeight: 1.39,
            }}
          >
            80%
          </Typography>
          <Typography
            sx={{
              color: "var(--Neutral-Colors-500, #7E89AC)",
              fontFeatureSettings: "'liga' off, 'clig' off",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            Transactions
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            marginTop: "36px",
            marginLeft: "18px",
            minHeight: "16px",
            width: "100%",
            alignItems: "start",
            gap: "30px",
            fontSize: "14px",
            color: "var(--Neutral-Colors-400, #AEB9E1)",
            fontWeight: 400,
            whiteSpace: "nowrap",
            lineHeight: 1.14,
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              color: "var(--Neutral-Colors-400, #AEB9E1)",
              fontFeatureSettings: "'liga' off, 'clig' off",
              alignSelf: "stretch",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "start",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.14,
            }}
          >
            Sell
          </Typography>
          <Typography
            sx={{
              color: "var(--Neutral-Colors-400, #AEB9E1)",
              fontFeatureSettings: "'liga' off, 'clig' off",
              alignSelf: "stretch",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "start",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.14,
            }}
          >
            Distribute
          </Typography>
          <Typography
            sx={{
              color: "var(--Neutral-Colors-400, #AEB9E1)",
              fontFeatureSettings: "'liga' off, 'clig' off",
              alignSelf: "stretch",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "start",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.14,
            }}
          >
            Return
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default WebsiteVisitorsCard;
