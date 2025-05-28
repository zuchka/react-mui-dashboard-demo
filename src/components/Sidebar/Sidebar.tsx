import { Box, Button, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "22%",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 8px 28px 0px rgba(1, 5, 17, 0.30)",
  display: "flex",
  flexDirection: "column",
  paddingTop: "40px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    paddingTop: "20px",
  },
}));

const MenuItem = styled(Box)(({ theme }) => ({
  padding: "14px",
  borderRadius: "7px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  textDecoration: "none",
  color: theme.palette.text.secondary,
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

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/12e5903a7437a6622d9d786c782556678c3707ee?placeholderIfAbsent=true",
    },
    { path: "/all-pages", label: "All pages" },
    { path: "/reports", label: "Reports" },
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

  return (
    <SidebarContainer>
      <Box px={3.5} mb={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/fccf2e7ec9723b0ade97e83d78184ae7dc22e34b?placeholderIfAbsent=true"
            alt="Logo"
            style={{ width: "26px" }}
          />
          <Typography variant="h6" color="text.primary">
            Dashdark X
          </Typography>
        </Box>
      </Box>

      <Box px={3.5}>
        {menuItems.map((item) => (
          <StyledLink to={item.path} key={item.path}>
            <MenuItem
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.icon && (
                <img src={item.icon} alt="" style={{ width: "14px" }} />
              )}
              <Typography variant="body2">{item.label}</Typography>
            </MenuItem>
          </StyledLink>
        ))}
      </Box>

      <Divider sx={{ my: 2, opacity: 0.2 }} />

      <Box px={3.5}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            background:
              "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
          }}
        >
          Get template
        </Button>
      </Box>

      <Box mt="auto" p={3.5} display="flex" alignItems="center" gap={1}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/26bd6ffcec002bf455996a05d2b89c3461015451?placeholderIfAbsent=true"
          alt="Profile"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
          }}
        />
        <Box>
          <Typography variant="body2" color="text.primary">
            John Carter
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Account settings
          </Typography>
        </Box>
      </Box>
    </SidebarContainer>
  );
};
