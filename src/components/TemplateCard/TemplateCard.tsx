import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

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
        width: "100%", // Take full width of Grid item
        height: 320, // Fixed height
        minWidth: 0, // Allow shrinking
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
        border: "0.6px solid #343B4F",
        boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 24px 0px rgba(16, 25, 52, 0.60)",
          borderColor: "rgba(203, 60, 255, 0.3)",
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          width: "100%",
          minWidth: 0, // Important: allows content to shrink
          overflow: "hidden",
        }}
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
                flexShrink: 0, // Don't shrink icon
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
                  flexShrink: 0, // Don't shrink chip
                }}
              />
            )}
          </Box>
        </Box>

        {/* Title and Description */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "20px",
              mb: 1,
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap", // Single line title
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
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3, // Limit to 3 lines
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              wordBreak: "break-word", // Break long words
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Author and stats */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: 0,
              flex: 1,
            }}
          >
            <Avatar
              src={author.avatar}
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "primary.main",
                fontSize: "10px",
                flexShrink: 0,
              }}
            >
              {!author.avatar && <PersonIcon sx={{ fontSize: 12 }} />}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
            >
              {author.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}
          >
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
            flexShrink: 0, // Don't shrink button
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
