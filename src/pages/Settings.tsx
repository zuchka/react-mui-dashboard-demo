import { Typography, Box, Button, styled } from "@mui/material";
import { useState } from "react";
import NotificationSection from "../components/NotificationSection";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
  padding: "47px 16px",
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",

  [theme.breakpoints.up("sm")]: {
    padding: "47px 56px",
  },

  [theme.breakpoints.up("md")]: {
    padding: "47px 74px 47px 56px",
  },
}));

const ContentContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "50px",
  width: "100%",
  maxWidth: "602px",
}));

const AddUserButton = styled(Button)(({ theme }) => ({
  padding: "14px 61px",
  borderRadius: "4px",
  background: theme.palette.primary.main,
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "18px",
  fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
  textTransform: "none",
  boxShadow: "none",
  width: "194px",
  height: "46px",
  alignSelf: "flex-end",

  "&:hover": {
    background: theme.palette.primary.dark,
    boxShadow: "none",
  },

  [theme.breakpoints.down("sm")]: {
    alignSelf: "center",
  },
}));

interface NotificationItem {
  id: string;
  label: string;
  inAppEnabled: boolean;
  emailEnabled: boolean;
}

interface NotificationState {
  general: NotificationItem[];
  summary: NotificationItem[];
}

export default function Settings() {
  const [notifications, setNotifications] = useState<NotificationState>({
    general: [
      {
        id: "mentioned",
        label: "I'm mentioned in a message",
        inAppEnabled: true,
        emailEnabled: false,
      },
      {
        id: "replies",
        label: "Someone replies to any message",
        inAppEnabled: false,
        emailEnabled: true,
      },
      {
        id: "assigned",
        label: "I'm assigned a task",
        inAppEnabled: false,
        emailEnabled: true,
      },
      {
        id: "overdue",
        label: "A task is overdue",
        inAppEnabled: true,
        emailEnabled: false,
      },
    ],
    summary: [
      {
        id: "daily",
        label: "Daily summary",
        inAppEnabled: false,
        emailEnabled: true,
      },
      {
        id: "weekly",
        label: "Weekly summary",
        inAppEnabled: true,
        emailEnabled: false,
      },
      {
        id: "monthly",
        label: "Monthly summary",
        inAppEnabled: true,
        emailEnabled: false,
      },
      {
        id: "annually",
        label: "Annually summary",
        inAppEnabled: false,
        emailEnabled: true,
      },
    ],
  });

  const handleNotificationChange = (
    section: "general" | "summary",
    id: string,
    type: "inApp" | "email",
    enabled: boolean,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [section]: prev[section].map((notification) =>
        notification.id === id
          ? {
              ...notification,
              [type === "inApp" ? "inAppEnabled" : "emailEnabled"]: enabled,
            }
          : notification,
      ),
    }));
  };

  const handleAddUser = () => {
    // Add user functionality
    console.log("Add user clicked");
  };

  return (
    <PageContainer>
      <ContentContainer>
        <NotificationSection
          title="General notifications"
          description="Lorem ipsum dolor sit amet consectetur adipiscing."
          notifications={notifications.general}
          onNotificationChange={(id, type, enabled) =>
            handleNotificationChange("general", id, type, enabled)
          }
        />

        <NotificationSection
          title="Summary notifications"
          description="Lorem ipsum dolor sit amet consectetur adipiscing."
          notifications={notifications.summary}
          onNotificationChange={(id, type, enabled) =>
            handleNotificationChange("summary", id, type, enabled)
          }
        />

        <AddUserButton
          variant="contained"
          onClick={handleAddUser}
          aria-label="Add new user"
        >
          Add User
        </AddUserButton>
      </ContentContainer>
    </PageContainer>
  );
}
