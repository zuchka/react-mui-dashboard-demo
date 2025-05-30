import { Typography, Box } from "@mui/material";
import UserCarousel from "../components/UserCarousel/UserCarousel";

export default function Users() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Users
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
          User Analytics
        </Typography>
        <UserCarousel />
      </Box>
    </Box>
  );
}
