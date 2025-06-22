import { Box, Typography, styled } from "@mui/material";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";

interface NotificationToggleProps {
  label: string;
  initialInAppEnabled?: boolean;
  initialEmailEnabled?: boolean;
  onInAppChange?: (enabled: boolean) => void;
  onEmailChange?: (enabled: boolean) => void;
}

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0",
  minHeight: "30px",
}));

const LabelContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const ToggleGroup = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "143px",
  height: "30px",
}));

const ToggleButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "position",
})<{ active: boolean; position: "left" | "right" }>(
  ({ theme, active, position }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    padding: "6px 9px",
    borderRadius: position === "left" ? "4px 0 0 4px" : "0 4px 4px 0",
    border: `0.6px solid ${active ? theme.palette.primary.main : "#0B1739"}`,
    backgroundColor: active ? theme.palette.primary.main : "#0A1330",
    boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flex: 1,
    height: "100%",

    "&:hover": {
      backgroundColor: active ? theme.palette.primary.main : "#1A2449",
    },

    "& .MuiSvgIcon-root": {
      fontSize: "14px",
      color: active ? "#FFFFFF" : "#AEB9E1",
    },
  }),
);

const ToggleText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
  fontSize: "12px",
  fontWeight: 500,
  color: active ? "#FFFFFF" : "#AEB9E1",
  fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
}));

const NotificationLabel = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: 500,
  color: "#FFFFFF",
  fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
}));

const HelpIcon = styled(HelpOutlineIcon)(() => ({
  fontSize: "12px",
  color: "#AEB9E1",
  cursor: "pointer",
}));

export default function NotificationToggle({
  label,
  initialInAppEnabled = false,
  initialEmailEnabled = false,
  onInAppChange,
  onEmailChange,
}: NotificationToggleProps) {
  const [inAppEnabled, setInAppEnabled] = useState(initialInAppEnabled);
  const [emailEnabled, setEmailEnabled] = useState(initialEmailEnabled);

  const handleInAppToggle = () => {
    const newValue = !inAppEnabled;
    setInAppEnabled(newValue);
    onInAppChange?.(newValue);
  };

  const handleEmailToggle = () => {
    const newValue = !emailEnabled;
    setEmailEnabled(newValue);
    onEmailChange?.(newValue);
  };

  return (
    <ToggleContainer>
      <LabelContainer>
        <NotificationLabel>{label}</NotificationLabel>
        <HelpIcon />
      </LabelContainer>

      <ToggleGroup>
        <ToggleButton
          active={inAppEnabled}
          position="left"
          onClick={handleInAppToggle}
          role="button"
          tabIndex={0}
          aria-label={`Toggle in-app notifications for ${label}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleInAppToggle();
            }
          }}
        >
          <PhoneAndroidIcon />
          <ToggleText active={inAppEnabled}>In-app</ToggleText>
        </ToggleButton>

        <ToggleButton
          active={emailEnabled}
          position="right"
          onClick={handleEmailToggle}
          role="button"
          tabIndex={0}
          aria-label={`Toggle email notifications for ${label}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleEmailToggle();
            }
          }}
        >
          <EmailIcon />
          <ToggleText active={emailEnabled}>Email</ToggleText>
        </ToggleButton>
      </ToggleGroup>
    </ToggleContainer>
  );
}
