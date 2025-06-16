import React from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Container,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";

const PricingCard = styled(Paper)(({ theme }) => ({
  padding: "32px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  backgroundColor: theme.palette.background.paper,
  border: "0.6px solid #343B4F",
  boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
  borderRadius: 12,
  height: "100%",
  transition: "all 0.3s ease-in-out",
  position: "relative",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0px 12px 32px 0px rgba(16, 25, 52, 0.60)",
    borderColor: "rgba(203, 60, 255, 0.3)",
  },
}));

const PopularCard = styled(PricingCard)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.primary.main,
  boxShadow: "0px 8px 24px 0px rgba(203, 60, 255, 0.20)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0px 16px 40px 0px rgba(203, 60, 255, 0.30)",
    borderColor: theme.palette.primary.light,
  },
}));

const PriceDisplay = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  gap: "8px",
  marginBottom: "8px",
}));

const FeatureList = styled(List)(({ theme }) => ({
  padding: 0,
  "& .MuiListItem-root": {
    padding: "8px 0",
    alignItems: "flex-start",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "32px",
    marginTop: "2px",
  },
  "& .MuiListItemText-root": {
    margin: 0,
  },
}));

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "contained" | "outlined";
  popular?: boolean;
  recommendedFor: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "hobby",
    name: "Hobby",
    price: "$0",
    period: "forever",
    description:
      "Perfect for individuals and small projects getting started with buoy data monitoring.",
    recommendedFor: "Personal projects & learning",
    features: [
      "Access to 5 buoy stations",
      "Basic weather data",
      "7-day data history",
      "Standard charts and visualizations",
      "Community support",
      "Export data (CSV)",
      "Mobile responsive dashboard",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outlined",
  },
  {
    id: "team",
    name: "Team",
    price: "$29",
    period: "per month",
    description:
      "Ideal for teams and businesses that need comprehensive monitoring and collaboration features.",
    recommendedFor: "Small to medium teams",
    features: [
      "Access to all buoy stations",
      "Advanced weather analytics",
      "90-day data history",
      "Custom charts and reports",
      "Priority email support",
      "API access (1000 calls/day)",
      "Team collaboration tools",
      "Alerting and notifications",
      "Data export (CSV, JSON, XML)",
      "Custom dashboards",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "contained",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description:
      "For large organizations requiring enterprise-grade features, security, and dedicated support.",
    recommendedFor: "Large organizations & enterprises",
    features: [
      "Unlimited buoy stations",
      "Real-time data streaming",
      "Unlimited data history",
      "Advanced analytics & AI insights",
      "24/7 phone & chat support",
      "Unlimited API calls",
      "Advanced team management",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee (99.9% uptime)",
      "On-premise deployment option",
      "Custom branding",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "contained",
  },
];

export default function Pricing() {
  const handleSelectPlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Handle plan selection logic here
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            mb: 2,
            background:
              "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Choose Your Plan
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontSize: "1.1rem",
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Get started with buoy data monitoring and analytics. Choose the plan
          that best fits your needs.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            "@media (max-width: 991px)": {
              flexDirection: "column",
              alignItems: "stretch",
              gap: "0px",
            },
          }}
        >
          {pricingTiers.map((tier) => {
            const CardComponent = tier.popular ? PopularCard : PricingCard;

            return (
              <Box
                key={tier.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "normal",
                  width: "33%",
                  marginLeft: tier.id === "hobby" ? "0px" : "20px",
                  "@media (max-width: 991px)": {
                    width: "100%",
                    marginLeft: 0,
                  },
                }}
              >
                <CardComponent>
                  {tier.popular && (
                    <Chip
                      label="Most Popular"
                      icon={<StarIcon sx={{ fontSize: "14px !important" }} />}
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "primary.main",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "12px",
                        px: 1,
                      }}
                    />
                  )}

                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.75rem",
                        mb: 1,
                        color: tier.popular ? "primary.main" : "text.primary",
                      }}
                    >
                      {tier.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.9rem", mb: 2, lineHeight: 1.5 }}
                    >
                      {tier.description}
                    </Typography>

                    <Box
                      sx={{
                        backgroundColor: "rgba(203, 60, 255, 0.05)",
                        borderRadius: 1,
                        p: 1.5,
                        border: "1px solid rgba(203, 60, 255, 0.1)",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Recommended for
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          fontSize: "0.85rem",
                          mt: 0.5,
                        }}
                      >
                        {tier.recommendedFor}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <PriceDisplay>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          fontSize: "2.5rem",
                          color: "text.primary",
                        }}
                      >
                        {tier.price}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        /{tier.period}
                      </Typography>
                    </PriceDisplay>
                  </Box>

                  <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: "text.primary",
                      }}
                    >
                      Everything included:
                    </Typography>

                    <FeatureList>
                      {tier.features.map((feature, index) => (
                        <ListItem key={index} disableGutters>
                          <ListItemIcon>
                            <CheckIcon
                              sx={{
                                color: "success.main",
                                fontSize: "20px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: "body2",
                              sx: {
                                color: "text.secondary",
                                fontSize: "0.9rem",
                                lineHeight: 1.4,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </FeatureList>
                  </Box>

                  <Button
                    variant={tier.buttonVariant}
                    fullWidth
                    size="large"
                    onClick={() => handleSelectPlan(tier.id)}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: "1rem",
                      borderRadius: 2,
                      ...(tier.buttonVariant === "outlined" && {
                        borderColor: "primary.main",
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "rgba(203, 60, 255, 0.05)",
                          borderColor: "primary.light",
                        },
                      }),
                      ...(tier.buttonVariant === "contained" && {
                        background:
                          "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
                        "&:hover": {
                          background:
                            "linear-gradient(128deg, #D76AFF 19.86%, #9B4FFF 68.34%)",
                        },
                      }),
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardComponent>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          mt: 8,
          p: 4,
          backgroundColor: "rgba(203, 60, 255, 0.05)",
          borderRadius: 3,
          border: "1px solid rgba(203, 60, 255, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
        >
          Need a custom solution?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: "600px", mx: "auto", lineHeight: 1.6 }}
        >
          For unique requirements, custom integrations, or volume discounts, our
          team is here to help you build the perfect solution.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderColor: "primary.main",
            color: "primary.main",
            fontWeight: 600,
            px: 4,
            "&:hover": {
              backgroundColor: "rgba(203, 60, 255, 0.05)",
              borderColor: "primary.light",
            },
          }}
        >
          Contact Sales Team
        </Button>
      </Box>
    </Container>
  );
}
