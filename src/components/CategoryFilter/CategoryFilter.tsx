import React from "react";
import { Box, Chip, Typography } from "@mui/material";

export interface Category {
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
                  : "transparent",
              color:
                selectedCategory === category.id ? "white" : "text.secondary",
              border: "1px solid",
              borderColor:
                selectedCategory === category.id
                  ? "primary.main"
                  : "rgba(255, 255, 255, 0.2)",
              fontWeight: 500,
              fontSize: "14px",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category.id
                    ? "primary.dark"
                    : "rgba(255, 255, 255, 0.05)",
                borderColor:
                  selectedCategory === category.id
                    ? "primary.dark"
                    : "rgba(255, 255, 255, 0.3)",
              },
              "& .MuiChip-label": {
                px: 2,
                py: 1,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryFilter;
