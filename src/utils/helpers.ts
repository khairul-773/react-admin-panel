/**
 * Utility functions for common operations
 */

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param symbol - Currency symbol (default: ৳)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, symbol = '৳'): string => {
  return `${symbol}${amount.toLocaleString()}`;
};

/**
 * Formats a date string
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  } catch {
    return dateString;
  }
};

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add when truncated (default: ...)
 * @returns Truncated text
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix = '...'
): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
};

/**
 * Debounce function to limit function execution rate
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Generates a unique ID
 * @returns Unique ID string
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns True if empty, false otherwise
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Deep clones an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export const deepClone = <T>(obj: T): T => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch {
    return obj;
  }
};

/**
 * Safely parses JSON
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export const safeJsonParse = <T>(
  jsonString: string,
  fallback: T
): T => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a random number between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Delays execution for a specified time
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
