import { useState, useEffect, useCallback } from "react";

export interface BuoyData {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  temperature: number;
  waveHeight: number;
  windSpeed: number;
  pressure: number;
  timestamp: string;
}

export interface BuoyTimeSeriesData {
  timestamp: string;
  temperature: number;
  waveHeight: number;
  windSpeed: number;
  pressure: number;
}

export interface GroupedBuoyData {
  [buoyId: string]: {
    info: BuoyData;
    history: BuoyTimeSeriesData[];
  };
}

// Available NOAA NDBC buoys - complete station list with real coordinates
const AVAILABLE_BUOYS = [
  // Atlantic Ocean buoys (41000 series)
  { id: "41001", name: "East Hatteras Buoy 41001", lat: 34.502, lng: -72.522 },
  { id: "41002", name: "South Hatteras Buoy 41002", lat: 31.743, lng: -74.955 },
  {
    id: "41003",
    name: "Currituck Beach Buoy 41003",
    lat: 36.294,
    lng: -75.777,
  },
  { id: "41004", name: "Edisto Buoy 41004", lat: 32.501, lng: -79.099 },
  { id: "41005", name: "Hatteras East Buoy 41005", lat: 35.008, lng: -75.402 },
  { id: "41006", name: "Frying Pan Buoy 41006", lat: 33.436, lng: -77.765 },
  {
    id: "41007",
    name: "Wrightsville Beach Buoy 41007",
    lat: 34.209,
    lng: -77.789,
  },
  { id: "41008", name: "Gray's Reef Buoy 41008", lat: 31.402, lng: -80.868 },
  { id: "41009", name: "Canaveral East Buoy 41009", lat: 28.519, lng: -80.166 },
  { id: "41010", name: "Canaveral Buoy 41010", lat: 28.878, lng: -78.485 },
  { id: "41011", name: "Bethany Beach Buoy 41011", lat: 38.484, lng: -74.841 },
  { id: "41012", name: "St. Augustine Buoy 41012", lat: 30.065, lng: -81.291 },
  {
    id: "41013",
    name: "Frying Pan Shoals Buoy 41013",
    lat: 33.436,
    lng: -77.765,
  },
  { id: "41015", name: "Diamond Shoals Buoy 41015", lat: 35.098, lng: -75.333 },
  {
    id: "41016",
    name: "Hatteras Canyon Buoy 41016",
    lat: 34.837,
    lng: -74.842,
  },
  { id: "41017", name: "Hatteras East Buoy 41017", lat: 35.239, lng: -74.836 },
  { id: "41018", name: "Hatteras West Buoy 41018", lat: 33.729, lng: -78.158 },
  { id: "41021", name: "Georgetown Buoy 41021", lat: 33.238, lng: -77.374 },
  { id: "41022", name: "Georgetown East Buoy 41022", lat: 33.33, lng: -76.785 },
  {
    id: "41023",
    name: "Georgetown South Buoy 41023",
    lat: 32.832,
    lng: -78.502,
  },
  { id: "41025", name: "Diamond Shoals Buoy 41025", lat: 35.006, lng: -75.402 },
  { id: "41035", name: "Bethany Beach Buoy 41035", lat: 38.498, lng: -74.84 },
  {
    id: "41036",
    name: "Wrightsville Beach Buoy 41036",
    lat: 34.21,
    lng: -77.32,
  },
  { id: "41040", name: "North Carolina Buoy 41040", lat: 34.137, lng: -72.674 },
  { id: "41041", name: "St. Augustine Buoy 41041", lat: 30.72, lng: -81.048 },
  { id: "41043", name: "Onslow Bay Buoy 41043", lat: 34.213, lng: -76.846 },
  { id: "41044", name: "Cape Fear Buoy 41044", lat: 33.915, lng: -77.675 },
  { id: "41046", name: "West Hatteras Buoy 41046", lat: 35.239, lng: -75.382 },
  { id: "41047", name: "Mid-Atlantic Buoy 41047", lat: 27.47, lng: -71.49 },
  { id: "41048", name: "West Bermuda Buoy 41048", lat: 31.831, lng: -69.248 },
  { id: "41049", name: "Bermuda Buoy 41049", lat: 27.49, lng: -62.95 },
  { id: "41420", name: "Buoy 41420", lat: 0, lng: 0 },
  { id: "41421", name: "Buoy 41421", lat: 0, lng: 0 },
  { id: "41424", name: "Buoy 41424", lat: 0, lng: 0 },
  { id: "41425", name: "Buoy 41425", lat: 0, lng: 0 },
  { id: "41A46", name: "Buoy 41A46", lat: 0, lng: 0 },
  { id: "41B41", name: "Buoy 41B41", lat: 0, lng: 0 },
  { id: "41S43", name: "Buoy 41S43", lat: 0, lng: 0 },
  { id: "41S46", name: "Buoy 41S46", lat: 0, lng: 0 },

  // Gulf of Mexico buoys (42000 series)
  { id: "42001", name: "Mid Gulf Buoy 42001", lat: 25.888, lng: -89.658 },
  { id: "42002", name: "West Gulf Buoy 42002", lat: 26.058, lng: -93.64 },
  { id: "42003", name: "East Gulf Buoy 42003", lat: 26.0, lng: -85.648 },
  { id: "42004", name: "TABS Buoy B", lat: 27.915, lng: -95.352 },
  { id: "42005", name: "TABS Buoy D", lat: 28.784, lng: -94.8 },
  { id: "42006", name: "TABS Buoy F", lat: 29.232, lng: -94.413 },
  { id: "42007", name: "South Timbalier Buoy 42007", lat: 30.093, lng: -88.77 },
  { id: "42008", name: "Vermilion Bay Buoy 42008", lat: 29.692, lng: -93.867 },
  { id: "42009", name: "Galveston Buoy 42009", lat: 29.062, lng: -93.836 },
  { id: "42010", name: "Eugene Island Buoy 42010", lat: 28.87, lng: -90.48 },
  {
    id: "42011",
    name: "Atchafalaya Bay Buoy 42011",
    lat: 29.232,
    lng: -90.465,
  },
  { id: "42012", name: "Orange Beach Buoy 42012", lat: 30.065, lng: -87.555 },
  { id: "42015", name: "Sabine Pass Buoy 42015", lat: 29.665, lng: -93.88 },
  { id: "42016", name: "Calcasieu Pass Buoy 42016", lat: 29.63, lng: -93.35 },
  { id: "42017", name: "Southwest Pass Buoy 42017", lat: 28.95, lng: -90.338 },
  { id: "42018", name: "Ship Shoal Buoy 42018", lat: 28.467, lng: -90.333 },
  { id: "42019", name: "Freeport Buoy 42019", lat: 27.907, lng: -95.352 },
  { id: "42020", name: "Corpus Christi Buoy 42020", lat: 26.968, lng: -96.695 },
  { id: "42025", name: "Gulf Buoy 42025", lat: 0, lng: 0 },
  { id: "42035", name: "Gulf Buoy 42035", lat: 0, lng: 0 },
  { id: "42036", name: "Gulf Buoy 42036", lat: 0, lng: 0 },
  { id: "42037", name: "Gulf Buoy 42037", lat: 0, lng: 0 },
  { id: "42038", name: "Gulf Buoy 42038", lat: 0, lng: 0 },
  { id: "42039", name: "Gulf Buoy 42039", lat: 0, lng: 0 },
  { id: "42040", name: "Gulf Buoy 42040", lat: 0, lng: 0 },
  { id: "42041", name: "Gulf Buoy 42041", lat: 0, lng: 0 },
  { id: "42042", name: "Gulf Buoy 42042", lat: 0, lng: 0 },
  { id: "42053", name: "Gulf Buoy 42053", lat: 0, lng: 0 },
  { id: "42054", name: "Gulf Buoy 42054", lat: 0, lng: 0 },
  { id: "42055", name: "Gulf Buoy 42055", lat: 0, lng: 0 },
  { id: "42056", name: "Gulf Buoy 42056", lat: 0, lng: 0 },
  { id: "42057", name: "Gulf Buoy 42057", lat: 0, lng: 0 },
  { id: "42058", name: "Gulf Buoy 42058", lat: 0, lng: 0 },
  { id: "42059", name: "Gulf Buoy 42059", lat: 0, lng: 0 },
  { id: "42060", name: "Gulf Buoy 42060", lat: 0, lng: 0 },
  { id: "42065", name: "Gulf Buoy 42065", lat: 0, lng: 0 },
  { id: "42080", name: "Gulf Buoy 42080", lat: 0, lng: 0 },
  { id: "42407", name: "Gulf Buoy 42407", lat: 0, lng: 0 },
  { id: "42408", name: "Gulf Buoy 42408", lat: 0, lng: 0 },
  { id: "42409", name: "Gulf Buoy 42409", lat: 0, lng: 0 },
  { id: "42429", name: "Gulf Buoy 42429", lat: 0, lng: 0 },
  { id: "42501", name: "Gulf Buoy 42501", lat: 0, lng: 0 },
  { id: "42503", name: "Gulf Buoy 42503", lat: 0, lng: 0 },
  { id: "42534", name: "Gulf Buoy 42534", lat: 0, lng: 0 },

  // Great Lakes buoys (43000-45000 series)
  { id: "43412", name: "Great Lakes Buoy 43412", lat: 0, lng: 0 },
  { id: "43413", name: "Great Lakes Buoy 43413", lat: 0, lng: 0 },
  { id: "44001", name: "East Coast Buoy 44001", lat: 0, lng: 0 },
  { id: "44003", name: "East Coast Buoy 44003", lat: 0, lng: 0 },
  { id: "44004", name: "East Coast Buoy 44004", lat: 0, lng: 0 },
  { id: "44005", name: "East Coast Buoy 44005", lat: 0, lng: 0 },
  { id: "44006", name: "East Coast Buoy 44006", lat: 0, lng: 0 },
  { id: "44007", name: "East Coast Buoy 44007", lat: 0, lng: 0 },
  { id: "44008", name: "East Coast Buoy 44008", lat: 0, lng: 0 },
  { id: "44009", name: "East Coast Buoy 44009", lat: 0, lng: 0 },
  { id: "44010", name: "East Coast Buoy 44010", lat: 0, lng: 0 },
  { id: "44011", name: "East Coast Buoy 44011", lat: 0, lng: 0 },
  { id: "44012", name: "East Coast Buoy 44012", lat: 0, lng: 0 },
  { id: "44013", name: "Boston Buoy 44013", lat: 42.346, lng: -70.651 },
  { id: "44014", name: "Virginia Beach Buoy 44014", lat: 36.611, lng: -74.84 },
  { id: "44015", name: "Nantucket Buoy 44015", lat: 41.111, lng: -69.248 },
  { id: "44017", name: "Montauk Point Buoy 44017", lat: 40.694, lng: -72.048 },
  { id: "44018", name: "Cape Cod Buoy 44018", lat: 41.767, lng: -69.717 },
  { id: "44019", name: "Block Island Buoy 44019", lat: 41.139, lng: -71.127 },
  {
    id: "44020",
    name: "Nantucket Sound Buoy 44020",
    lat: 41.443,
    lng: -70.279,
  },
  { id: "44023", name: "Cape Cod Bay Buoy 44023", lat: 41.677, lng: -70.502 },
  { id: "44025", name: "Long Island Buoy 44025", lat: 40.251, lng: -73.164 },
  { id: "44026", name: "Hatteras Buoy 44026", lat: 35.234, lng: -75.333 },
  { id: "44027", name: "Jonesport Buoy 44027", lat: 44.28, lng: -67.308 },
  { id: "44028", name: "Cape May Buoy 44028", lat: 38.482, lng: -74.702 },
  {
    id: "44065",
    name: "New York Harbor Buoy 44065",
    lat: 40.369,
    lng: -73.703,
  },
  { id: "44066", name: "Texas Tower Buoy 44066", lat: 39.618, lng: -72.644 },
  { id: "44070", name: "Buzzards Bay Buoy 44070", lat: 41.401, lng: -71.032 },
  { id: "44071", name: "Chesapeake Bay Buoy 44071", lat: 36.915, lng: -75.72 },
  { id: "44401", name: "East Coast Buoy 44401", lat: 0, lng: 0 },
  { id: "44402", name: "East Coast Buoy 44402", lat: 0, lng: 0 },
  { id: "44403", name: "East Coast Buoy 44403", lat: 0, lng: 0 },
  { id: "44585", name: "East Coast Buoy 44585", lat: 0, lng: 0 },
  { id: "45001", name: "Great Lakes Buoy 45001", lat: 0, lng: 0 },
  { id: "45002", name: "Great Lakes Buoy 45002", lat: 0, lng: 0 },
  { id: "45003", name: "Great Lakes Buoy 45003", lat: 0, lng: 0 },
  { id: "45004", name: "Great Lakes Buoy 45004", lat: 0, lng: 0 },
  { id: "45005", name: "Great Lakes Buoy 45005", lat: 0, lng: 0 },
  { id: "45006", name: "Great Lakes Buoy 45006", lat: 0, lng: 0 },
  { id: "45007", name: "Great Lakes Buoy 45007", lat: 0, lng: 0 },
  { id: "45008", name: "Great Lakes Buoy 45008", lat: 0, lng: 0 },
  { id: "45009", name: "Great Lakes Buoy 45009", lat: 0, lng: 0 },
  { id: "45010", name: "Great Lakes Buoy 45010", lat: 0, lng: 0 },
  { id: "45011", name: "Great Lakes Buoy 45011", lat: 0, lng: 0 },
  { id: "45012", name: "Great Lakes Buoy 45012", lat: 0, lng: 0 },

  // Pacific buoys (46000 series)
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
  { id: "46010", name: "Pt. Reyes Buoy 46010", lat: 38.043, lng: -123.307 },
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
  { id: "46021", name: "Pacific Buoy 46021", lat: 0, lng: 0 },
  { id: "46022", name: "Pacific Buoy 46022", lat: 0, lng: 0 },
  { id: "46023", name: "Pacific Buoy 46023", lat: 0, lng: 0 },
  { id: "46024", name: "Pacific Buoy 46024", lat: 0, lng: 0 },
  { id: "46025", name: "Pacific Buoy 46025", lat: 0, lng: 0 },
  { id: "46026", name: "Pacific Buoy 46026", lat: 0, lng: 0 },
  { id: "46027", name: "Pacific Buoy 46027", lat: 0, lng: 0 },
  { id: "46028", name: "Pacific Buoy 46028", lat: 0, lng: 0 },
  { id: "46029", name: "Pacific Buoy 46029", lat: 0, lng: 0 },
  { id: "46030", name: "Pacific Buoy 46030", lat: 0, lng: 0 },
  { id: "46031", name: "Pacific Buoy 46031", lat: 0, lng: 0 },
  { id: "46032", name: "Pacific Buoy 46032", lat: 0, lng: 0 },
  { id: "46033", name: "Pacific Buoy 46033", lat: 0, lng: 0 },
  { id: "46034", name: "Pacific Buoy 46034", lat: 0, lng: 0 },
  { id: "46035", name: "Pacific Buoy 46035", lat: 0, lng: 0 },
  { id: "46037", name: "Pacific Buoy 46037", lat: 0, lng: 0 },
  { id: "46038", name: "Pacific Buoy 46038", lat: 0, lng: 0 },
  { id: "46039", name: "Pacific Buoy 46039", lat: 0, lng: 0 },
  { id: "46040", name: "Pacific Buoy 46040", lat: 0, lng: 0 },
  { id: "46041", name: "Pacific Buoy 46041", lat: 0, lng: 0 },
  { id: "46042", name: "Pacific Buoy 46042", lat: 0, lng: 0 },
  { id: "46043", name: "Pacific Buoy 46043", lat: 0, lng: 0 },
  { id: "46045", name: "Pacific Buoy 46045", lat: 0, lng: 0 },
  { id: "46047", name: "Pacific Buoy 46047", lat: 0, lng: 0 },
  { id: "46048", name: "Pacific Buoy 46048", lat: 0, lng: 0 },
  { id: "46050", name: "Pacific Buoy 46050", lat: 0, lng: 0 },
  { id: "46051", name: "Pacific Buoy 46051", lat: 0, lng: 0 },
  { id: "46053", name: "Pacific Buoy 46053", lat: 0, lng: 0 },
  { id: "46054", name: "Pacific Buoy 46054", lat: 0, lng: 0 },
  { id: "46059", name: "Pacific Buoy 46059", lat: 0, lng: 0 },
  { id: "46060", name: "Pacific Buoy 46060", lat: 0, lng: 0 },
  { id: "46061", name: "Pacific Buoy 46061", lat: 0, lng: 0 },
  { id: "46062", name: "Pacific Buoy 46062", lat: 0, lng: 0 },
  { id: "46063", name: "Pacific Buoy 46063", lat: 0, lng: 0 },
  { id: "46066", name: "Pacific Buoy 46066", lat: 0, lng: 0 },
  { id: "46069", name: "Pacific Buoy 46069", lat: 0, lng: 0 },
  { id: "46070", name: "Pacific Buoy 46070", lat: 0, lng: 0 },
  { id: "46071", name: "Pacific Buoy 46071", lat: 0, lng: 0 },
  { id: "46072", name: "Pacific Buoy 46072", lat: 0, lng: 0 },
  { id: "46073", name: "Pacific Buoy 46073", lat: 0, lng: 0 },
  { id: "46075", name: "Pacific Buoy 46075", lat: 0, lng: 0 },
  { id: "46076", name: "Pacific Buoy 46076", lat: 0, lng: 0 },
  { id: "46077", name: "Pacific Buoy 46077", lat: 0, lng: 0 },
  { id: "46078", name: "Pacific Buoy 46078", lat: 0, lng: 0 },
  { id: "46079", name: "Pacific Buoy 46079", lat: 0, lng: 0 },
  { id: "46080", name: "Pacific Buoy 46080", lat: 0, lng: 0 },
  { id: "46081", name: "Pacific Buoy 46081", lat: 0, lng: 0 },
  { id: "46082", name: "Pacific Buoy 46082", lat: 0, lng: 0 },
  { id: "46083", name: "Pacific Buoy 46083", lat: 0, lng: 0 },
  { id: "46084", name: "Pacific Buoy 46084", lat: 0, lng: 0 },
  { id: "46085", name: "Pacific Buoy 46085", lat: 0, lng: 0 },
  { id: "46086", name: "Pacific Buoy 46086", lat: 0, lng: 0 },
  { id: "46087", name: "Pacific Buoy 46087", lat: 0, lng: 0 },
  { id: "46088", name: "Pacific Buoy 46088", lat: 0, lng: 0 },
  { id: "46089", name: "Pacific Buoy 46089", lat: 0, lng: 0 },
  { id: "46090", name: "Pacific Buoy 46090", lat: 0, lng: 0 },
  { id: "46105", name: "Pacific Buoy 46105", lat: 0, lng: 0 },
  { id: "46106", name: "Pacific Buoy 46106", lat: 0, lng: 0 },
  { id: "46107", name: "Pacific Buoy 46107", lat: 0, lng: 0 },
  { id: "46115", name: "Pacific Buoy 46115", lat: 0, lng: 0 },
  { id: "46270", name: "Pacific Buoy 46270", lat: 0, lng: 0 },
  { id: "46290", name: "Pacific Buoy 46290", lat: 0, lng: 0 },
  { id: "46401", name: "Pacific Buoy 46401", lat: 0, lng: 0 },
  { id: "46402", name: "Pacific Buoy 46402", lat: 0, lng: 0 },
  { id: "46403", name: "Pacific Buoy 46403", lat: 0, lng: 0 },
  { id: "46404", name: "Pacific Buoy 46404", lat: 0, lng: 0 },
  { id: "46405", name: "Pacific Buoy 46405", lat: 0, lng: 0 },
  { id: "46406", name: "Pacific Buoy 46406", lat: 0, lng: 0 },
  { id: "46407", name: "Pacific Buoy 46407", lat: 0, lng: 0 },
  { id: "46408", name: "Pacific Buoy 46408", lat: 0, lng: 0 },
  { id: "46409", name: "Pacific Buoy 46409", lat: 0, lng: 0 },
  { id: "46410", name: "Pacific Buoy 46410", lat: 0, lng: 0 },
  { id: "46411", name: "Pacific Buoy 46411", lat: 0, lng: 0 },
  { id: "46412", name: "Pacific Buoy 46412", lat: 0, lng: 0 },
  { id: "46413", name: "Pacific Buoy 46413", lat: 0, lng: 0 },
  { id: "46414", name: "Pacific Buoy 46414", lat: 0, lng: 0 },
  { id: "46415", name: "Pacific Buoy 46415", lat: 0, lng: 0 },
  { id: "46416", name: "Pacific Buoy 46416", lat: 0, lng: 0 },
  { id: "46419", name: "Pacific Buoy 46419", lat: 0, lng: 0 },
  { id: "46490", name: "Pacific Buoy 46490", lat: 0, lng: 0 },
  { id: "46551", name: "Pacific Buoy 46551", lat: 0, lng: 0 },
  { id: "46553", name: "Pacific Buoy 46553", lat: 0, lng: 0 },
  { id: "46779", name: "Pacific Buoy 46779", lat: 0, lng: 0 },
  { id: "46780", name: "Pacific Buoy 46780", lat: 0, lng: 0 },
  { id: "46781", name: "Pacific Buoy 46781", lat: 0, lng: 0 },
  { id: "46782", name: "Pacific Buoy 46782", lat: 0, lng: 0 },
  { id: "46785", name: "Pacific Buoy 46785", lat: 0, lng: 0 },
  { id: "46B35", name: "Pacific Buoy 46B35", lat: 0, lng: 0 },
  { id: "46D04", name: "Pacific Buoy 46D04", lat: 0, lng: 0 },

  // Caribbean and Gulf of Mexico extended
  { id: "48011", name: "Caribbean Buoy 48011", lat: 0, lng: 0 },

  // Pacific Hawaii region (51000 series)
  { id: "51000", name: "Papa Hawaii Buoy 51000", lat: 50.1, lng: -144.9 },
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
  { id: "51004", name: "Hanauma Bay Buoy 51004", lat: 17.48, lng: -152.5 },
  { id: "51005", name: "Kauai Buoy 51005", lat: 21.67, lng: -158.12 },
  { id: "51026", name: "Hawaii Buoy 51026", lat: 0, lng: 0 },
  { id: "51027", name: "Hawaii Buoy 51027", lat: 0, lng: 0 },
  { id: "51028", name: "Hawaii Buoy 51028", lat: 0, lng: 0 },
  { id: "51100", name: "Hawaii Buoy 51100", lat: 0, lng: 0 },
  { id: "51101", name: "Hawaii Buoy 51101", lat: 0, lng: 0 },
  { id: "51406", name: "Hawaii Buoy 51406", lat: 0, lng: 0 },
  { id: "51407", name: "Hawaii Buoy 51407", lat: 0, lng: 0 },
  { id: "51425", name: "Hawaii Buoy 51425", lat: 0, lng: 0 },
  { id: "51426", name: "Hawaii Buoy 51426", lat: 0, lng: 0 },
  { id: "51542", name: "Hawaii Buoy 51542", lat: 0, lng: 0 },

  // Pacific extended regions
  { id: "52009", name: "Pacific Buoy 52009", lat: 0, lng: 0 },
  { id: "52401", name: "Pacific Buoy 52401", lat: 0, lng: 0 },
  { id: "52402", name: "Pacific Buoy 52402", lat: 0, lng: 0 },
  { id: "52403", name: "Pacific Buoy 52403", lat: 0, lng: 0 },
  { id: "52404", name: "Pacific Buoy 52404", lat: 0, lng: 0 },
  { id: "52405", name: "Pacific Buoy 52405", lat: 0, lng: 0 },
  { id: "52406", name: "Pacific Buoy 52406", lat: 0, lng: 0 },
  { id: "52D06", name: "Pacific Buoy 52D06", lat: 0, lng: 0 },
  { id: "54401", name: "Pacific Buoy 54401", lat: 0, lng: 0 },

  // International and special series
  { id: "1801583", name: "International Buoy 1801583", lat: 0, lng: 0 },
  { id: "1801589", name: "International Buoy 1801589", lat: 0, lng: 0 },
  { id: "1801593", name: "International Buoy 1801593", lat: 0, lng: 0 },
  { id: "21413", name: "Buoy 21413", lat: 0, lng: 0 },
  { id: "21414", name: "Buoy 21414", lat: 0, lng: 0 },
  { id: "21415", name: "Buoy 21415", lat: 0, lng: 0 },
  { id: "21416", name: "Buoy 21416", lat: 0, lng: 0 },
  { id: "21417", name: "Buoy 21417", lat: 0, lng: 0 },
  { id: "21418", name: "Buoy 21418", lat: 0, lng: 0 },
  { id: "21419", name: "Buoy 21419", lat: 0, lng: 0 },
  { id: "21420", name: "Buoy 21420", lat: 0, lng: 0 },
  { id: "32301", name: "Buoy 32301", lat: 0, lng: 0 },
  { id: "32302", name: "Buoy 32302", lat: 0, lng: 0 },
  { id: "32411", name: "Buoy 32411", lat: 0, lng: 0 },
  { id: "32412", name: "Buoy 32412", lat: 0, lng: 0 },
  { id: "32413", name: "Buoy 32413", lat: 0, lng: 0 },
  { id: "32D12", name: "Buoy 32D12", lat: 0, lng: 0 },
  { id: "32D13", name: "Buoy 32D13", lat: 0, lng: 0 },

  // Meteorological buoys
  { id: "91204", name: "Meteorological Buoy 91204", lat: 0, lng: 0 },
  { id: "91222", name: "Meteorological Buoy 91222", lat: 0, lng: 0 },
  { id: "91251", name: "Meteorological Buoy 91251", lat: 0, lng: 0 },
  { id: "91328", name: "Meteorological Buoy 91328", lat: 0, lng: 0 },
  { id: "91338", name: "Meteorological Buoy 91338", lat: 0, lng: 0 },
  { id: "91343", name: "Meteorological Buoy 91343", lat: 0, lng: 0 },
  { id: "91352", name: "Meteorological Buoy 91352", lat: 0, lng: 0 },
  { id: "91355", name: "Meteorological Buoy 91355", lat: 0, lng: 0 },
  { id: "91356", name: "Meteorological Buoy 91356", lat: 0, lng: 0 },
  { id: "91365", name: "Meteorological Buoy 91365", lat: 0, lng: 0 },
  { id: "91374", name: "Meteorological Buoy 91374", lat: 0, lng: 0 },
  { id: "91377", name: "Meteorological Buoy 91377", lat: 0, lng: 0 },
  { id: "91411", name: "Meteorological Buoy 91411", lat: 0, lng: 0 },
  { id: "91442", name: "Meteorological Buoy 91442", lat: 0, lng: 0 },

  // Coastal and harbor stations (alphanumeric IDs)
  { id: "ABAN6", name: "Albany NY Station", lat: 0, lng: 0 },
  { id: "ALRF1", name: "Alligator Reef FL Station", lat: 0, lng: 0 },
  { id: "ALSN6", name: "Ambrose Light NY Station", lat: 0, lng: 0 },
  { id: "AMAA2", name: "Anchorage AK Station", lat: 0, lng: 0 },
  { id: "AUGA2", name: "Augustine Island AK Station", lat: 0, lng: 0 },
  { id: "BLIA2", name: "Bligh Island AK Station", lat: 0, lng: 0 },
  { id: "BURL1", name: "Burwood LA Station", lat: 0, lng: 0 },
  { id: "BUSL1", name: "Buras LA Station", lat: 0, lng: 0 },
  { id: "BUZM3", name: "Buzzards Bay MA Station", lat: 0, lng: 0 },
  { id: "CARO3", name: "Cape Arago OR Station", lat: 0, lng: 0 },
  { id: "CDRF1", name: "Cedar Key FL Station", lat: 0, lng: 0 },
  { id: "CHLV2", name: "Chesapeake Light VA Station", lat: 0, lng: 0 },
  { id: "CLKN7", name: "Cape Lookout NC Station", lat: 0, lng: 0 },
  { id: "CSBF1", name: "Cosgrove Shoal FL Station", lat: 0, lng: 0 },
  { id: "DBLN6", name: "Dunkirk NY Station", lat: 0, lng: 0 },
  { id: "DESW1", name: "Destruction Island WA Station", lat: 0, lng: 0 },
  { id: "DISW3", name: "Devils Island WI Station", lat: 0, lng: 0 },
  { id: "DPIA1", name: "Dauphin Island AL Station", lat: 0, lng: 0 },
  { id: "DRFA2", name: "Drift River AK Station", lat: 0, lng: 0 },
  { id: "DRYF1", name: "Dry Tortugas FL Station", lat: 0, lng: 0 },
  { id: "DSLN7", name: "Diamond Shoals NC Station", lat: 0, lng: 0 },
  { id: "DUCN7", name: "Duck NC Station", lat: 0, lng: 0 },
  { id: "EB01", name: "Elkhorn Slough CA Station 01", lat: 0, lng: 0 },
  { id: "EB10", name: "Elkhorn Slough CA Station 10", lat: 0, lng: 0 },
  { id: "EB31", name: "Elkhorn Slough CA Station 31", lat: 0, lng: 0 },
  { id: "EB32", name: "Elkhorn Slough CA Station 32", lat: 0, lng: 0 },
  { id: "EB33", name: "Elkhorn Slough CA Station 33", lat: 0, lng: 0 },
  { id: "EB35", name: "Elkhorn Slough CA Station 35", lat: 0, lng: 0 },
  { id: "EB36", name: "Elkhorn Slough CA Station 36", lat: 0, lng: 0 },
  { id: "EB43", name: "Elkhorn Slough CA Station 43", lat: 0, lng: 0 },
  { id: "EB52", name: "Elkhorn Slough CA Station 52", lat: 0, lng: 0 },
  { id: "EB53", name: "Elkhorn Slough CA Station 53", lat: 0, lng: 0 },
  { id: "EB61", name: "Elkhorn Slough CA Station 61", lat: 0, lng: 0 },
  { id: "EB62", name: "Elkhorn Slough CA Station 62", lat: 0, lng: 0 },
  { id: "EB70", name: "Elkhorn Slough CA Station 70", lat: 0, lng: 0 },
  { id: "EB90", name: "Elkhorn Slough CA Station 90", lat: 0, lng: 0 },
  { id: "EB91", name: "Elkhorn Slough CA Station 91", lat: 0, lng: 0 },
  { id: "EB92", name: "Elkhorn Slough CA Station 92", lat: 0, lng: 0 },
  { id: "FARP2", name: "Farallon Islands PR Station", lat: 0, lng: 0 },
  { id: "FBIS1", name: "Folly Beach SC Station", lat: 0, lng: 0 },
  { id: "FFIA2", name: "Five Finger AK Station", lat: 0, lng: 0 },
  { id: "FILA2", name: "Fire Island AK Station", lat: 0, lng: 0 },
  { id: "FPSN7", name: "Frying Pan NC Station", lat: 0, lng: 0 },
  { id: "FWYF1", name: "Fowey Rocks FL Station", lat: 0, lng: 0 },
  { id: "GBCL1", name: "Grand Bay LA Station", lat: 0, lng: 0 },
  { id: "GDIL1", name: "Grand Isle LA Station", lat: 0, lng: 0 },
  { id: "GLLN6", name: "Galloo Island NY Station", lat: 0, lng: 0 },
  { id: "IOSN3", name: "Isle of Shoals NH Station", lat: 0, lng: 0 },
  { id: "KTNF1", name: "Key West FL Station", lat: 0, lng: 0 },
  { id: "LNEL1", name: "Lake Pontchartrain LA Station", lat: 0, lng: 0 },
  { id: "LONF1", name: "Long Key FL Station", lat: 0, lng: 0 },
  { id: "LPOI1", name: "Lake Pend Oreille ID Station", lat: 0, lng: 0 },
  { id: "MDRM1", name: "Mount Desert Rock ME Station", lat: 0, lng: 0 },
  { id: "MISM1", name: "Matinicus Rock ME Station", lat: 0, lng: 0 },
  { id: "MLRF1", name: "Molasses Reef FL Station", lat: 0, lng: 0 },
  { id: "MPCL1", name: "Mandeville LA Station", lat: 0, lng: 0 },
  { id: "MRKA2", name: "Middleton Island AK Station", lat: 0, lng: 0 },
  { id: "NWPO3", name: "Newport OR Station", lat: 0, lng: 0 },
  { id: "PILA2", name: "Pilot Station AK Station", lat: 0, lng: 0 },
  { id: "PILM4", name: "Pilot Station MI Station", lat: 0, lng: 0 },
  { id: "PLSF1", name: "Plantation Key FL Station", lat: 0, lng: 0 },
  { id: "POTA2", name: "Potato Point AK Station", lat: 0, lng: 0 },
  { id: "PTAC1", name: "Point Arena CA Station", lat: 0, lng: 0 },
  { id: "PTAT2", name: "Port Arthur TX Station", lat: 0, lng: 0 },
  { id: "PTGC1", name: "Point Reyes CA Station", lat: 0, lng: 0 },
  { id: "ROAM4", name: "Rock of Ages MI Station", lat: 0, lng: 0 },
  { id: "SANF1", name: "Sand Key FL Station", lat: 0, lng: 0 },
  { id: "SAUF1", name: "Saddlebunch Keys FL Station", lat: 0, lng: 0 },
  { id: "SBIO1", name: "South Bass Island OH Station", lat: 0, lng: 0 },
  { id: "SGNW3", name: "Sheboygan WI Station", lat: 0, lng: 0 },
  { id: "SGOF1", name: "Saint George FL Station", lat: 0, lng: 0 },
  { id: "SISW1", name: "Smith Island WA Station", lat: 0, lng: 0 },
  { id: "SJLF1", name: "Saint Johns Light FL Station", lat: 0, lng: 0 },
  { id: "SMKF1", name: "Sombrero Key FL Station", lat: 0, lng: 0 },
  { id: "SPGF1", name: "Settlement Point FL Station", lat: 0, lng: 0 },
  { id: "SRST2", name: "Sabine Pass TX Station", lat: 0, lng: 0 },
  { id: "STDM4", name: "Stannard Rock MI Station", lat: 0, lng: 0 },
  { id: "SUPN6", name: "Superior Shoal NY Station", lat: 0, lng: 0 },
  { id: "SVLS1", name: "Springmaid Pier SC Station", lat: 0, lng: 0 },
  { id: "THIN6", name: "Thousand Island NY Station", lat: 0, lng: 0 },
  { id: "TPLM2", name: "Thomas Point MD Station", lat: 0, lng: 0 },
  { id: "TTIW1", name: "Tatoosh Island WA Station", lat: 0, lng: 0 },
  { id: "VENF1", name: "Venice FL Station", lat: 0, lng: 0 },
  { id: "WPOW1", name: "West Point WA Station", lat: 0, lng: 0 },
];

const parseNOAAValue = (value: string): number => {
  if (value === "MM" || value === "" || isNaN(parseFloat(value))) {
    return 0;
  }
  return parseFloat(value);
};

const fetchBuoyDataFromNOAA = async (
  buoyId: string,
): Promise<{ info: BuoyData; history: BuoyTimeSeriesData[] } | null> => {
  const buoyConfig = AVAILABLE_BUOYS.find((b) => b.id === buoyId);
  if (!buoyConfig) return null;

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

      if (lines.length === 0) {
        throw new Error("No data found in response");
      }

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
  lines.forEach((line, index) => {
    const values = line.trim().split(/\s+/);
    if (values.length < 15) return; // Skip malformed lines

    const [year, month, day, hour, minute, , wspd, , wvht, , , , pres, , wtmp] =
      values;

    // Validate essential values
    if (!year || !month || !day || !hour || !minute) return;

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

  if (latestReading) {
    return {
      info: latestReading,
      history: history.slice(-50), // Keep last 50 readings
    };
  }

  return null;
};

export const useBuoyData = () => {
  const [groupedData, setGroupedData] = useState<GroupedBuoyData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchBuoyData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const grouped: GroupedBuoyData = {};
      let successfulFetches = 0;

      // Try to fetch data for each available buoy
      const fetchPromises = AVAILABLE_BUOYS.map(async (buoy) => {
        const data = await fetchBuoyDataFromNOAA(buoy.id);
        if (data) {
          grouped[buoy.id] = data;
          successfulFetches++;
        }
      });

      await Promise.all(fetchPromises);

      if (successfulFetches === 0) {
        throw new Error(
          "Unable to fetch data from any buoys. This may be due to:\n" +
            "• CORS restrictions from NOAA NDBC servers\n" +
            "• Network connectivity issues\n" +
            "• Proxy server configuration problems\n" +
            "• Selected stations may not have recent data (NOAA provides last 45 days)\n" +
            "• Station IDs may be inactive or incorrect\n\n" +
            "NOAA Data Info:\n" +
            "• Files are named STATION_ID.txt (uppercase required)\n" +
            "• Data source: https://www.ndbc.noaa.gov/data/realtime2/\n" +
            "• The app tries multiple fetch methods including proxy servers",
        );
      }

      console.log(
        `Successfully loaded data for ${successfulFetches} of ${AVAILABLE_BUOYS.length} buoys`,
      );
      setGroupedData(grouped);
      setLastUpdate(new Date());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch buoy data",
      );
      console.error("Error fetching buoy data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on mount and set up interval for updates every 10 minutes
  useEffect(() => {
    fetchBuoyData();

    const interval = setInterval(fetchBuoyData, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [fetchBuoyData]);

  const getBuoyList = useCallback(() => {
    return Object.keys(groupedData).map((buoyId) => ({
      id: buoyId,
      name: groupedData[buoyId].info.name,
    }));
  }, [groupedData]);

  const getBuoyData = useCallback(
    (buoyId: string) => {
      return groupedData[buoyId] || null;
    },
    [groupedData],
  );

  // Get all available buoys (not just loaded ones)
  const getAllAvailableBuoys = useCallback(() => {
    return AVAILABLE_BUOYS.map((buoy) => ({
      id: buoy.id,
      name: buoy.name,
    }));
  }, []);

  return {
    groupedData,
    loading,
    error,
    lastUpdate,
    getBuoyList,
    getBuoyData,
    getAllAvailableBuoys,
    refetch: fetchBuoyData,
  };
};
