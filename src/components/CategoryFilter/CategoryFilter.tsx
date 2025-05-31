import React from "react";
import { Box, Chip, Typography } from "@mui/material";

interface Category {
  id: string;
  name: string;
  count?: number;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          mb: 3,
          color: "text.secondary",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        Category
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{category.name}</span>
                {category.count !== undefined && (
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px",
                      px: 0.5,
                      py: 0.25,
                      fontSize: "10px",
                      lineHeight: 1,
                    }}
                  >
                    {category.count}
                  </Box>
                )}
              </Box>
            }
            variant={selectedCategory === category.id ? "filled" : "outlined"}
            onClick={() => onCategoryChange(category.id)}
            sx={{
              backgroundColor:
                selectedCategory === category.id
                  ? "primary.main"
                  : "background.paper",
              color:
                selectedCategory === category.id ? "white" : "text.primary",
              border: "1px solid",
              borderColor:
                selectedCategory === category.id
                  ? "primary.main"
                  : "rgba(52, 59, 79, 1)",
              fontWeight: 500,
              fontSize: "14px",
              borderRadius: 2,
              height: 36,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category.id
                    ? "primary.dark"
                    : "rgba(203, 60, 255, 0.1)",
                borderColor:
                  selectedCategory === category.id
                    ? "primary.dark"
                    : "primary.main",
                transform: "translateY(-1px)",
              },
              "& .MuiChip-label": {
                px: 2.5,
                py: 1,
                fontFamily:
                  "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryFilter;
