import {
  Typography,
  Box,
  Paper,
  Button,
  useTheme,
  styled,
} from "@mui/material";
import { useState, useCallback } from "react";

// Custom styled toggle button component
const NotificationToggle = styled(Button)<{ active?: boolean }>(
  ({ theme, active }) => ({
    minWidth: "auto",
    padding: "6px 9px",
    fontSize: "12px",
    fontWeight: 400,
    border: `0.6px solid ${active ? "#CB3CFF" : "#0B1739"}`,
    backgroundColor: active ? "#CB3CFF" : "#0A1330",
    color: active ? "#FFF" : "#AEB9E1",
    borderRadius: 0,
    boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    "&:first-of-type": {
      borderRadius: "4px 0 0 4px",
    },
    "&:last-of-type": {
      borderRadius: "0 4px 4px 0",
    },
    "&:hover": {
      backgroundColor: active ? "#CB3CFF" : "#0A1330",
      borderColor: active ? "#CB3CFF" : "#343B4F",
    },
  }),
);

const NotificationCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#0B1739",
  borderRadius: "12px",
  border: "1px solid #343B4F",
  boxShadow: "0px 2px 10px rgba(25, 93, 194, 0.07)",
  padding: "31px 25px 82px 0",
  [theme.breakpoints.down("md")]: {
    paddingRight: "20px",
  },
}));

const NotificationRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "543px",
  gap: "20px",
  flexWrap: "wrap",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const Divider = styled(Box)({
  backgroundColor: "#0B1739",
  border: "1px solid #0B1739",
  height: "0px",
  marginTop: "23px",
  marginBottom: "25px",
});

interface NotificationState {
  inApp: boolean;
  email: boolean;
}

interface NotificationSettings {
  mentioned: NotificationState;
  replies: NotificationState;
  assigned: NotificationState;
  dailySummary: NotificationState;
  weeklySummary: NotificationState;
  monthlySummary: NotificationState;
}

export default function Settings() {
  const theme = useTheme();

  const [notifications, setNotifications] = useState<NotificationSettings>({
    mentioned: { inApp: true, email: false },
    replies: { inApp: false, email: true },
    assigned: { inApp: false, email: true },
    dailySummary: { inApp: false, email: true },
    weeklySummary: { inApp: true, email: false },
    monthlySummary: { inApp: true, email: false },
  });

  const handleNotificationChange = (
    category: keyof NotificationSettings,
    type: keyof NotificationState,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }));
  };

  const NotificationToggleGroup = ({
    category,
    inAppActive,
    emailActive,
  }: {
    category: keyof NotificationSettings;
    inAppActive: boolean;
    emailActive: boolean;
  }) => (
    <Box sx={{ display: "flex", alignItems: "start" }}>
      <NotificationToggle
        active={inAppActive}
        onClick={() => handleNotificationChange(category, "inApp")}
      >
        <img
          src={
            inAppActive
              ? "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/bac86996770940d72e7a46bd9283a666a1cab0bc?placeholderIfAbsent=true"
              : "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/ade96a6ee4d0c33d2ff3d4635195623084206fa8?placeholderIfAbsent=true"
          }
          alt=""
          style={{ width: 14, height: 14 }}
        />
        In-app
      </NotificationToggle>
      <NotificationToggle
        active={emailActive}
        onClick={() => handleNotificationChange(category, "email")}
      >
        <img
          src={
            emailActive
              ? "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/411b5e4b7280baa432d73e29f24098dd86b1a150?placeholderIfAbsent=true"
              : "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/601c22712fef0c1450c53281ec7391d9a8e00c38?placeholderIfAbsent=true"
          }
          alt=""
          style={{ width: 14, height: 14 }}
        />
        Email
      </NotificationToggle>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "732px",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
          fontWeight: 500,
          backgroundColor: "#081028",
          padding: "48px 57px",
          borderRadius: "12px",
          [theme.breakpoints.down("md")]: {
            padding: "48px 20px",
          },
        }}
      >
        {/* General Notifications Section */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              width: "474px",
              maxWidth: "100%",
              paddingRight: "80px",
              flexDirection: "column",
              alignItems: "start",
              [theme.breakpoints.down("md")]: {
                paddingRight: "20px",
              },
            }}
          >
            <Typography
              sx={{
                color: "#FFF",
                fontSize: "16px",
                lineHeight: 1,
                fontWeight: 500,
              }}
            >
              General notifications
            </Typography>
            <Typography
              sx={{
                color: "#AEB9E1",
                fontSize: "14px",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing.
            </Typography>
          </Box>

          <Box sx={{ marginTop: "24px", width: "100%" }}>
            <NotificationCard>
              <NotificationRow>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#FFF",
                  }}
                >
                  <Typography sx={{ color: "#FFF", fontSize: "12px" }}>
                    I'm mentioned in a message
                  </Typography>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/810a8a8e4607ddcc81ec2b0db6fbc102d2f8bef4?placeholderIfAbsent=true"
                    alt=""
                    style={{ width: 12, height: 12 }}
                  />
                </Box>
                <NotificationToggleGroup
                  category="mentioned"
                  inAppActive={notifications.mentioned.inApp}
                  emailActive={notifications.mentioned.email}
                />
              </NotificationRow>

              <Divider />

              <NotificationRow>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#FFF",
                  }}
                >
                  <Typography sx={{ color: "#FFF", fontSize: "12px" }}>
                    Someone replies to any message
                  </Typography>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/810a8a8e4607ddcc81ec2b0db6fbc102d2f8bef4?placeholderIfAbsent=true"
                    alt=""
                    style={{ width: 12, height: 12 }}
                  />
                </Box>
                <NotificationToggleGroup
                  category="replies"
                  inAppActive={notifications.replies.inApp}
                  emailActive={notifications.replies.email}
                />
              </NotificationRow>

              <Divider />

              <NotificationRow sx={{ gap: "40px 100px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#FFF",
                    flex: 1,
                  }}
                >
                  <Typography sx={{ color: "#FFF", fontSize: "12px" }}>
                    I'm assigned a task
                  </Typography>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/810a8a8e4607ddcc81ec2b0db6fbc102d2f8bef4?placeholderIfAbsent=true"
                    alt=""
                    style={{ width: 12, height: 12 }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <NotificationToggleGroup
                    category="assigned"
                    inAppActive={notifications.assigned.inApp}
                    emailActive={notifications.assigned.email}
                  />
                </Box>
              </NotificationRow>

              <Divider />
            </NotificationCard>
          </Box>
        </Box>

        {/* Summary Notifications Section */}
        <Box
          sx={{
            display: "flex",
            marginTop: "50px",
            flexDirection: "column",
            [theme.breakpoints.down("md")]: {
              marginTop: "40px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "474px",
              maxWidth: "100%",
              paddingRight: "80px",
              flexDirection: "column",
              alignItems: "start",
              [theme.breakpoints.down("md")]: {
                paddingRight: "20px",
              },
            }}
          >
            <Typography
              sx={{
                color: "#FFF",
                fontSize: "16px",
                lineHeight: 1,
                fontWeight: 500,
              }}
            >
              Summary notifications
            </Typography>
            <Typography
              sx={{
                color: "#AEB9E1",
                fontSize: "14px",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing.
            </Typography>
          </Box>

          <Box sx={{ marginTop: "24px", width: "100%" }}>
            <NotificationCard>
              <NotificationRow>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#FFF",
                  }}
                >
                  <Typography sx={{ color: "#FFF", fontSize: "12px" }}>
                    Daily summary
                  </Typography>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/2e0dad61d40ec22570e37384ca09b3d53344808f?placeholderIfAbsent=true"
                    alt=""
                    style={{ width: 12, height: 12 }}
                  />
                </Box>
                <NotificationToggleGroup
                  category="dailySummary"
                  inAppActive={notifications.dailySummary.inApp}
                  emailActive={notifications.dailySummary.email}
                />
              </NotificationRow>

              <Divider />

              <NotificationRow>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#FFF",
                  }}
                >
                  <Typography sx={{ color: "#FFF", fontSize: "12px" }}>
                    Weekly summary
                  </Typography>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/2e0dad61d40ec22570e37384ca09b3d53344808f?placeholderIfAbsent=true"
                    alt=""
                    style={{ width: 12, height: 12 }}
                  />
                </Box>
                <NotificationToggleGroup
                  category="weeklySummary"
                  inAppActive={notifications.weeklySummary.inApp}
                  emailActive={notifications.weeklySummary.email}
                />
              </NotificationRow>

              <Divider />

              <NotificationRow>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#FFF",
                  }}
                >
                  <Typography sx={{ color: "#FFF", fontSize: "12px" }}>
                    Monthly summary
                  </Typography>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/2e0dad61d40ec22570e37384ca09b3d53344808f?placeholderIfAbsent=true"
                    alt=""
                    style={{ width: 12, height: 12 }}
                  />
                </Box>
                <NotificationToggleGroup
                  category="monthlySummary"
                  inAppActive={notifications.monthlySummary.inApp}
                  emailActive={notifications.monthlySummary.email}
                />
              </NotificationRow>

              <Divider />
            </NotificationCard>
          </Box>
        </Box>

        {/* Add User Button */}
        <Box
          sx={{
            alignSelf: "flex-end",
            marginTop: "52px",
            [theme.breakpoints.down("md")]: {
              marginTop: "40px",
            },
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#CB3CFF",
              color: "#FFF",
              fontSize: "16px",
              fontFamily:
                "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: 500,
              borderRadius: "4px",
              padding: "14px 61px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#B733E6",
              },
              [theme.breakpoints.down("md")]: {
                padding: "14px 20px",
              },
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
