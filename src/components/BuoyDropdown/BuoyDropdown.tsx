import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
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

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="h6" color="text.primary">
        Select Buoy:
      </Typography>
      <StyledFormControl size="small" disabled={loading}>
        <InputLabel id="buoy-select-label">Choose a buoy</InputLabel>
        <Select
          labelId="buoy-select-label"
          id="buoy-select"
          value={selectedBuoy}
          onChange={handleChange}
          label="Choose a buoy"
          aria-label="Select buoy for data visualization"
        >
          {buoys.length === 0 ? (
            <MenuItem disabled>
              {loading ? "Loading buoys..." : "No buoys available"}
            </MenuItem>
          ) : (
            buoys.map((buoy) => (
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
