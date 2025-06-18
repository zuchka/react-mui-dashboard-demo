import { Typography, Box, Paper, Tabs, Tab, useTheme } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TimeSeriesChart,
  BarChart,
  DonutChart,
  PieChart,
  GaugeChart,
  AreaChart,
  ScatterChart,
  RadarChart,
  HeatmapChart,
} from "../components/Charts";
import { StatsCard } from "../components/StatsCard/StatsCard";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
  borderRadius: 12,
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  padding: "16px",
  backgroundColor: theme.palette.background.default,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
}));

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

export default function Reports() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  // Sample data for different chart types
  const revenueData = [
    { date: "Jan", value: 12500 },
    { date: "Feb", value: 15200 },
    { date: "Mar", value: 18900 },
    { date: "Apr", value: 22100 },
    { date: "May", value: 19800 },
    { date: "Jun", value: 25400 },
    { date: "Jul", value: 28900 },
    { date: "Aug", value: 31200 },
    { date: "Sep", value: 29800 },
    { date: "Oct", value: 34500 },
    { date: "Nov", value: 38200 },
    { date: "Dec", value: 41800 },
  ];

  const userGrowthData = [
    { date: "Jan", value: 1250 },
    { date: "Feb", value: 1420 },
    { date: "Mar", value: 1680 },
    { date: "Apr", value: 1950 },
    { date: "May", value: 2180 },
    { date: "Jun", value: 2450 },
    { date: "Jul", value: 2720 },
    { date: "Aug", value: 3100 },
    { date: "Sep", value: 3350 },
    { date: "Oct", value: 3680 },
    { date: "Nov", value: 4020 },
    { date: "Dec", value: 4380 },
  ];

  const salesByRegionData = [
    { name: "North America", value: 125400 },
    { name: "Europe", value: 98200 },
    { name: "Asia Pacific", value: 87600 },
    { name: "Latin America", value: 45300 },
    { name: "Middle East", value: 32100 },
    { name: "Africa", value: 18900 },
  ];

  const deviceUsageData = [
    { name: "Desktop", value: 58 },
    { name: "Mobile", value: 35 },
    { name: "Tablet", value: 7 },
  ];

  const trafficSourcesData = [
    { name: "Organic Search", value: 42 },
    { name: "Direct", value: 28 },
    { name: "Social Media", value: 18 },
    { name: "Email", value: 8 },
    { name: "Paid Ads", value: 4 },
  ];

  const productCategoriesData = [
    { name: "Electronics", value: 45200 },
    { name: "Clothing", value: 32800 },
    { name: "Home & Garden", value: 28500 },
    { name: "Sports", value: 19300 },
    { name: "Books", value: 15600 },
    { name: "Health", value: 12400 },
  ];

  // Multi-series area chart data
  const multiSeriesAreaData = [
    {
      name: "Current Clients",
      data: [
        { date: "Jan", value: 240.8 },
        { date: "Feb", value: 245.2 },
        { date: "Mar", value: 248.9 },
        { date: "Apr", value: 252.1 },
        { date: "May", value: 255.8 },
        { date: "Jun", value: 259.4 },
      ],
      color: theme.palette.primary.main,
    },
    {
      name: "Subscribers",
      data: [
        { date: "Jan", value: 180.5 },
        { date: "Feb", value: 185.8 },
        { date: "Mar", value: 190.2 },
        { date: "Apr", value: 195.1 },
        { date: "May", value: 198.6 },
        { date: "Jun", value: 202.3 },
      ],
      color: theme.palette.secondary.main,
    },
    {
      name: "New customers",
      data: [
        { date: "Jan", value: 120.3 },
        { date: "Feb", value: 125.7 },
        { date: "Mar", value: 128.9 },
        { date: "Apr", value: 132.4 },
        { date: "May", value: 135.1 },
        { date: "Jun", value: 138.8 },
      ],
      color: theme.palette.success.main,
    },
  ];

  // Scatter chart data
  const scatterData = [
    {
      name: "Product A",
      data: [
        { x: 10, y: 8.2, size: 20 },
        { x: 20, y: 16.5, size: 15 },
        { x: 30, y: 32.1, size: 25 },
        { x: 40, y: 45.8, size: 18 },
        { x: 50, y: 68.2, size: 22 },
      ],
      color: theme.palette.primary.main,
    },
    {
      name: "Product B",
      data: [
        { x: 15, y: 12.3, size: 18 },
        { x: 25, y: 22.1, size: 20 },
        { x: 35, y: 38.7, size: 16 },
        { x: 45, y: 52.3, size: 24 },
        { x: 55, y: 72.1, size: 19 },
      ],
      color: theme.palette.secondary.main,
    },
  ];

  // Radar chart data
  const radarIndicators = [
    { name: "Sales", max: 100 },
    { name: "Administration", max: 100 },
    { name: "Information Technology", max: 100 },
    { name: "Customer Support", max: 100 },
    { name: "Development", max: 100 },
    { name: "Marketing", max: 100 },
  ];

  const radarData = [
    {
      name: "Q1 Performance",
      value: [80, 90, 95, 82, 88, 75],
      color: theme.palette.primary.main,
    },
    {
      name: "Q2 Performance",
      value: [85, 88, 92, 89, 91, 82],
      color: theme.palette.secondary.main,
    },
  ];

  // Heatmap data
  const heatmapData = [
    { x: 0, y: 0, value: 85 },
    { x: 1, y: 0, value: 92 },
    { x: 2, y: 0, value: 78 },
    { x: 3, y: 0, value: 95 },
    { x: 4, y: 0, value: 88 },
    { x: 0, y: 1, value: 91 },
    { x: 1, y: 1, value: 87 },
    { x: 2, y: 1, value: 93 },
    { x: 3, y: 1, value: 89 },
    { x: 4, y: 1, value: 84 },
    { x: 0, y: 2, value: 76 },
    { x: 1, y: 2, value: 82 },
    { x: 2, y: 2, value: 88 },
    { x: 3, y: 2, value: 91 },
    { x: 4, y: 2, value: 86 },
    { x: 0, y: 3, value: 94 },
    { x: 1, y: 3, value: 89 },
    { x: 2, y: 3, value: 85 },
    { x: 3, y: 3, value: 92 },
    { x: 4, y: 3, value: 90 },
  ];

  const heatmapXAxis = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const heatmapYAxis = ["Morning", "Afternoon", "Evening", "Night"];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{ p: 3, width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "text.primary",
          fontWeight: 600,
        }}
      >
        Analytics & Reports Dashboard
      </Typography>

      {/* Key Metrics Overview */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2.5,
          flexDirection: "column",
          "& > *": {
            flex: "1 1 0",
            minWidth: "200px",
          },
          "@media (max-width: 900px)": {
            "& > *": {
              flex: "1 1 calc(50% - 12px)",
            },
          },
          "@media (max-width: 600px)": {
            "& > *": {
              flex: "1 1 100%",
            },
          },
        }}
      >
        <StatsCard
          title="Save Products"
          value="50.8K"
          trend={{ value: "+24.4%", positive: true }}
        />
        <StatsCard
          title="Stock Products"
          value="23.6K"
          trend={{ value: "-12.6%", positive: false }}
        />
        <StatsCard
          title="Sale Products"
          value="756"
          trend={{ value: "+3.1%", positive: true }}
        />
        <StatsCard
          title="Average Revenue"
          value="2.3K"
          trend={{ value: "+11.3%", positive: true }}
        />
      </Box>

      {/* Main Dashboard Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 4,
        }}
      >
        {/* Revenue Chart */}
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <StyledPaper>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Revenue by customer type
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "text.primary", fontWeight: 700 }}
                >
                  $240.8K
                  <Typography
                    component="span"
                    variant="body2"
                    color="success.main"
                    sx={{ ml: 1 }}
                  >
                    +14.6%
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Current clients
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Subscribers
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: theme.palette.success.main,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    New customers
                  </Typography>
                </Box>
              </Box>
            </Box>
            <ChartContainer>
              <AreaChart
                series={multiSeriesAreaData}
                height={300}
                yAxisLabel="Revenue (K)"
              />
            </ChartContainer>
          </StyledPaper>
        </Box>

        {/* Website Visitors */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StyledPaper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              Website Visitors
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Export
              </Box>
            </Typography>

            <Typography
              variant="h3"
              sx={{ mb: 1, color: "text.primary", fontWeight: 700 }}
            >
              150k
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Organic
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ ml: "auto" }}
                >
                  30%
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Social
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ ml: "auto" }}
                >
                  50%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: theme.palette.success.main,
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Direct
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ ml: "auto" }}
                >
                  20%
                </Typography>
              </Box>
            </Box>
          </StyledPaper>
        </Box>
      </Box>

      {/* Report Tabs */}
      <StyledPaper>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="report tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
            "& .MuiTab-root": {
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
            },
            "& .Mui-selected": {
              color: "primary.main",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
            },
          }}
        >
          <Tab label="Sales & Analytics" />
          <Tab label="Performance Metrics" />
          <Tab label="Advanced Charts" />
          <Tab label="Data Visualization" />
        </Tabs>

        {/* Sales & Analytics Tab */}
        <TabPanel value={selectedTab} index={0}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              mb: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Monthly Revenue Growth
              </Typography>
              <TimeSeriesChart
                data={revenueData}
                height={350}
                color={theme.palette.primary.main}
                yAxisLabel="Revenue ($)"
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Sales by Region
              </Typography>
              <BarChart
                data={salesByRegionData}
                height={350}
                yAxisLabel="Sales ($)"
              />
            </ChartContainer>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Device Usage Distribution
              </Typography>
              <DonutChart
                data={deviceUsageData}
                height={350}
                centerText={{
                  title: "100%",
                  subtitle: "Total Usage",
                }}
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Traffic Sources
              </Typography>
              <PieChart
                data={trafficSourcesData}
                height={350}
                roseType={true}
              />
            </ChartContainer>
          </Box>
        </TabPanel>

        {/* Performance Metrics Tab */}
        <TabPanel value={selectedTab} index={1}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 4,
              mb: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Conversion Rate
              </Typography>
              <GaugeChart
                value={75.5}
                height={300}
                min={0}
                max={100}
                unit="%"
                color={theme.palette.success.main}
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Customer Satisfaction
              </Typography>
              <GaugeChart
                value={8.7}
                height={300}
                min={0}
                max={10}
                unit="/10"
                color={theme.palette.primary.main}
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                System Performance
              </Typography>
              <GaugeChart
                value={92.3}
                height={300}
                min={0}
                max={100}
                unit="%"
                color={theme.palette.warning.main}
              />
            </ChartContainer>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                User Growth Trend
              </Typography>
              <AreaChart
                series={[
                  {
                    name: "New Users",
                    data: userGrowthData,
                    color: theme.palette.success.main,
                  },
                ]}
                height={350}
                yAxisLabel="Users"
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Product Categories Performance
              </Typography>
              <BarChart
                data={productCategoriesData}
                height={350}
                horizontal={true}
                yAxisLabel="Revenue ($)"
              />
            </ChartContainer>
          </Box>
        </TabPanel>

        {/* Advanced Charts Tab */}
        <TabPanel value={selectedTab} index={2}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              mb: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Product Performance Correlation
              </Typography>
              <ScatterChart
                series={scatterData}
                height={350}
                xAxisLabel="Marketing Spend ($k)"
                yAxisLabel="Revenue ($k)"
                showBrush={true}
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Team Performance Radar
              </Typography>
              <RadarChart
                indicators={radarIndicators}
                data={radarData}
                height={350}
                shape="polygon"
              />
            </ChartContainer>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Activity Heatmap
              </Typography>
              <HeatmapChart
                data={heatmapData}
                xAxisData={heatmapXAxis}
                yAxisData={heatmapYAxis}
                height={350}
                colorRange={[
                  theme.palette.primary.light,
                  theme.palette.primary.dark,
                ]}
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Multi-Category Analysis
              </Typography>
              <RadarChart
                indicators={[
                  { name: "Quality", max: 100 },
                  { name: "Price", max: 100 },
                  { name: "Service", max: 100 },
                  { name: "Delivery", max: 100 },
                  { name: "Support", max: 100 },
                ]}
                data={[
                  {
                    name: "Our Company",
                    value: [85, 78, 92, 88, 95],
                    color: theme.palette.primary.main,
                  },
                  {
                    name: "Competitor",
                    value: [72, 85, 78, 82, 80],
                    color: theme.palette.error.main,
                  },
                ]}
                height={350}
                shape="circle"
              />
            </ChartContainer>
          </Box>
        </TabPanel>

        {/* Data Visualization Tab */}
        <TabPanel value={selectedTab} index={3}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 4,
              mb: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Monthly Target
              </Typography>
              <GaugeChart
                value={87.2}
                height={250}
                min={0}
                max={100}
                unit="%"
                color={theme.palette.success.main}
                sectors={[
                  { min: 0, max: 60, color: theme.palette.error.main },
                  { min: 60, max: 80, color: theme.palette.warning.main },
                  { min: 80, max: 100, color: theme.palette.success.main },
                ]}
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Market Share
              </Typography>
              <DonutChart
                data={[
                  { name: "Our Product", value: 45.2 },
                  { name: "Competitor A", value: 28.8 },
                  { name: "Competitor B", value: 16.3 },
                  { name: "Others", value: 9.7 },
                ]}
                height={250}
                centerText={{
                  title: "45.2%",
                  subtitle: "Market Lead",
                }}
              />
            </ChartContainer>
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Customer Rating
              </Typography>
              <GaugeChart
                value={4.7}
                height={250}
                min={0}
                max={5}
                unit="★"
                color={theme.palette.warning.main}
              />
            </ChartContainer>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr" },
              gap: 4,
            }}
          >
            <ChartContainer>
              <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                Quarterly Performance Comparison
              </Typography>
              <AreaChart
                series={[
                  {
                    name: "Q1 2024",
                    data: [
                      { date: "Jan", value: 65 },
                      { date: "Feb", value: 68 },
                      { date: "Mar", value: 72 },
                      { date: "Apr", value: 75 },
                      { date: "May", value: 78 },
                      { date: "Jun", value: 82 },
                    ],
                    color: theme.palette.primary.main,
                  },
                  {
                    name: "Q2 2024",
                    data: [
                      { date: "Jan", value: 58 },
                      { date: "Feb", value: 62 },
                      { date: "Mar", value: 66 },
                      { date: "Apr", value: 70 },
                      { date: "May", value: 74 },
                      { date: "Jun", value: 78 },
                    ],
                    color: theme.palette.secondary.main,
                  },
                  {
                    name: "Q3 2024",
                    data: [
                      { date: "Jan", value: 62 },
                      { date: "Feb", value: 65 },
                      { date: "Mar", value: 69 },
                      { date: "Apr", value: 73 },
                      { date: "May", value: 77 },
                      { date: "Jun", value: 81 },
                    ],
                    color: theme.palette.success.main,
                  },
                ]}
                height={400}
                yAxisLabel="Performance Score"
              />
            </ChartContainer>
          </Box>
        </TabPanel>
      </StyledPaper>

      {/* Bottom Section - Product Overview and Team Progress */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 3,
          mt: 4,
        }}
      >
        {/* Products */}
        <StyledPaper>
          <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
            Products
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: theme.palette.background.default,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              📱
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.primary">
                iPhone 14 Pro Max
              </Typography>
              <Typography variant="caption" color="text.secondary">
                524 in stock
              </Typography>
            </Box>
            <Typography variant="body2" color="text.primary">
              $1,099.00
            </Typography>
          </Box>
        </StyledPaper>

        {/* Team Progress */}
        <StyledPaper>
          <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
            Team Progress
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "0.75rem",
                }}
              >
                JC
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.primary">
                  John Carter
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  contact@sophiemoore.com
                </Typography>
              </Box>
              <Typography variant="body2" color="text.primary">
                60%
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "0.75rem",
                }}
              >
                SM
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.primary">
                  Sophie Moore
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  contact@sophiemoore.com
                </Typography>
              </Box>
              <Typography variant="body2" color="text.primary">
                33%
              </Typography>
            </Box>
          </Box>
        </StyledPaper>

        {/* Website Visitors Summary */}
        <StyledPaper>
          <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
            Website Visitors
          </Typography>
          <Typography
            variant="h2"
            sx={{ mb: 1, color: "text.primary", fontWeight: 700 }}
          >
            890%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Growth this month
          </Typography>
        </StyledPaper>
      </Box>
    </Box>
  );
}
