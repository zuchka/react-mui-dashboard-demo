import {
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const SidebarContainer = styled(Box)<{ expanded: boolean }>(
  ({ theme, expanded }) => ({
    width: expanded ? "280px" : "80px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 8px 28px 0px rgba(1, 5, 17, 0.30)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
    position: "relative",
    zIndex: 1000,
    [theme.breakpoints.down("md")]: {
      width: expanded ? "100%" : "70px",
      paddingTop: "15px",
    },
  }),
);

const ToggleButton = styled(IconButton)<{ expanded: boolean }>(
  ({ theme, expanded }) => ({
    position: "absolute",
    top: "15px",
    right: expanded ? "15px" : "50%",
    transform: expanded ? "none" : "translateX(50%)",
    zIndex: 1001,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    width: "32px",
    height: "32px",
    transition: "all 0.3s ease-in-out",
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.primary.main,
    },
  }),
);

const MenuItem = styled(Box)<{ expanded: boolean }>(({ theme, expanded }) => ({
  padding: expanded ? "14px 20px" : "14px 12px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  textDecoration: "none",
  color: theme.palette.text.secondary,
  justifyContent: expanded ? "flex-start" : "center",
  minHeight: "48px",
  transition: "all 0.3s ease-in-out",
  margin: "2px 0",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  "&.active": {
    backgroundColor: theme.palette.primary.main + "20",
    color: theme.palette.primary.main,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    paddingLeft: expanded ? "17px" : "9px",
  },
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  width: "100%",
});

const LogoContainer = styled(Box)<{ expanded: boolean }>(({ expanded }) => ({
  display: "flex",
  alignItems: "center",
  gap: expanded ? "12px" : "0",
  justifyContent: expanded ? "flex-start" : "center",
  transition: "all 0.3s ease-in-out",
  overflow: "hidden",
  whiteSpace: "nowrap",
  marginTop: expanded ? "20px" : "60px", // Increased top margin when collapsed to avoid toggle button
  marginBottom: "30px",
}));

const MenuItemText = styled(Typography)<{ expanded: boolean }>(
  ({ expanded }) => ({
    opacity: expanded ? 1 : 0,
    transform: expanded ? "translateX(0)" : "translateX(-10px)",
    transition: "all 0.3s ease-in-out",
    whiteSpace: "nowrap",
    overflow: "hidden",
    visibility: expanded ? "visible" : "hidden",
    width: expanded ? "auto" : "0",
    fontWeight: 500,
  }),
);

const SidebarPadding = styled(Box)<{ expanded: boolean }>(({ expanded }) => ({
  paddingLeft: expanded ? "20px" : "12px",
  paddingRight: expanded ? "20px" : "12px",
  transition: "padding 0.3s ease-in-out",
}));

export const Sidebar = () => {
  const location = useLocation();

  // Initialize state from localStorage or default to expanded
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("sidebar-expanded");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  // Default icons for menu items that don't have one
  const getDefaultIcon = (label: string) => {
    const iconMap: { [key: string]: string } = {
      "All pages": "📄",
      Reports: "📊",
      Buoys: "🚢",
      Products: "📦",
      Task: "✓",
      Users: "👥",
      Pricing: "💰",
    };
    return iconMap[label] || "•";
  };

  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/12e5903a7437a6622d9d786c782556678c3707ee?placeholderIfAbsent=true",
    },
    { path: "/all-pages", label: "All pages" },
    { path: "/reports", label: "Reports" },
    { path: "/buoys", label: "Buoys" },
    { path: "/products", label: "Products" },
    { path: "/task", label: "Task" },
    {
      path: "/features",
      label: "Features",
      icon: "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/42aa344d48d2bef4d72892ceaca37092f37bb2a2?placeholderIfAbsent=true",
    },
    { path: "/users", label: "Users" },
    { path: "/pricing", label: "Pricing" },
    {
      path: "/integrations",
      label: "Integrations",
      icon: "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/97b7656e71430abbc1ef12e9d65b1995bdfb310d?placeholderIfAbsent=true",
    },
    {
      path: "/settings",
      label: "Settings",
      icon: "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/471f192ad8be415d32dbbc4d11c0a02de1c43dcd?placeholderIfAbsent=true",
    },
    {
      path: "/templates",
      label: "Template pages",
      icon: "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/f85a79eac96da9e9679540e02558f6b61e4991db?placeholderIfAbsent=true",
    },
  ];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarContainer
      expanded={isExpanded}
      role="navigation"
      aria-label="Main navigation"
      aria-expanded={isExpanded}
    >
      <Tooltip
        title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        placement="right"
      >
        <ToggleButton
          expanded={isExpanded}
          onClick={handleToggle}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeftIcon fontSize="small" />
          ) : (
            <MenuIcon fontSize="small" />
          )}
        </ToggleButton>
      </Tooltip>

      <SidebarPadding expanded={isExpanded}>
        <LogoContainer expanded={isExpanded}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/fccf2e7ec9723b0ade97e83d78184ae7dc22e34b?placeholderIfAbsent=true"
            alt="Dashdark X Logo"
            style={{
              width: "32px",
              minWidth: "32px",
              height: "32px",
              transition: "all 0.3s ease-in-out",
            }}
          />
          <MenuItemText variant="h6" color="text.primary" expanded={isExpanded}>
            Buoy Hub
          </MenuItemText>
        </LogoContainer>
      </SidebarPadding>

      <SidebarPadding expanded={isExpanded}>
        {menuItems.map((item) => (
          <StyledLink to={item.path} key={item.path}>
            <Tooltip
              title={!isExpanded ? item.label : ""}
              placement="right"
              disableHoverListener={isExpanded}
            >
              <MenuItem
                expanded={isExpanded}
                className={location.pathname === item.path ? "active" : ""}
                role="menuitem"
                aria-label={item.label}
              >
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt=""
                    style={{
                      width: "18px",
                      minWidth: "18px",
                      height: "18px",
                      opacity: 0.8,
                    }}
                  />
                ) : (
                  <Box
                    component="span"
                    sx={{
                      fontSize: "18px",
                      minWidth: "18px",
                      textAlign: "center",
                      opacity: 0.8,
                    }}
                  >
                    {getDefaultIcon(item.label)}
                  </Box>
                )}
                <MenuItemText variant="body2" expanded={isExpanded}>
                  {item.label}
                </MenuItemText>
              </MenuItem>
            </Tooltip>
          </StyledLink>
        ))}
      </SidebarPadding>

      <Divider sx={{ my: 3, mx: 2, opacity: 0.2 }} />

      <SidebarPadding expanded={isExpanded}>
        <Tooltip
          title={!isExpanded ? "Get template" : ""}
          placement="right"
          disableHoverListener={isExpanded}
        >
          <Button
            variant="contained"
            fullWidth={isExpanded}
            sx={{
              py: 1.5,
              minWidth: isExpanded ? "auto" : "48px",
              width: isExpanded ? "100%" : "48px",
              background:
                "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
              transition: "all 0.3s ease-in-out",
              fontSize: isExpanded ? "14px" : "12px",
              fontWeight: 600,
              overflow: "hidden",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                background:
                  "linear-gradient(128deg, #D76AFF 19.86%, #9B4FFF 68.34%)",
              },
            }}
          >
            {isExpanded ? "Get template" : "GT"}
          </Button>
        </Tooltip>
      </SidebarPadding>

      <SidebarPadding
        expanded={isExpanded}
        sx={{
          mt: "auto",
          pt: 3,
          pb: 4,
        }}
      >
        <Tooltip
          title={!isExpanded ? "John Carter - Account settings" : ""}
          placement="right"
          disableHoverListener={isExpanded}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={isExpanded ? 1.5 : 0}
            sx={{
              justifyContent: isExpanded ? "flex-start" : "center",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/26bd6ffcec002bf455996a05d2b89c3461015451?placeholderIfAbsent=true"
              alt="John Carter Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                minWidth: "40px",
                border: "2px solid rgba(203, 60, 255, 0.2)",
              }}
            />
            <Box
              sx={{
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? "translateX(0)" : "translateX(-10px)",
                transition: "all 0.3s ease-in-out",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: isExpanded ? "auto" : "0",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: 600 }}
              >
                John Carter
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Account settings
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      </SidebarPadding>
    </SidebarContainer>
  );
};
