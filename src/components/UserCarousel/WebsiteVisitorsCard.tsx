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
          height: "320px",
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

        {/* Progress Bars */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            width: "100%",
            gap: "12px",
          }}
        >
          {/* Sell Progress */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "var(--Neutral-Colors-400, #AEB9E1)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                Sell
              </Typography>
              <Typography
                sx={{
                  color: "var(--Neutral-Colors-100, #FFF)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                65%
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "65%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #CB3CFF 0%, #7F25FB 100%)",
                  borderRadius: "2px",
                }}
              />
            </Box>
          </Box>

          {/* Distribute Progress */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "var(--Neutral-Colors-400, #AEB9E1)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                Distribute
              </Typography>
              <Typography
                sx={{
                  color: "var(--Neutral-Colors-100, #FFF)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                45%
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "45%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #00E6CC 0%, #00B8A9 100%)",
                  borderRadius: "2px",
                }}
              />
            </Box>
          </Box>

          {/* Return Progress */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "var(--Neutral-Colors-400, #AEB9E1)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                Return
              </Typography>
              <Typography
                sx={{
                  color: "var(--Neutral-Colors-100, #FFF)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                30%
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "30%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #FF6B6B 0%, #FF5722 100%)",
                  borderRadius: "2px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default WebsiteVisitorsCard;
