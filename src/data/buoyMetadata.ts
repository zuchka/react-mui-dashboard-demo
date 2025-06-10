export interface BuoyMetadata {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// Curated list of active NOAA NDBC buoys with verified coordinates
// This static data allows immediate map rendering without waiting for data fetches
export const BUOY_METADATA: BuoyMetadata[] = [
  // Pacific Hawaii region (51000 series) - Most reliable data
  { id: "51004", name: "Hanauma Bay Buoy 51004", lat: 17.48, lng: -152.5 },
  {
    id: "51001",
    name: "Northwest Hawaii Buoy 51001",
    lat: 23.445,
    lng: -162.279,
  },
  { id: "51002", name: "South Papa Buoy 51002", lat: 17.2, lng: -157.75 },
  {
    id: "51003",
    name: "Molokai Hawaii Buoy 51003",
    lat: 19.196,
    lng: -160.639,
  },
  { id: "51005", name: "Kauai Buoy 51005", lat: 21.67, lng: -158.12 },

  // Pacific West Coast (46000 series) - High activity region
  { id: "46001", name: "Gulf of Alaska Buoy 46001", lat: 56.3, lng: -148.02 },
  { id: "46002", name: "Oregon Buoy 46002", lat: 42.612, lng: -130.515 },
  { id: "46003", name: "Point Reyes Buoy 46003", lat: 38.218, lng: -123.301 },
  { id: "46005", name: "Washington Buoy 46005", lat: 46.138, lng: -131.016 },
  {
    id: "46006",
    name: "Southeast Papa Buoy 46006",
    lat: 40.781,
    lng: -137.369,
  },
  {
    id: "46007",
    name: "Southeast Farallon Buoy 46007",
    lat: 37.759,
    lng: -123.53,
  },
  { id: "46008", name: "Grays Harbor Buoy 46008", lat: 46.857, lng: -124.728 },
  { id: "46009", name: "Astoria Buoy 46009", lat: 46.054, lng: -125.771 },
  { id: "46011", name: "Santa Barbara Buoy 46011", lat: 34.455, lng: -120.986 },
  { id: "46012", name: "Half Moon Bay Buoy 46012", lat: 37.361, lng: -122.881 },
  { id: "46013", name: "Bodega Bay Buoy 46013", lat: 38.242, lng: -123.301 },
  { id: "46014", name: "Point Arena Buoy 46014", lat: 39.23, lng: -123.964 },
  {
    id: "46015",
    name: "Cape Mendocino Buoy 46015",
    lat: 40.294,
    lng: -124.731,
  },
  { id: "46016", name: "Monterey Buoy 46016", lat: 36.749, lng: -122.018 },
  { id: "46017", name: "Cape Blanco Buoy 46017", lat: 42.776, lng: -124.768 },
  {
    id: "46018",
    name: "Destruction Island Buoy 46018",
    lat: 47.927,
    lng: -125.017,
  },
  { id: "46019", name: "Point Sur Buoy 46019", lat: 35.741, lng: -121.901 },
  { id: "46020", name: "Pt Pinos Buoy 46020", lat: 36.747, lng: -121.889 },

  // Atlantic Ocean buoys (41000 series) - East Coast
  { id: "41001", name: "East Hatteras Buoy 41001", lat: 34.502, lng: -72.522 },
  { id: "41002", name: "South Hatteras Buoy 41002", lat: 31.743, lng: -74.955 },
  { id: "41004", name: "Edisto Buoy 41004", lat: 32.501, lng: -79.099 },
  { id: "41006", name: "Frying Pan Buoy 41006", lat: 33.436, lng: -77.765 },
  { id: "41008", name: "Gray's Reef Buoy 41008", lat: 31.402, lng: -80.868 },
  { id: "41009", name: "Canaveral East Buoy 41009", lat: 28.519, lng: -80.166 },
  { id: "41010", name: "Canaveral Buoy 41010", lat: 28.878, lng: -78.485 },
  {
    id: "41013",
    name: "Frying Pan Shoals Buoy 41013",
    lat: 33.436,
    lng: -77.765,
  },

  // Gulf of Mexico buoys (42000 series)
  { id: "42001", name: "Mid Gulf Buoy 42001", lat: 25.888, lng: -89.658 },
  { id: "42002", name: "West Gulf Buoy 42002", lat: 26.058, lng: -93.64 },
  { id: "42003", name: "East Gulf Buoy 42003", lat: 26.0, lng: -85.648 },
  { id: "42007", name: "South Timbalier Buoy 42007", lat: 30.093, lng: -88.77 },
  { id: "42019", name: "Freeport Buoy 42019", lat: 27.907, lng: -95.352 },
  { id: "42020", name: "Corpus Christi Buoy 42020", lat: 26.968, lng: -96.695 },

  // Northeast buoys (44000 series)
  { id: "44013", name: "Boston Buoy 44013", lat: 42.346, lng: -70.651 },
  { id: "44014", name: "Virginia Beach Buoy 44014", lat: 36.611, lng: -74.84 },
  { id: "44017", name: "Montauk Point Buoy 44017", lat: 40.694, lng: -72.048 },
  { id: "44018", name: "Cape Cod Buoy 44018", lat: 41.767, lng: -69.717 },
  { id: "44025", name: "Long Island Buoy 44025", lat: 40.251, lng: -73.164 },
  { id: "44027", name: "Jonesport Buoy 44027", lat: 44.28, lng: -67.308 },
  {
    id: "44065",
    name: "New York Harbor Buoy 44065",
    lat: 40.369,
    lng: -73.703,
  },
];

// Default buoy to display on initial load
export const DEFAULT_BUOY_ID = "51004";

// Helper function to get buoy metadata by ID
export const getBuoyMetadata = (buoyId: string): BuoyMetadata | undefined => {
  return BUOY_METADATA.find((buoy) => buoy.id === buoyId);
};

// Helper function to get all available buoy IDs
export const getAllBuoyIds = (): string[] => {
  return BUOY_METADATA.map((buoy) => buoy.id);
};

// Helper function to check if a buoy exists in our metadata
export const isBuoySupported = (buoyId: string): boolean => {
  return BUOY_METADATA.some((buoy) => buoy.id === buoyId);
};
