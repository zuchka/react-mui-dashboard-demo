/**
 * Utility functions for formatting buoy data values
 * Handles displaying "N/A" for invalid or missing data
 */

/**
 * Checks if a value is a valid number for display purposes
 */
export const isValidNumber = (
  value: number | null | undefined,
): value is number => {
  return (
    typeof value === "number" && !isNaN(value) && isFinite(value) && value > 0
  );
};

/**
 * Formats temperature values
 * @param value - Temperature value in Celsius
 * @param precision - Number of decimal places (default: 1)
 * @returns Formatted string with unit or "N/A"
 */
export const formatTemperature = (
  value: number | null | undefined,
  precision: number = 1,
): string => {
  if (!isValidNumber(value)) {
    return "N/A";
  }
  return `${value.toFixed(precision)}°C`;
};

/**
 * Formats wave height values
 * @param value - Wave height value in meters
 * @param precision - Number of decimal places (default: 1)
 * @returns Formatted string with unit or "N/A"
 */
export const formatWaveHeight = (
  value: number | null | undefined,
  precision: number = 1,
): string => {
  if (!isValidNumber(value)) {
    return "N/A";
  }
  return `${value.toFixed(precision)}m`;
};

/**
 * Formats wind speed values
 * @param value - Wind speed value in m/s
 * @param precision - Number of decimal places (default: 1)
 * @returns Formatted string with unit or "N/A"
 */
export const formatWindSpeed = (
  value: number | null | undefined,
  precision: number = 1,
): string => {
  if (!isValidNumber(value)) {
    return "N/A";
  }
  return `${value.toFixed(precision)} m/s`;
};

/**
 * Formats pressure values
 * @param value - Pressure value in hPa
 * @param precision - Number of decimal places (default: 1)
 * @returns Formatted string with unit or "N/A"
 */
export const formatPressure = (
  value: number | null | undefined,
  precision: number = 1,
): string => {
  if (!isValidNumber(value)) {
    return "N/A";
  }
  return `${value.toFixed(precision)} hPa`;
};

/**
 * Gets the raw value or null for invalid numbers
 * This is useful for chart data where we want to exclude invalid points
 */
export const getValidValueOrNull = (
  value: number | null | undefined,
): number | null => {
  return isValidNumber(value) ? value : null;
};

/**
 * Gets display value for charts - returns 0 for invalid values since most charts need numbers
 * Use this when you need to maintain chart structure but want to handle display separately
 */
export const getChartValue = (value: number | null | undefined): number => {
  return isValidNumber(value) ? value : 0;
};

/**
 * Formats any numeric value with appropriate N/A handling
 * @param value - Numeric value
 * @param precision - Number of decimal places (default: 1)
 * @param unit - Optional unit string
 * @returns Formatted string or "N/A"
 */
export const formatNumericValue = (
  value: number | null | undefined,
  precision: number = 1,
  unit?: string,
): string => {
  if (!isValidNumber(value)) {
    return "N/A";
  }
  const formattedValue = value.toFixed(precision);
  return unit ? `${formattedValue} ${unit}` : formattedValue;
};
