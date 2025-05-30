import React, { useState, useMemo } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import type { TestimonialData } from "../TestimonialCard/TestimonialCard";

interface TestimonialCarouselProps {
  testimonials: TestimonialData[];
  title?: string;
  subtitle?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title = "Customer Testimonials",
  subtitle = "What our clients say about our products",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" sx={{ color: "#FFF", mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#AEB9E1" }}>
            {subtitle}
          </Typography>
        </Box>

        {/* Navigation Controls */}
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{
              backgroundColor: currentIndex === 0 ? "#343B4F" : "#CB3CFF",
              color: "#FFF",
              "&:hover": {
                backgroundColor: currentIndex === 0 ? "#343B4F" : "#7F25FB",
              },
              "&:disabled": {
                color: "#AEB9E1",
              },
            }}
          >
            <ArrowBackIos sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            sx={{
              backgroundColor: currentIndex >= maxIndex ? "#343B4F" : "#CB3CFF",
              color: "#FFF",
              "&:hover": {
                backgroundColor:
                  currentIndex >= maxIndex ? "#343B4F" : "#7F25FB",
              },
              "&:disabled": {
                color: "#AEB9E1",
              },
            }}
          >
            <ArrowForwardIos sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Stack>

      {/* Carousel Container */}
      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            transition: "transform 0.3s ease-in-out",
            transform: `translateX(-${currentIndex * (400 + 24)}px)`, // 400px card width + 24px gap
          }}
        >
          {testimonials.map((testimonial) => (
            <Box key={testimonial.id} sx={{ flexShrink: 0 }}>
              <TestimonialCard testimonial={testimonial} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Pagination Dots */}
      <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "#CB3CFF" : "#343B4F",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: index === currentIndex ? "#CB3CFF" : "#AEB9E1",
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TestimonialCarousel;
