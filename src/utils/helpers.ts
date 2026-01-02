// src/utils/helpers.ts
import type { Timeout } from 'node:timers';

// ==================== FILE UTILITIES ====================

/**
 * Generate a thumbnail SVG for uploaded files
 * @param fileName - Name of the file
 * @param fileType - Type of file (pdf or ppt)
  let timeout: Timeout;
 */
export const generateThumbnail = (fileName: string, fileType: 'pdf' | 'ppt'): string => {
  const color = fileType === 'pdf' ? '%234F46E5' : '%23F59E0B';
  const displayName = encodeURIComponent(fileName.substring(0, 15));
  
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="250"%3E%3Crect fill="${color}" width="200" height="250"/%3E%3Ctext x="50%25" y="40%25" font-size="18" fill="white" text-anchor="middle"%3E${displayName}%3C/text%3E%3Ctext x="50%25" y="60%25" font-size="14" fill="white" text-anchor="middle"%3E${fileType.toUpperCase()}%3C/text%3E%3C/svg%3E`;
};

/**
 * Determine file type from File object
 * @param file - File object
 * @returns 'pdf' or 'ppt'
 */
export const getFileType = (file: File): 'pdf' | 'ppt' => {
  return file.type.includes('pdf') ? 'pdf' : 'ppt';
};

/**
 * Validate if file type is allowed
 * @param file - File object to validate
 * @returns boolean indicating if file is valid
 */
export const isValidFileType = (file: File): boolean => {
  const validTypes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];
  return validTypes.includes(file.type);
};

/**
 * Format file size to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// ==================== DATE UTILITIES ====================

/**
 * Format date to YYYY-MM-DD
 * @param date - Date object or string
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param date - Date object or string
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(d);
};

/**
 * Format date to full readable format
 * @param date - Date object or string
 * @returns Formatted string (e.g., "December 22, 2024")
 */
export const formatFullDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// ==================== STRING UTILITIES ====================

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to slug format
 * @param str - String to convert
 * @returns Slug string (lowercase, hyphenated)
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ==================== NUMBER UTILITIES ====================

/**
 * Generate random number of pages for notes
 * @returns Random number between 10 and 60
 */
export const generateRandomPages = (): number => {
  return Math.floor(Math.random() * 50) + 10;
};

/**
 * Format number with commas
 * @param num - Number to format
 * @returns Formatted string (e.g., "1,234")
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Clamp number between min and max
 * @param num - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

// ==================== VALIDATION UTILITIES ====================

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - Password string to validate
 * @returns Object with isValid and message
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain lowercase letter' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain number' };
  }
  return { isValid: true, message: 'Password is strong' };
};

// ==================== ARRAY UTILITIES ====================

/**
 * Remove duplicates from array
 * @param arr - Array with potential duplicates
 * @returns Array with unique values
 */
export const removeDuplicates = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * Group array by key
 * @param arr - Array to group
 * @param key - Key to group by
 * @returns Object with grouped arrays
 */
export const groupBy = <T extends Record<string, any>>(
  arr: T[], 
  key: keyof T
): Record<string, T[]> => {
  return arr.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Shuffle array randomly
 * @param arr - Array to shuffle
 * @returns Shuffled array
 */
export const shuffleArray = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ==================== LOCAL STORAGE UTILITIES ====================

/**
 * Save data to localStorage with JSON stringify
 * @param key - Storage key
 * @param value - Value to store
 */
export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage with JSON parse
 * @param key - Storage key
 * @returns Parsed value or null
 */
export const getFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

/**
 * Remove item from localStorage
 * @param key - Storage key
 */
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// ==================== DEBOUNCE UTILITY ====================

/**
 * Debounce function to limit rate of execution
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// ==================== COLOR UTILITIES ====================

/**
 * Generate random color
 * @returns Random hex color string
 */
export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Get contrasting text color for background
 * @param hexColor - Background color in hex
 * @returns 'black' or 'white'
 */
export const getContrastColor = (hexColor: string): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'black' : 'white';
};

// ==================== DOWNLOAD UTILITY ====================

/**
 * Trigger file download in browser
 * @param url - File URL
 * @param filename - Filename for download
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
