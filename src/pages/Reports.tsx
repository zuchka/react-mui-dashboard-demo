import {
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { TimeSeriesChart, BarChart } from "../components/Charts";
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

  // Sample data for time series charts
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

  const trafficData = [
    { date: "Week 1", value: 85400 },
    { date: "Week 2", value: 92100 },
    { date: "Week 3", value: 88900 },
    { date: "Week 4", value: 95200 },
    { date: "Week 5", value: 101800 },
    { date: "Week 6", value: 97500 },
    { date: "Week 7", value: 104300 },
  ];

  // Sample data for bar charts
  const topProductsData = [
    { name: "Premium Plan", value: 35200 },
    { name: "Standard Plan", value: 28900 },
    { name: "Basic Plan", value: 22400 },
    { name: "Enterprise", value: 18750 },
    { name: "Starter", value: 15300 },
  ];

  const channelPerformanceData = [
    { name: "Organic Search", value: 42 },
    { name: "Direct", value: 28 },
    { name: "Social Media", value: 18 },
    { name: "Email", value: 8 },
    { name: "Paid Ads", value: 4 },
  ];

  const regionSalesData = [
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
        Analytics & Reports
      </Typography>

      {/* Key Metrics Overview */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 5,
          flexWrap: "wrap",
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
          title="Total Revenue"
          value="$485.2K"
          trend={{ value: "+12.5%", positive: true }}
        />
        <StatsCard
          title="Active Users"
          value="24,680"
          trend={{ value: "+8.2%", positive: true }}
        />
        <StatsCard
          title="Conversion Rate"
          value="3.42%"
          trend={{ value: "-2.1%", positive: false }}
        />
        <StatsCard
          title="Avg. Session"
          value="4m 32s"
          trend={{ value: "+5.8%", positive: true }}
        />
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
          <Tab label="Revenue & Growth" />
          <Tab label="User Analytics" />
          <Tab label="Performance" />
        </Tabs>

        {/* Revenue & Growth Tab */}
        <TabPanel value={selectedTab} index={0}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                  Monthly Revenue Trend
                </Typography>
                <TimeSeriesChart
                  data={revenueData}
                  height={450}
                  color={theme.palette.primary.main}
                  yAxisLabel="Revenue ($)"
                />
              </ChartContainer>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                  Sales by Region
                </Typography>
                <BarChart
                  data={regionSalesData}
                  height={450}
                  yAxisLabel="Sales ($)"
                />
              </ChartContainer>
            </Box>
          </Box>
        </TabPanel>

        {/* User Analytics Tab */}
        <TabPanel value={selectedTab} index={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                  User Growth Over Time
                </Typography>
                <TimeSeriesChart
                  data={userGrowthData}
                  height={450}
                  color={theme.palette.success.main}
                  yAxisLabel="New Users"
                />
              </ChartContainer>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                  Device Usage
                </Typography>
                <BarChart
                  data={deviceUsageData}
                  height={450}
                  yAxisLabel="Usage (%)"
                />
              </ChartContainer>
            </Box>
          </Box>
        </TabPanel>

        {/* Performance Tab */}
        <TabPanel value={selectedTab} index={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                  Weekly Traffic Analysis
                </Typography>
                <TimeSeriesChart
                  data={trafficData}
                  height={450}
                  color={theme.palette.warning.main}
                  yAxisLabel="Page Views"
                />
              </ChartContainer>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
                  Channel Performance
                </Typography>
                <BarChart
                  data={channelPerformanceData}
                  height={450}
                  yAxisLabel="Conversion Rate (%)"
                />
              </ChartContainer>
            </Box>
          </Box>
        </TabPanel>
      </StyledPaper>
    </Box>
  );
}
