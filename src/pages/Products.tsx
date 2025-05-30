import { Typography, Box } from "@mui/material";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { TestimonialData } from "../components/TestimonialCard";

const testimonialData: TestimonialData[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    rating: 4,
    title: "Outstanding mobile app development",
    content:
      "The team delivered an exceptional mobile app that exceeded our expectations. Their attention to detail and user experience design was remarkable. The app launched successfully and received great feedback from our users...",
    overallRating: 4.8,
    verified: true,
    timeAgo: "2 weeks ago",
    category: "Development",
    helpfulCount: 12,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Senior Developer",
    company: "InnovateTech",
    rating: 5,
    title: "Exceptional web platform design",
    content:
      "Working with this team was a game-changer for our business. They created a stunning web platform that not only looks incredible but performs flawlessly. The user interface is intuitive and our conversion rates have increased by 40%...",
    overallRating: 5,
    verified: true,
    timeAgo: "1 week ago",
    category: "Development",
    helpfulCount: 12,
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "CTO",
    company: "StartupLab",
    rating: 5,
    title: "Revolutionary AI integration solution",
    content:
      "The AI integration they provided transformed our entire workflow. The machine learning algorithms are incredibly accurate and the implementation was seamless. Our productivity has increased by 60% since deployment...",
    overallRating: 4.9,
    verified: true,
    timeAgo: "3 days ago",
    category: "AI & Machine Learning",
    helpfulCount: 18,
  },
  {
    id: "4",
    name: "David Park",
    role: "Operations Director",
    company: "GlobalCorp",
    rating: 4,
    title: "Robust cloud infrastructure setup",
    content:
      "Their cloud infrastructure solution exceeded all our requirements. The scalability and security features are top-notch. We've experienced zero downtime since the migration and our costs have decreased by 30%...",
    overallRating: 4.7,
    verified: true,
    timeAgo: "5 days ago",
    category: "Cloud Infrastructure",
    helpfulCount: 15,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Marketing Manager",
    company: "BrandForward",
    rating: 5,
    title: "Amazing e-commerce platform",
    content:
      "The e-commerce platform they built for us is simply outstanding. The user experience is smooth, the checkout process is intuitive, and our online sales have tripled since launch. Customer satisfaction scores are at an all-time high...",
    overallRating: 4.9,
    verified: true,
    timeAgo: "1 week ago",
    category: "E-commerce",
    helpfulCount: 22,
  },
  {
    id: "6",
    name: "Michael Torres",
    role: "IT Manager",
    company: "HealthTech Solutions",
    rating: 4,
    title: "Secure healthcare data platform",
    content:
      "Security and compliance were our top priorities, and they delivered beyond expectations. The healthcare data platform is HIPAA compliant, highly secure, and incredibly user-friendly for our medical staff...",
    overallRating: 4.8,
    verified: true,
    timeAgo: "4 days ago",
    category: "Healthcare IT",
    helpfulCount: 14,
  },
];

export default function Products() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Products
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ color: "#AEB9E1", mb: 2 }}>
          Discover our comprehensive suite of technology solutions designed to
          accelerate your business growth. From mobile applications to
          enterprise platforms, we deliver cutting-edge products that drive
          results.
        </Typography>
      </Box>

      <TestimonialCarousel
        testimonials={testimonialData}
        title="Customer Success Stories"
        subtitle="See how our products have transformed businesses across industries"
      />
    </Box>
  );
}
