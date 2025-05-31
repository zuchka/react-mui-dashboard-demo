import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Container,
} from "@mui/material";
import {
  Search as SearchIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import TemplateCard from "../components/TemplateCard/TemplateCard";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";

// Types
interface Category {
  id: string;
  name: string;
  count?: number;
}

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  author: {
    name: string;
    avatar?: string;
  };
  downloads: number;
  category: string;
  isPopular?: boolean;
  onDeploy?: (id: string) => void;
}

// Mock data for templates
const mockTemplates: TemplateCardProps[] = [
  {
    id: "1",
    title: "Grafana Stack",
    description:
      "One-click observability with Loki, Prometheus, Tempo, and Grafana",
    icon: "📊",
    author: { name: "Mykal", avatar: "" },
    downloads: 56,
    category: "monitoring",
    isPopular: true,
  },
  {
    id: "2",
    title: "Supabase (Studio, DB, Auth)",
    description:
      "Supabase without Functions, Logflare and Storage (Read Overview)",
    icon: "⚡",
    author: { name: "Six", avatar: "" },
    downloads: 245,
    category: "database",
    isPopular: true,
  },
  {
    id: "3",
    title: "Metabase",
    description:
      "Fast analytics and integrated tooling for companies exploring their data",
    icon: "📈",
    author: { name: "Brody", avatar: "" },
    downloads: 1500,
    category: "analytics",
    isPopular: true,
  },
  {
    id: "4",
    title: "Directus",
    description:
      "Turn any SQL database into an API. Optional S3 and WebSockets Included!",
    icon: "🗄️",
    author: { name: "Carlos Medim", avatar: "" },
    downloads: 2700,
    category: "cms",
    isPopular: true,
  },
  {
    id: "5",
    title: "WordPress",
    description: "A content management system (CMS) written in PHP",
    icon: "📝",
    author: { name: "Jack", avatar: "" },
    downloads: 4700,
    category: "cms",
  },
  {
    id: "6",
    title: "Blinko Official",
    description:
      "An open-source, self-hosted personal AI note tool prioritizing privacy",
    icon: "📋",
    author: { name: "Blinko", avatar: "" },
    downloads: 233,
    category: "productivity",
  },
  {
    id: "7",
    title: "Umami",
    description:
      "An open source, privacy-focused alternative to Google Analytics",
    icon: "📊",
    author: { name: "Brody", avatar: "" },
    downloads: 3000,
    category: "analytics",
  },
  {
    id: "8",
    title: "Valkey",
    description: "An open source, Redis compatible, in-memory data store",
    icon: "💾",
    author: { name: "Brody", avatar: "" },
    downloads: 28,
    category: "database",
  },
  {
    id: "9",
    title: "PostgreSQL",
    description: "A powerful, open source object-relational database system",
    icon: "🐘",
    author: { name: "Postgres Team", avatar: "" },
    downloads: 8900,
    category: "database",
  },
  {
    id: "10",
    title: "MySQL",
    description: "The world's most popular open source database",
    icon: "🐬",
    author: { name: "MySQL Team", avatar: "" },
    downloads: 7200,
    category: "database",
  },
  {
    id: "11",
    title: "N8N (w/ workers)",
    description:
      "Free and source-available fair-code licensed workflow automation tool",
    icon: "🔄",
    author: { name: "n8n Team", avatar: "" },
    downloads: 1800,
    category: "automation",
  },
];

const categories: Category[] = [
  { id: "all", name: "All", count: mockTemplates.length },
  {
    id: "database",
    name: "Database",
    count: mockTemplates.filter((t) => t.category === "database").length,
  },
  {
    id: "cms",
    name: "CMS",
    count: mockTemplates.filter((t) => t.category === "cms").length,
  },
  {
    id: "analytics",
    name: "Analytics",
    count: mockTemplates.filter((t) => t.category === "analytics").length,
  },
  {
    id: "monitoring",
    name: "Monitoring",
    count: mockTemplates.filter((t) => t.category === "monitoring").length,
  },
  {
    id: "productivity",
    name: "Productivity",
    count: mockTemplates.filter((t) => t.category === "productivity").length,
  },
  {
    id: "automation",
    name: "Automation",
    count: mockTemplates.filter((t) => t.category === "automation").length,
  },
];

const sortOptions = [
  { value: "popularity", label: "Sort by Popularity" },
  { value: "downloads", label: "Sort by Downloads" },
  { value: "newest", label: "Sort by Newest" },
  { value: "alphabetical", label: "Sort Alphabetically" },
];

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [templatesCount] = useState(1230);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDeploy = (templateId: string) => {
    console.log("Deploying template:", templateId);
    // Handle deployment logic here
  };

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = mockTemplates;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (template) =>
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (template) => template.category === selectedCategory,
      );
    }

    // Filter by tab (recommended vs most popular)
    if (tabValue === 0) {
      // Recommended - show popular templates first
      filtered = filtered.filter((template) => template.isPopular);
    }

    // Sort templates
    switch (sortBy) {
      case "downloads":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
        // For demo purposes, reverse the array to simulate newest first
        filtered.reverse();
        break;
      case "popularity":
      default:
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, tabValue, sortBy]);

  const featuredTemplates = mockTemplates
    .filter((template) => template.isPopular)
    .slice(0, 4);

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 4,
            color: "text.primary",
          }}
        >
          Deploy an App in Minutes
        </Typography>

        {/* Search Bar */}
        <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
          <TextField
            fullWidth
            placeholder="What would you like to deploy today?"
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
                "& input": {
                  color: "text.secondary",
                  "&::placeholder": {
                    color: "text.secondary",
                    opacity: 0.7,
                  },
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Navigation Tabs and Filter */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "16px",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "text.primary",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
            }}
          >
            <Tab label="Recommended" />
            <Tab label="Most Popular" />
          </Tabs>

          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              IconComponent={ArrowDownIcon}
              sx={{
                backgroundColor: "background.paper",
                color: "text.secondary",
                fontSize: "14px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#343B4F",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(203, 60, 255, 0.3)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "& .MuiSelect-icon": {
                  color: "text.secondary",
                },
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Featured Templates Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 6,
          }}
        >
          {featuredTemplates.map((template) => (
            <Box
              key={template.id}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 12px)" }, // Exact 50% minus half the gap
                flexShrink: 0,
                flexGrow: 0,
              }}
            >
              <TemplateCard {...template} onDeploy={handleDeploy} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Explore All Templates Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Explore All Templates
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "14px",
            }}
          >
            All Templates ({templatesCount})
          </Typography>
        </Box>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* All Templates Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {filteredAndSortedTemplates.map((template) => (
            <Box
              key={template.id}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 12px)" }, // Exact 50% minus half the gap
                flexShrink: 0,
                flexGrow: 0,
              }}
            >
              <TemplateCard {...template} onDeploy={handleDeploy} />
            </Box>
          ))}
        </Box>

        {/* Empty State */}
        {filteredAndSortedTemplates.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: 2,
              }}
            >
              No templates found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
