import { useState, useMemo } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import TeamProgressCard from "./TeamProgressCard";
import WebsiteVisitorsCard from "./WebsiteVisitorsCard";

const UserCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();

  const slides = useMemo(
    () => [
      <TeamProgressCard key="team-progress" />,
      <WebsiteVisitorsCard key="website-visitors" />,
    ],
    [],
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "0 40px",
        overflow: "hidden",
      }}
    >
      {/* Carousel Container */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.3s ease-in-out",
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {slide}
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
          zIndex: 1,
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
          zIndex: 1,
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          marginTop: 2,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor:
                currentSlide === index
                  ? theme.palette.primary.main
                  : theme.palette.grey[400],
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor:
                  currentSlide === index
                    ? theme.palette.primary.dark
                    : theme.palette.grey[600],
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default UserCarousel;
