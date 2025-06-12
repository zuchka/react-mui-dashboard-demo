import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
  TextField,
  InputAdornment,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Fade,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Analytics as AnalyticsIcon,
  Api as ApiIcon,
  Notifications as NotificationsIcon,
  Map as MapIcon,
  Timeline as TimelineIcon,
  Dashboard as DashboardIcon,
  Storage as StorageIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { StatsCard } from "../components/StatsCard/StatsCard";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  status: "available" | "beta" | "coming-soon";
  isPopular?: boolean;
  benefits: string[];
  imageUrl?: string;
}

interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}

const featureCategories: FeatureCategory[] = [
  {
    id: "all",
    name: "All Features",
    description: "Complete platform capabilities",
    count: 12,
  },
  {
    id: "monitoring",
    name: "Real-time Monitoring",
    description: "Live data tracking and alerts",
    count: 4,
  },
  {
    id: "analytics",
    name: "Data Analytics",
    description: "Advanced insights and reporting",
    count: 3,
  },
  {
    id: "integration",
    name: "Integrations",
    description: "Third-party connections",
    count: 3,
  },
  {
    id: "automation",
    name: "Automation",
    description: "Automated workflows and alerts",
    count: 2,
  },
];

const platformFeatures: Feature[] = [
  {
    id: "real-time-monitoring",
    title: "Real-time Buoy Monitoring",
    description:
      "Monitor ocean conditions with live data from deployed buoys including wave height, wind speed, and water temperature.",
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    category: "monitoring",
    status: "available",
    isPopular: true,
    benefits: [
      "Live data updates",
      "Multi-parameter tracking",
      "Historical comparisons",
    ],
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/dashboard-preview?format=webp&width=400",
  },
  {
    id: "advanced-analytics",
    title: "Advanced Analytics Engine",
    description:
      "Powerful analytics tools to process and visualize marine data with machine learning insights and predictive modeling.",
    icon: <AnalyticsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    category: "analytics",
    status: "available",
    isPopular: true,
    benefits: [
      "ML-powered insights",
      "Custom dashboards",
      "Export capabilities",
    ],
  },
  {
    id: "interactive-maps",
    title: "Interactive Mapping",
    description:
      "Visualize buoy locations and data on interactive maps with overlay capabilities and route planning features.",
    icon: <MapIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    category: "monitoring",
    status: "available",
    benefits: ["Real-time positioning", "Data overlays", "Route optimization"],
  },
  {
    id: "alert-system",
    title: "Smart Alert System",
    description:
      "Customizable alerts for critical conditions with multiple notification channels and escalation procedures.",
    icon: <NotificationsIcon sx={{ fontSize: 40, color: "warning.main" }} />,
    category: "automation",
    status: "available",
    benefits: ["Multi-channel alerts", "Custom thresholds", "Escalation rules"],
  },
  {
    id: "api-access",
    title: "RESTful API Access",
    description:
      "Complete API access for data integration with third-party systems and custom applications.",
    icon: <ApiIcon sx={{ fontSize: 40, color: "secondary.main" }} />,
    category: "integration",
    status: "available",
    benefits: ["Full CRUD operations", "Webhook support", "Rate limiting"],
  },
  {
    id: "cloud-storage",
    title: "Cloud Data Storage",
    description:
      "Secure, scalable cloud storage for historical data with automated backups and disaster recovery.",
    icon: <StorageIcon sx={{ fontSize: 40, color: "info.main" }} />,
    category: "integration",
    status: "available",
    benefits: ["Unlimited storage", "Auto-backup", "99.9% uptime"],
  },
  {
    id: "predictive-analysis",
    title: "Predictive Weather Modeling",
    description:
      "AI-powered weather prediction using historical buoy data and meteorological models.",
    icon: <CloudIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    category: "analytics",
    status: "beta",
    benefits: ["7-day forecasts", "Storm tracking", "Accuracy metrics"],
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description:
      "Optimized data processing and visualization for fast load times and smooth user experience.",
    icon: <SpeedIcon sx={{ fontSize: 40, color: "success.main" }} />,
    category: "monitoring",
    status: "available",
    benefits: ["Sub-second queries", "Cached responses", "Progressive loading"],
  },
  {
    id: "security-features",
    title: "Enterprise Security",
    description:
      "Bank-level security with encryption, access controls, and compliance with maritime industry standards.",
    icon: <SecurityIcon sx={{ fontSize: 40, color: "error.main" }} />,
    category: "integration",
    status: "available",
    benefits: ["End-to-end encryption", "Role-based access", "Audit logs"],
  },
  {
    id: "custom-dashboards",
    title: "Custom Dashboard Builder",
    description:
      "Create personalized dashboards with drag-and-drop widgets tailored to your specific monitoring needs.",
    icon: <DashboardIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    category: "analytics",
    status: "beta",
    benefits: ["Drag & drop", "Widget library", "Share dashboards"],
  },
  {
    id: "time-series",
    title: "Time Series Analysis",
    description:
      "Advanced time series analysis tools for trend identification and seasonal pattern recognition.",
    icon: <TimelineIcon sx={{ fontSize: 40, color: "secondary.main" }} />,
    category: "monitoring",
    status: "available",
    benefits: ["Trend analysis", "Pattern recognition", "Anomaly detection"],
  },
  {
    id: "automated-reports",
    title: "Automated Reporting",
    description:
      "Generate and schedule automated reports with customizable templates and delivery options.",
    icon: <NotificationsIcon sx={{ fontSize: 40, color: "info.main" }} />,
    category: "automation",
    status: "coming-soon",
    benefits: ["Scheduled delivery", "Custom templates", "Multiple formats"],
  },
];

export default function Features() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFeatures = platformFeatures.filter((feature) => {
    const matchesSearch =
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || feature.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "success";
      case "beta":
        return "warning";
      case "coming-soon":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "beta":
        return "Beta";
      case "coming-soon":
        return "Coming Soon";
      default:
        return status;
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, width: "100%", minHeight: "100vh" }}
    >
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 600,
              lineHeight: 1.2,
              mb: 2,
              color: "text.primary",
              background:
                "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Platform Features
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              fontWeight: 400,
            }}
          >
            Discover powerful tools and capabilities designed for marine
            monitoring and ocean data analysis
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  fontSize: "16px",
                  "& fieldset": {
                    borderColor: "#343B4F",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(203, 60, 255, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Platform Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 3,
            mb: 6,
          }}
        >
          <StatsCard
            title="Active Features"
            value="12"
            icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/42aa344d48d2bef4d72892ceaca37092f37bb2a2"
            trend={{ value: "8.5%", positive: true }}
          />
          <StatsCard
            title="API Endpoints"
            value="48"
            icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/97b7656e71430abbc1ef12e9d65b1995bdfb310d"
            trend={{ value: "12.3%", positive: true }}
          />
          <StatsCard
            title="Integration Points"
            value="24"
            icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/471f192ad8be415d32dbbc4d11c0a02de1c43dcd"
            trend={{ value: "5.7%", positive: true }}
          />
          <StatsCard
            title="Uptime"
            value="99.9%"
            trend={{ value: "0.1%", positive: true }}
          />
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Feature Categories
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {featureCategories.map((category) => (
              <Chip
                key={category.id}
                label={`${category.name} (${category.count})`}
                variant={
                  selectedCategory === category.id ? "filled" : "outlined"
                }
                color={selectedCategory === category.id ? "primary" : "default"}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  px: 2,
                  py: 0.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: 2,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
            Available Features ({filteredFeatures.length})
          </Typography>
          <Grid container spacing={3}>
            {filteredFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={feature.id}>
                <Fade in timeout={300 + index * 100}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 40px rgba(203, 60, 255, 0.15)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    {feature.isPopular && (
                      <Chip
                        icon={<StarIcon sx={{ fontSize: 16 }} />}
                        label="Popular"
                        color="primary"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          zIndex: 1,
                          fontWeight: 600,
                        }}
                      />
                    )}

                    {feature.imageUrl && (
                      <CardMedia
                        component="img"
                        height="120"
                        image={feature.imageUrl}
                        alt={feature.title}
                        sx={{
                          backgroundColor: "background.default",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        {feature.icon}
                        <Box sx={{ ml: 2, flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                              mb: 0.5,
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Chip
                            label={getStatusLabel(feature.status)}
                            color={getStatusColor(feature.status) as any}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "11px", height: "22px" }}
                          />
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          mb: 3,
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {feature.description}
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "text.primary", mb: 1, fontWeight: 600 }}
                        >
                          Key Benefits:
                        </Typography>
                        {feature.benefits.slice(0, 3).map((benefit, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 0.5,
                            }}
                          >
                            <CheckCircleIcon
                              sx={{
                                fontSize: 16,
                                color: "success.main",
                                mr: 1,
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              {benefit}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      <Button
                        variant="outlined"
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        disabled={feature.status === "coming-soon"}
                        sx={{
                          mt: "auto",
                          borderColor: "primary.main",
                          color: "primary.main",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                            borderColor: "primary.main",
                          },
                          "&:disabled": {
                            borderColor: "action.disabled",
                            color: "action.disabled",
                          },
                        }}
                      >
                        {feature.status === "coming-soon"
                          ? "Coming Soon"
                          : "Learn More"}
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action Section */}
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(203, 60, 255, 0.1) 0%, rgba(127, 37, 251, 0.1) 100%)",
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: 2,
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Explore our comprehensive platform features and start monitoring
            ocean conditions with advanced analytics and real-time data
            insights.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "16px",
                fontWeight: 600,
                background:
                  "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
                "&:hover": {
                  background:
                    "linear-gradient(128deg, #D76AFF 19.86%, #9B4FFF 68.34%)",
                },
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "16px",
                fontWeight: 600,
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "rgba(203, 60, 255, 0.1)",
                  borderColor: "primary.main",
                },
              }}
            >
              View Documentation
            </Button>
          </Box>
        </Paper>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: 2,
              }}
            >
              No features found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 3,
              }}
            >
              Try adjusting your search criteria or explore all available
              features
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
