export interface BuoyMetadata {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// Known coordinates for major buoys (these will be displayed properly on the map)
// Other buoys will have 0,0 coordinates until their data is fetched
const KNOWN_BUOY_COORDINATES: Record<
  string,
  { lat: number; lng: number; name?: string }
> = {
  // Pacific Hawaii region (51000 series)
  "51004": { lat: 17.48, lng: -152.5, name: "Hanauma Bay Buoy 51004" },
  "51001": { lat: 23.445, lng: -162.279, name: "Northwest Hawaii Buoy 51001" },
  "51002": { lat: 17.2, lng: -157.75, name: "South Papa Buoy 51002" },
  "51003": { lat: 19.196, lng: -160.639, name: "Molokai Hawaii Buoy 51003" },
  "51005": { lat: 21.67, lng: -158.12, name: "Kauai Buoy 51005" },

  // Pacific West Coast (46000 series)
  "46001": { lat: 56.3, lng: -148.02, name: "Gulf of Alaska Buoy 46001" },
  "46002": { lat: 42.612, lng: -130.515, name: "Oregon Buoy 46002" },
  "46003": { lat: 38.218, lng: -123.301, name: "Point Reyes Buoy 46003" },
  "46005": { lat: 46.138, lng: -131.016, name: "Washington Buoy 46005" },
  "46006": { lat: 40.781, lng: -137.369, name: "Southeast Papa Buoy 46006" },
  "46007": { lat: 37.759, lng: -123.53, name: "Southeast Farallon Buoy 46007" },
  "46008": { lat: 46.857, lng: -124.728, name: "Grays Harbor Buoy 46008" },
  "46009": { lat: 46.054, lng: -125.771, name: "Astoria Buoy 46009" },
  "46011": { lat: 34.455, lng: -120.986, name: "Santa Barbara Buoy 46011" },
  "46012": { lat: 37.361, lng: -122.881, name: "Half Moon Bay Buoy 46012" },
  "46013": { lat: 38.242, lng: -123.301, name: "Bodega Bay Buoy 46013" },
  "46014": { lat: 39.23, lng: -123.964, name: "Point Arena Buoy 46014" },
  "46015": { lat: 40.294, lng: -124.731, name: "Cape Mendocino Buoy 46015" },
  "46016": { lat: 36.749, lng: -122.018, name: "Monterey Buoy 46016" },
  "46017": { lat: 42.776, lng: -124.768, name: "Cape Blanco Buoy 46017" },
  "46018": {
    lat: 47.927,
    lng: -125.017,
    name: "Destruction Island Buoy 46018",
  },
  "46019": { lat: 35.741, lng: -121.901, name: "Point Sur Buoy 46019" },
  "46020": { lat: 36.747, lng: -121.889, name: "Pt Pinos Buoy 46020" },

  // Atlantic Ocean buoys (41000 series)
  "41001": { lat: 34.502, lng: -72.522, name: "East Hatteras Buoy 41001" },
  "41002": { lat: 31.743, lng: -74.955, name: "South Hatteras Buoy 41002" },
  "41004": { lat: 32.501, lng: -79.099, name: "Edisto Buoy 41004" },
  "41006": { lat: 33.436, lng: -77.765, name: "Frying Pan Buoy 41006" },
  "41008": { lat: 31.402, lng: -80.868, name: "Gray's Reef Buoy 41008" },
  "41009": { lat: 28.519, lng: -80.166, name: "Canaveral East Buoy 41009" },
  "41010": { lat: 28.878, lng: -78.485, name: "Canaveral Buoy 41010" },
  "41013": { lat: 33.436, lng: -77.765, name: "Frying Pan Shoals Buoy 41013" },

  // Gulf of Mexico buoys (42000 series)
  "42001": { lat: 25.888, lng: -89.658, name: "Mid Gulf Buoy 42001" },
  "42002": { lat: 26.058, lng: -93.64, name: "West Gulf Buoy 42002" },
  "42003": { lat: 26.0, lng: -85.648, name: "East Gulf Buoy 42003" },
  "42019": { lat: 27.907, lng: -95.352, name: "Freeport Buoy 42019" },
  "42020": { lat: 26.968, lng: -96.695, name: "Corpus Christi Buoy 42020" },

  // Northeast buoys (44000 series)
  "44013": { lat: 42.346, lng: -70.651, name: "Boston Buoy 44013" },
  "44014": { lat: 36.611, lng: -74.84, name: "Virginia Beach Buoy 44014" },
  "44017": { lat: 40.694, lng: -72.048, name: "Montauk Point Buoy 44017" },
  "44018": { lat: 41.767, lng: -69.717, name: "Cape Cod Buoy 44018" },
  "44025": { lat: 40.251, lng: -73.164, name: "Long Island Buoy 44025" },
  "44027": { lat: 44.28, lng: -67.308, name: "Jonesport Buoy 44027" },
  "44065": { lat: 40.369, lng: -73.703, name: "New York Harbor Buoy 44065" },
};

// Cache for the fetched buoy list
let cachedBuoyList: BuoyMetadata[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Default buoy to display on initial load
export const DEFAULT_BUOY_ID = "51004";

// Fetch the real buoy list from NOAA directory
export const fetchRealBuoyList = async (): Promise<BuoyMetadata[]> => {
  // Return cached data if still valid
  if (
    cachedBuoyList &&
    lastFetchTime &&
    Date.now() - lastFetchTime < CACHE_DURATION
  ) {
    return cachedBuoyList;
  }

  try {
    console.log("Fetching real buoy list from NOAA...");

    const fetchMethods = [
      // Method 1: Try direct fetch (might be blocked by CORS)
      async () => {
        const response = await fetch(
          "https://www.ndbc.noaa.gov/data/realtime2/",
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response;
      },
      // Method 2: Try CORS proxy
      async () => {
        const url =
          "https://api.allorigins.win/get?url=" +
          encodeURIComponent("https://www.ndbc.noaa.gov/data/realtime2/");
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Proxy failed: ${response.status}`);
        const data = await response.json();
        return new Response(data.contents);
      },
    ];

    let htmlContent = "";
    for (let i = 0; i < fetchMethods.length; i++) {
      try {
        const response = await fetchMethods[i]();
        htmlContent = await response.text();
        console.log(
          `Successfully fetched NOAA directory using method ${i + 1}`,
        );
        break;
      } catch (error) {
        console.warn(`Fetch method ${i + 1} failed:`, error);
        if (i === fetchMethods.length - 1) {
          throw new Error("All fetch methods failed for NOAA directory");
        }
      }
    }

    // Extract .txt file names (these are the buoy IDs)
    const txtFilePattern = /href="([^"]+\.txt)"/g;
    const buoyIds: string[] = [];
    let match;

    while ((match = txtFilePattern.exec(htmlContent)) !== null) {
      const fileName = match[1];
      const buoyId = fileName.replace(".txt", "");
      buoyIds.push(buoyId);
    }

    // Remove duplicates and sort
    const uniqueBuoyIds = [...new Set(buoyIds)].sort();

    console.log(`Found ${uniqueBuoyIds.length} active buoys from NOAA`);

    // Create metadata with known coordinates or defaults
    const buoyMetadata: BuoyMetadata[] = uniqueBuoyIds.map((id) => {
      const known = KNOWN_BUOY_COORDINATES[id];
      return {
        id,
        name: known?.name || `NOAA Buoy ${id}`,
        lat: known?.lat || 0,
        lng: known?.lng || 0,
      };
    });

    // Cache the result
    cachedBuoyList = buoyMetadata;
    lastFetchTime = Date.now();

    return buoyMetadata;
  } catch (error) {
    console.error(
      "Failed to fetch real buoy list from NOAA, using fallback:",
      error,
    );

    // Fallback to known buoys if fetching fails
    const fallbackBuoys = Object.entries(KNOWN_BUOY_COORDINATES).map(
      ([id, coord]) => ({
        id,
        name: coord.name || `NOAA Buoy ${id}`,
        lat: coord.lat,
        lng: coord.lng,
      }),
    );

    return fallbackBuoys;
  }
};

// Static export for immediate use (will be updated by fetch)
export let BUOY_METADATA: BuoyMetadata[] = Object.entries(
  KNOWN_BUOY_COORDINATES,
).map(([id, coord]) => ({
  id,
  name: coord.name || `NOAA Buoy ${id}`,
  lat: coord.lat,
  lng: coord.lng,
}));

// Initialize with real data
export const initializeBuoyMetadata = async (): Promise<BuoyMetadata[]> => {
  try {
    const realBuoys = await fetchRealBuoyList();
    BUOY_METADATA = realBuoys;
    return realBuoys;
  } catch (error) {
    console.error("Failed to initialize buoy metadata:", error);
    return BUOY_METADATA; // Return fallback
  }
};

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

// Helper function to update coordinates for a buoy (when data is fetched)
export const updateBuoyCoordinates = (
  buoyId: string,
  lat: number,
  lng: number,
): void => {
  const buoyIndex = BUOY_METADATA.findIndex((buoy) => buoy.id === buoyId);
  if (buoyIndex !== -1) {
    BUOY_METADATA[buoyIndex].lat = lat;
    BUOY_METADATA[buoyIndex].lng = lng;
  }
};
