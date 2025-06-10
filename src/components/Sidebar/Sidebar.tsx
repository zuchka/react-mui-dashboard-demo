import { Box, Button, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const SidebarContainer = styled(Box)<{ expanded: boolean }>(
  ({ theme, expanded }) => ({
    width: expanded ? "22%" : "80px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 8px 28px 0px rgba(1, 5, 17, 0.30)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "40px",
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
    position: "relative",
    zIndex: 1000,
    [theme.breakpoints.down("md")]: {
      width: expanded ? "100%" : "70px",
      paddingTop: "20px",
    },
  }),
);

const MenuItem = styled(Box)<{ expanded: boolean }>(({ theme, expanded }) => ({
  padding: expanded ? "14px" : "14px 12px",
  borderRadius: "7px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  textDecoration: "none",
  color: theme.palette.text.secondary,
  justifyContent: expanded ? "flex-start" : "center",
  minHeight: "46px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.active": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
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
  gap: expanded ? "8px" : "0",
  justifyContent: expanded ? "flex-start" : "center",
  transition: "all 0.3s ease-in-out",
  overflow: "hidden",
  whiteSpace: "nowrap",
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
  }),
);

const SidebarPadding = styled(Box)<{ expanded: boolean }>(({ expanded }) => ({
  paddingLeft: expanded ? "28px" : "12px",
  paddingRight: expanded ? "28px" : "12px",
  transition: "padding 0.3s ease-in-out",
}));

export const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <SidebarContainer
      expanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="navigation"
      aria-label="Main navigation"
      aria-expanded={isExpanded}
    >
      <SidebarPadding expanded={isExpanded} mb={4}>
        <LogoContainer expanded={isExpanded}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/fccf2e7ec9723b0ade97e83d78184ae7dc22e34b?placeholderIfAbsent=true"
            alt="Dashdark X Logo"
            style={{
              width: "26px",
              minWidth: "26px",
              transition: "all 0.3s ease-in-out",
            }}
          />
          <MenuItemText variant="h6" color="text.primary" expanded={isExpanded}>
            Dashdark X
          </MenuItemText>
        </LogoContainer>
      </SidebarPadding>

      <SidebarPadding expanded={isExpanded}>
        {menuItems.map((item) => (
          <StyledLink to={item.path} key={item.path}>
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
                    width: "14px",
                    minWidth: "14px",
                    height: "14px",
                  }}
                />
              ) : (
                <Box
                  component="span"
                  sx={{
                    fontSize: "14px",
                    minWidth: "14px",
                    textAlign: "center",
                    opacity: 0.7,
                  }}
                >
                  {getDefaultIcon(item.label)}
                </Box>
              )}
              <MenuItemText variant="body2" expanded={isExpanded}>
                {item.label}
              </MenuItemText>
            </MenuItem>
          </StyledLink>
        ))}
      </SidebarPadding>

      <Divider sx={{ my: 2, opacity: 0.2 }} />

      <SidebarPadding expanded={isExpanded}>
        <Button
          variant="contained"
          fullWidth={isExpanded}
          sx={{
            mt: 2,
            py: 1.5,
            minWidth: isExpanded ? "auto" : "40px",
            width: isExpanded ? "100%" : "40px",
            background:
              "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
            transition: "all 0.3s ease-in-out",
            fontSize: isExpanded ? "inherit" : "12px",
            overflow: "hidden",
          }}
        >
          {isExpanded ? "Get template" : "GT"}
        </Button>
      </SidebarPadding>

      <SidebarPadding
        expanded={isExpanded}
        sx={{
          mt: "auto",
          pt: 2,
          pb: 3.5,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={isExpanded ? 1 : 0}
          sx={{
            justifyContent: isExpanded ? "flex-start" : "center",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/26bd6ffcec002bf455996a05d2b89c3461015451?placeholderIfAbsent=true"
            alt="John Carter Profile"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              minWidth: "32px",
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
            <Typography variant="body2" color="text.primary">
              John Carter
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Account settings
            </Typography>
          </Box>
        </Box>
      </SidebarPadding>
    </SidebarContainer>
  );
};
