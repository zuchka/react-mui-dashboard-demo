import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export interface TemplateCardProps {
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

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  icon,
  author,
  downloads,
  category,
  isPopular = false,
  onDeploy,
}) => {
  const formatDownloads = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleDeploy = () => {
    if (onDeploy) {
      onDeploy(id);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
        border: "0.6px solid #343B4F",
        boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
        "&:hover": {
          transform: "translateY(-2px)",
          transition: "transform 0.2s ease-in-out",
          boxShadow: "2px 4px 8px 0px rgba(16, 25, 52, 0.60)",
        },
      }}
    >
      <CardContent
        sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3 }}
      >
        {/* Header with icon and category */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                backgroundColor: "rgba(203, 60, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              {icon}
            </Box>
            {isPopular && (
              <Chip
                label="Popular"
                size="small"
                sx={{
                  backgroundColor: "rgba(87, 93, 255, 0.20)",
                  color: "text.primary",
                  fontSize: "10px",
                  height: 20,
                  border: "0.6px solid rgba(87, 93, 255, 0.50)",
                }}
              />
            )}
          </Box>
        </Box>

        {/* Title and Description */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "20px",
            mb: 1,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "14px",
            lineHeight: "20px",
            mb: 3,
            flex: 1,
          }}
        >
          {description}
        </Typography>

        {/* Author and stats */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={author.avatar}
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "primary.main",
                fontSize: "10px",
              }}
            >
              {!author.avatar && <PersonIcon sx={{ fontSize: 12 }} />}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "12px",
              }}
            >
              {author.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DownloadIcon sx={{ fontSize: 12, color: "text.secondary" }} />
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "12px",
              }}
            >
              {formatDownloads(downloads)}
            </Typography>
          </Box>
        </Box>

        {/* Deploy Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleDeploy}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: 500,
            fontSize: "14px",
            py: 1,
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Deploy
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
