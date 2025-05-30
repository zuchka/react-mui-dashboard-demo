import { Typography, Box } from "@mui/material";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";

export default function Products() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Products
      </Typography>
      <ProductCarousel />
    </Box>
  );
}
