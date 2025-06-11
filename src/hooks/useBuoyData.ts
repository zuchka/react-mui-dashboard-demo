import { useState, useEffect, useCallback } from "react";
import {
  BUOY_METADATA,
  DEFAULT_BUOY_ID,
  getBuoyMetadata,
  initializeBuoyMetadata,
  updateBuoyCoordinates,
} from "../data/buoyMetadata";

export interface BuoyData {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  temperature: number | null;
  waveHeight: number | null;
  windSpeed: number | null;
  pressure: number | null;
  timestamp: string;
}

export interface BuoyTimeSeriesData {
  timestamp: string;
  temperature: number | null;
  waveHeight: number | null;
  windSpeed: number | null;
  pressure: number | null;
}

export interface GroupedBuoyData {
  [buoyId: string]: {
    info: BuoyData;
    history: BuoyTimeSeriesData[];
  };
}

const parseNOAAValue = (value: string): number | null => {
  if (value === "MM" || value === "" || isNaN(parseFloat(value))) {
    return null;
  }
  return parseFloat(value);
};

const fetchBuoyDataFromNOAA = async (
  buoyId: string,
): Promise<{ info: BuoyData; history: BuoyTimeSeriesData[] } | null> => {
  const buoyConfig = getBuoyMetadata(buoyId);
  if (!buoyConfig) {
    throw new Error(`Buoy ${buoyId} not found in metadata`);
  }

  // NOAA requirement: All alphabetic characters must be uppercase in file names
  const upperCaseBuoyId = buoyId.toUpperCase();
  const fileName = `${upperCaseBuoyId}.txt`;

  console.log(
    `Fetching NOAA data for station ${buoyId} (filename: ${fileName})`,
  );

  const fetchMethods = [
    // Method 1: Try Vite dev server proxy
    async () => {
      const url = `/api/noaa/data/realtime2/${fileName}`;
      console.log(`Trying proxy fetch for buoy ${buoyId}: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Proxy failed: ${response.status} ${response.statusText}`,
        );
      }
      return response;
    },
    // Method 2: Try public CORS proxy (allorigins)
    async () => {
      const noaaUrl = `https://www.ndbc.noaa.gov/data/realtime2/${fileName}`;
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(noaaUrl)}`;
      console.log(`Trying CORS proxy for buoy ${buoyId}: ${noaaUrl}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `CORS proxy failed: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      // allorigins returns the content in data.contents
      return new Response(data.contents);
    },
    // Method 3: Try another CORS proxy (cors-anywhere)
    async () => {
      const noaaUrl = `https://www.ndbc.noaa.gov/data/realtime2/${fileName}`;
      const url = `https://cors-anywhere.herokuapp.com/${noaaUrl}`;
      console.log(`Trying cors-anywhere for buoy ${buoyId}: ${noaaUrl}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `cors-anywhere failed: ${response.status} ${response.statusText}`,
        );
      }
      return response;
    },
  ];

  for (let i = 0; i < fetchMethods.length; i++) {
    try {
      const response = await fetchMethods[i]();
      const textData = await response.text();
      const lines = textData
        .split("\n")
        .filter((line) => line.trim() && !line.startsWith("#"));

      console.log(`Buoy ${buoyId}: Retrieved ${lines.length} data lines`);

      if (lines.length === 0) {
        throw new Error("No data found in response");
      }

      // Log first few lines for debugging
      console.log(`Buoy ${buoyId}: First 3 data lines:`, lines.slice(0, 3));

      console.log(`Successfully fetched buoy ${buoyId} using method ${i + 1}`);

      // Validate that we received NOAA-formatted data
      if (lines.length === 0) {
        throw new Error(
          `No data lines found in ${fileName} - file may be empty or incorrectly formatted`,
        );
      }

      // Check if the first line looks like NOAA data (should have numeric date fields)
      const firstLine = lines[0].trim().split(/\s+/);
      if (
        firstLine.length < 5 ||
        isNaN(parseInt(firstLine[0])) ||
        isNaN(parseInt(firstLine[1]))
      ) {
        console.warn(
          `Data format may be incorrect for ${fileName}. First line: ${lines[0].substring(0, 100)}...`,
        );
      }

      return await parseBuoyData(buoyId, buoyConfig, lines);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.warn(
        `Method ${i + 1} failed for buoy ${buoyId} (${fileName}): ${errorMsg}`,
      );
      if (i === fetchMethods.length - 1) {
        // All methods failed
        throw new Error(
          `All fetch methods failed for station ${buoyId}. Station may not exist, have no recent data, or be temporarily unavailable. NOAA file: ${fileName}`,
        );
      }
    }
  }

  return null;
};

const parseBuoyData = async (
  buoyId: string,
  buoyConfig: any,
  lines: string[],
): Promise<{ info: BuoyData; history: BuoyTimeSeriesData[] } | null> => {
  const history: BuoyTimeSeriesData[] = [];
  let latestReading: BuoyData | null = null;

  // Parse each data line
  // NOAA format: YY MM DD hh mm WDIR WSPD GST WVHT DPD APD MWD PRES ATMP WTMP DEWP VIS PTDY TIDE
  console.log(`Parsing ${lines.length} lines for buoy ${buoyId}`);

  lines.forEach((line, index) => {
    const values = line.trim().split(/\s+/);
    if (values.length < 15) {
      if (index < 5)
        console.log(
          `Buoy ${buoyId}: Skipping malformed line ${index}: ${line} (${values.length} values)`,
        );
      return; // Skip malformed lines
    }

    const [year, month, day, hour, minute, , wspd, , wvht, , , , pres, , wtmp] =
      values;

    // Validate essential values
    if (!year || !month || !day || !hour || !minute) {
      if (index < 5)
        console.log(
          `Buoy ${buoyId}: Skipping line ${index} - missing time data: ${line}`,
        );
      return;
    }

    // Create timestamp
    const timestamp = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
    ).toISOString();

    const temperature = parseNOAAValue(wtmp);
    const waveHeight = parseNOAAValue(wvht);
    const windSpeed = parseNOAAValue(wspd);
    const pressure = parseNOAAValue(pres);

    const dataPoint: BuoyTimeSeriesData = {
      timestamp,
      temperature,
      waveHeight,
      windSpeed,
      pressure,
    };

    history.push(dataPoint);

    // Use the first (most recent) reading for the latest info
    if (index === 0) {
      latestReading = {
        id: buoyId,
        name: buoyConfig.name,
        location: { lat: buoyConfig.lat, lng: buoyConfig.lng },
        temperature,
        waveHeight,
        windSpeed,
        pressure,
        timestamp,
      };
    }
  });

  // Sort history chronologically (oldest first)
  history.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  console.log(
    `Buoy ${buoyId}: Parsed ${history.length} valid data points, latest reading: ${latestReading ? "found" : "NOT FOUND"}`,
  );

  if (latestReading) {
    return {
      info: latestReading,
      history: history.slice(-50), // Keep last 50 readings
    };
  }

  console.warn(
    `Buoy ${buoyId}: No valid data could be parsed from ${lines.length} lines`,
  );
  return null;
};

export const useBuoyData = () => {
  const [groupedData, setGroupedData] = useState<GroupedBuoyData>({});
  const [loading, setLoading] = useState(false);
  const [loadingBuoyId, setLoadingBuoyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [buoyListInitialized, setBuoyListInitialized] = useState(false);

  // Fetch data for a specific buoy
  const fetchBuoyData = useCallback(async (buoyId: string) => {
    try {
      setLoadingBuoyId(buoyId);
      setLoading(true);
      setError(null);

      console.log(`Fetching data for buoy ${buoyId}...`);

      const data = await fetchBuoyDataFromNOAA(buoyId);

      if (data) {
        setGroupedData((prev) => ({
          ...prev,
          [buoyId]: data,
        }));

        // Update coordinates in metadata if we got real coordinates
        if (data.info.location.lat !== 0 || data.info.location.lng !== 0) {
          updateBuoyCoordinates(
            buoyId,
            data.info.location.lat,
            data.info.location.lng,
          );
        }

        setLastUpdate(new Date());
        console.log(`Successfully loaded data for buoy ${buoyId}`);
      } else {
        throw new Error(
          `No valid data could be parsed for buoy ${buoyId}. This buoy may not have recent data or the data format may be incompatible.`,
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch buoy data";

      // Provide user-friendly error message
      const userFriendlyMessage = errorMessage.includes(
        "No valid data could be parsed",
      )
        ? `Buoy ${buoyId} is temporarily unavailable or not reporting data`
        : `Unable to load data for buoy ${buoyId}`;

      setError(userFriendlyMessage);
      console.error(`Error fetching buoy ${buoyId}:`, err);

      // Log suggestion for maintenance
      if (errorMessage.includes("No valid data could be parsed")) {
        console.warn(
          `Buoy ${buoyId} may need to be removed from the verified active list - check NOAA station status`,
        );
      }
    } finally {
      setLoading(false);
      setLoadingBuoyId(null);
    }
  }, []);

  // Initialize real buoy list and load default buoy on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeBuoyMetadata();
        setBuoyListInitialized(true);
        console.log(
          "Buoy metadata initialized with verified active NOAA stations",
        );
      } catch (error) {
        console.error("Failed to initialize buoy metadata:", error);
        setBuoyListInitialized(true); // Continue with fallback data
      }

      // Load default buoy data
      fetchBuoyData(DEFAULT_BUOY_ID);
    };

    initialize();
  }, [fetchBuoyData]);

  const getBuoyList = useCallback(() => {
    return BUOY_METADATA.map((buoy) => ({
      id: buoy.id,
      name: buoy.name,
    }));
  }, []);

  const getBuoyData = useCallback(
    (buoyId: string) => {
      return groupedData[buoyId] || null;
    },
    [groupedData],
  );

  // Get all available buoys (from static metadata)
  const getAllAvailableBuoys = useCallback(() => {
    return BUOY_METADATA.map((buoy) => ({
      id: buoy.id,
      name: buoy.name,
    }));
  }, []);

  // Get loaded buoys (those with data)
  const getLoadedBuoys = useCallback(() => {
    return Object.keys(groupedData).map((buoyId) => ({
      id: buoyId,
      name: groupedData[buoyId].info.name,
    }));
  }, [groupedData]);

  // Check if a specific buoy is loaded
  const isBuoyLoaded = useCallback(
    (buoyId: string) => {
      return buoyId in groupedData;
    },
    [groupedData],
  );

  // Check if a specific buoy is currently loading
  const isBuoyLoading = useCallback(
    (buoyId: string) => {
      return loadingBuoyId === buoyId;
    },
    [loadingBuoyId],
  );

  // Development helper to test multiple buoys and see which ones have data
  const testMultipleBuoys = useCallback(
    async (buoyIds: string[]) => {
      const results: { [buoyId: string]: boolean } = {};

      for (const buoyId of buoyIds) {
        try {
          await fetchBuoyData(buoyId);
          results[buoyId] = true;
          console.log(`✅ Buoy ${buoyId}: Data available`);
        } catch (error) {
          results[buoyId] = false;
          console.log(`❌ Buoy ${buoyId}: No data available`);
        }
      }

      return results;
    },
    [fetchBuoyData],
  );

  return {
    groupedData,
    loading,
    loadingBuoyId,
    error,
    lastUpdate,
    buoyListInitialized,
    getBuoyList,
    getBuoyData,
    getAllAvailableBuoys,
    getLoadedBuoys,
    isBuoyLoaded,
    isBuoyLoading,
    fetchBuoyData,
    refetch: () => fetchBuoyData(DEFAULT_BUOY_ID),
    testMultipleBuoys, // For development/debugging only
  };
};
