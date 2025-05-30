import React from "react";
import { Box, Typography, Avatar, Stack } from "@mui/material";
import {
  Star,
  StarBorder,
  Person,
  Code,
  ThumbUp,
  CheckCircle,
  MoreHoriz,
} from "@mui/icons-material";

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  title: string;
  content: string;
  overallRating: number;
  verified: boolean;
  timeAgo: string;
  category: string;
  helpfulCount: number;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const theme = useTheme();

  const renderStars = (rating: number, filled = true) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        sx={{
          fontSize: 12,
          color: index < rating ? (filled ? "#FFD700" : "#AEB9E1") : "#343B4F",
        }}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Box
      sx={{
        width: 400,
        height: 346,
        backgroundColor: "#0B1739",
        borderRadius: "12px",
        border: "1px solid #343B4F",
        boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
        p: 3,
        position: "relative",
        fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
      }}
    >
      {/* Header Section */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Avatar
          src={testimonial.avatar}
          sx={{
            width: 48,
            height: 48,
            backgroundColor: "#CB3CFF",
            border: "1px solid #0B1739",
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          {testimonial.avatar ? undefined : getInitials(testimonial.name)}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "#FFF",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "16px",
            }}
          >
            {testimonial.name}
          </Typography>
          <Typography
            sx={{
              color: "#AEB9E1",
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "14px",
              mt: 0.5,
            }}
          >
            {testimonial.role} at {testimonial.company}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          {renderStars(testimonial.rating)}
        </Box>
      </Stack>

      {/* Content Section */}
      <Stack spacing={1.5} mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Person sx={{ fontSize: 16, color: "#000" }} />
          <Typography
            sx={{
              color: "#FFF",
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "14px",
            }}
          >
            {testimonial.title}
          </Typography>
        </Stack>

        <Typography
          sx={{
            color: "#AEB9E1",
            fontSize: 12,
            fontWeight: 400,
            lineHeight: "18px",
            height: 72,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {testimonial.content}
        </Typography>

        <Typography
          sx={{
            color: "#00C2FF",
            fontSize: 11,
            fontWeight: 400,
            lineHeight: "14px",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          Read more
        </Typography>
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          width: "100%",
          height: 1,
          backgroundColor: "#0B1739",
          my: 2,
        }}
      />

      {/* Rating Section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Star sx={{ fontSize: 12, color: "#AEB9E1" }} />
          <Typography
            sx={{
              color: "#AEB9E1",
              fontSize: 10,
              fontWeight: 400,
              lineHeight: "10px",
            }}
          >
            {testimonial.overallRating}/5
          </Typography>
          <StarBorder sx={{ fontSize: 12, color: "#AEB9E1" }} />
          <Typography
            sx={{
              color: "#AEB9E1",
              fontSize: 10,
              fontWeight: 400,
              lineHeight: "10px",
            }}
          >
            Verified
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            sx={{
              color: "#AEB9E1",
              fontSize: 10,
              fontWeight: 400,
              lineHeight: "10px",
            }}
          >
            {testimonial.timeAgo}
          </Typography>
          <MoreHoriz sx={{ fontSize: 16, color: "#D9E1FA" }} />
        </Stack>
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          width: "100%",
          height: 1,
          backgroundColor: "#0B1739",
          my: 2,
        }}
      />

      {/* Footer Section */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "rgba(87, 195, 255, 0.20)",
            border: "1px solid rgba(87, 195, 255, 0.20)",
            borderRadius: "2px",
            px: 1,
            py: 0.5,
          }}
        >
          <Code sx={{ fontSize: 10, color: "#00C2FF" }} />
          <Typography
            sx={{
              color: "#FFF",
              fontSize: 10,
              fontWeight: 400,
              lineHeight: "14px",
            }}
          >
            {testimonial.category}
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          <ThumbUp sx={{ fontSize: 12, color: "#AEB9E1" }} />
          <Typography
            sx={{
              color: "#AEB9E1",
              fontSize: 10,
              fontWeight: 400,
              lineHeight: "10px",
            }}
          >
            Helpful
          </Typography>
          <CheckCircle sx={{ fontSize: 12, color: "#AEB9E1" }} />
          <Typography
            sx={{
              color: "#AEB9E1",
              fontSize: 10,
              fontWeight: 400,
              lineHeight: "10px",
            }}
          >
            {testimonial.helpfulCount}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TestimonialCard;
