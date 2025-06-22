import { Box, Typography, Paper, styled } from "@mui/material";
import NotificationToggle from "../NotificationToggle";

interface NotificationItem {
  id: string;
  label: string;
  inAppEnabled: boolean;
  emailEnabled: boolean;
}

interface NotificationSectionProps {
  title: string;
  description: string;
  notifications: NotificationItem[];
  onNotificationChange?: (
    id: string,
    type: "inApp" | "email",
    enabled: boolean,
  ) => void;
}

const SectionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  maxWidth: "600px",
}));

const SectionHeader = styled(Box)(() => ({
  width: "100%",
  maxWidth: "474px",
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "18px",
  color: "#FFFFFF",
  fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
  marginBottom: "8px",
}));

const SectionDescription = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "14px",
  color: "#AEB9E1",
  fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
}));

const NotificationCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#0B1739",
  border: "0.6px solid #343B4F",
  borderRadius: "8px",
  padding: "28px",
  filter: "drop-shadow(0px 2px 10px rgba(25, 93, 194, 0.07))",
  display: "flex",
  flexDirection: "column",
  gap: "0",
  position: "relative",
  boxShadow: "none",
  width: "100%",
  height: "322px",
}));

const SeparatorLine = styled(Box)(() => ({
  width: "100%",
  height: "1px",
  backgroundColor: "#0B1739",
  margin: "8px 0",
}));

export default function NotificationSection({
  title,
  description,
  notifications,
  onNotificationChange,
}: NotificationSectionProps) {
  const handleNotificationChange = (
    id: string,
    type: "inApp" | "email",
    enabled: boolean,
  ) => {
    onNotificationChange?.(id, type, enabled);
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>

      <NotificationCard>
        {notifications.map((notification, index) => (
          <Box key={notification.id}>
            <NotificationToggle
              label={notification.label}
              initialInAppEnabled={notification.inAppEnabled}
              initialEmailEnabled={notification.emailEnabled}
              onInAppChange={(enabled) =>
                handleNotificationChange(notification.id, "inApp", enabled)
              }
              onEmailChange={(enabled) =>
                handleNotificationChange(notification.id, "email", enabled)
              }
            />
            {index < notifications.length - 1 && <SeparatorLine />}
          </Box>
        ))}
      </NotificationCard>
    </SectionContainer>
  );
}
