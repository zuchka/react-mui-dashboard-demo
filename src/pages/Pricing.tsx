import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import { Check, Star } from "@mui/icons-material";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "contained" | "outlined";
  isPopular?: boolean;
  isEnterprise?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Hobby",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small projects getting started",
    features: [
      "Up to 3 buoy stations",
      "Basic weather data",
      "Standard charts and graphs",
      "Email notifications",
      "Community support",
      "7-day data history",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outlined",
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    description: "Ideal for teams and growing businesses",
    features: [
      "Up to 25 buoy stations",
      "Advanced weather analytics",
      "Custom dashboards",
      "Real-time alerts",
      "Priority support",
      "90-day data history",
      "API access",
      "Data export",
      "Team collaboration tools",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "contained",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Comprehensive solution for large organizations",
    features: [
      "Unlimited buoy stations",
      "Advanced predictive analytics",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Unlimited data history",
      "White-label options",
      "Advanced security features",
      "Custom reporting",
      "On-premise deployment",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outlined",
    isEnterprise: true,
  },
];

export default function Pricing() {
  return (
    <Box sx={{ py: 4, px: 3, maxWidth: 1400, mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            background: "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textFillColor: "transparent",
          }}
        >
          Choose Your Plan
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
        >
          Select the perfect plan for your maritime weather monitoring needs.
          All plans include our core features with varying levels of access and support.
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 1200, mx: "auto" }}>
        {pricingTiers.map((tier) => (
            <Grid item xs={12} sm={4} md={4} key={tier.name}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: tier.isPopular ? 2 : 1,
                borderColor: tier.isPopular ? "primary.main" : "divider",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: tier.isPopular
                    ? "0 12px 32px rgba(203, 60, 255, 0.15)"
                    : "0 8px 24px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              {tier.isPopular && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -1,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  <Chip
                    icon={<Star fontSize="small" />}
                    label="Most Popular"
                    color="primary"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      background: "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
                    }}
                  />
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                    {tier.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {tier.description}
                  </Typography>

                  <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: tier.isEnterprise ? "text.primary" : "primary.main",
                      }}
                    >
                      {tier.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tier.period}
                    </Typography>
                  </Stack>
                </Box>

                <Divider sx={{ my: 3 }} />

                <List disablePadding>
                  {tier.features.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Check
                          color="success"
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: "body2",
                          color: "text.primary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <Box sx={{ p: 3, pt: 0 }}>
                <Button
                  variant={tier.buttonVariant}
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    ...(tier.buttonVariant === "outlined" && {
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "rgba(203, 60, 255, 0.08)",
                        borderColor: "primary.light",
                      },
                    }),
                  }}
                  aria-label={`${tier.buttonText} for ${tier.name} plan`}
                >
                  {tier.buttonText}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Need a custom solution?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
          We offer flexible pricing and custom features for organizations with specific requirements.
          Contact our sales team to discuss your unique needs.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(203, 60, 255, 0.08)",
              borderColor: "primary.light",
            },
          }}
        >
          Contact Sales Team
        </Button>
      </Box>

      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          All plans include SSL encryption, 99.9% uptime guarantee, and GDPR compliance.
          <br />
          No setup fees. Cancel anytime.
        </Typography>
      </Box>
    </Container>
  );
}