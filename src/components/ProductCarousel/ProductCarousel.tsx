import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import WebsiteVisitorsCard from "../CarouselSlides/WebsiteVisitorsCard";
import RevenueCard from "../CarouselSlides/RevenueCard";

const slides = [
  { id: 1, component: WebsiteVisitorsCard },
  { id: 2, component: RevenueCard },
];

export default function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const CurrentComponent = slides[currentSlide].component;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: "100%",
        maxWidth: 800,
        mx: "auto",
      }}
    >
      {/* Carousel container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        {/* Previous button */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            left: { xs: -20, sm: -60 },
            zIndex: 1,
            bgcolor: "background.paper",
            color: "text.primary",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              bgcolor: "background.paper",
              opacity: 0.8,
            },
            "&:disabled": {
              bgcolor: "action.disabled",
              color: "action.disabled",
            },
          }}
          disabled={slides.length <= 1}
        >
          <ChevronLeft />
        </IconButton>

        {/* Slide content */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <CurrentComponent />
        </Box>

        {/* Next button */}
        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            right: { xs: -20, sm: -60 },
            zIndex: 1,
            bgcolor: "background.paper",
            color: "text.primary",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              bgcolor: "background.paper",
              opacity: 0.8,
            },
            "&:disabled": {
              bgcolor: "action.disabled",
              color: "action.disabled",
            },
          }}
          disabled={slides.length <= 1}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Dots indicator */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor:
                currentSlide === index ? "primary.main" : "action.disabled",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                bgcolor:
                  currentSlide === index ? "primary.main" : "action.hover",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
