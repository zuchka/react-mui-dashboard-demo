import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 250,
  width: "100%",
  maxWidth: 350,
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiSelect-root": {
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
    maxWidth: "100%",
  },
}));

interface BuoyOption {
  id: string;
  name: string;
}

interface BuoyDropdownProps {
  buoys: BuoyOption[];
  selectedBuoy: string;
  onBuoyChange: (buoyId: string) => void;
  loading?: boolean;
}

export const BuoyDropdown = ({
  buoys,
  selectedBuoy,
  onBuoyChange,
  loading = false,
}: BuoyDropdownProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onBuoyChange(event.target.value);
  };

  // Sort buoys: named stations first (alphabetically), then NOAA stations at bottom (alphabetically)
  const sortedBuoys = [...buoys].sort((a, b) => {
    const aIsNOAA = a.name.startsWith("NOAA Station");
    const bIsNOAA = b.name.startsWith("NOAA Station");

    // If one is NOAA and one isn't, put NOAA at bottom
    if (aIsNOAA && !bIsNOAA) return 1;
    if (!aIsNOAA && bIsNOAA) return -1;

    // If both are same type (both NOAA or both named), sort alphabetically
    return a.name.localeCompare(b.name);
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        "@media (max-width: 600px)": {
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
        },
      }}
    >
      <StyledFormControl size="small" disabled={loading}>
        <InputLabel id="buoy-select-label">
          {loading ? "Loading data..." : "Choose a buoy"}
        </InputLabel>
        <Select
          labelId="buoy-select-label"
          id="buoy-select"
          value={selectedBuoy}
          onChange={handleChange}
          label={loading ? "Loading data..." : "Choose a buoy"}
          aria-label="Select buoy for data visualization"
          endAdornment={
            loading && (
              <CircularProgress
                size={20}
                sx={{
                  position: "absolute",
                  right: 32,
                  pointerEvents: "none",
                }}
              />
            )
          }
        >
          {buoys.length === 0 ? (
            <MenuItem disabled>No buoys available</MenuItem>
          ) : (
            sortedBuoys.map((buoy) => (
              <MenuItem key={buoy.id} value={buoy.id}>
                {buoy.name}
              </MenuItem>
            ))
          )}
        </Select>
      </StyledFormControl>
    </Box>
  );
};
