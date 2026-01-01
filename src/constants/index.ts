// src/constants/index.ts

export const INITIAL_CREDITS = 5;

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];

export const FILE_TYPE_EXTENSIONS = {
  pdf: ['.pdf'],
  ppt: ['.ppt', '.pptx']
};

export const ROUTES = {
  HOME: '/',
  BROWSE: '/browse',
  UPLOAD: '/upload',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register'
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me'
  },
  UNIVERSITIES: '/universities',
  NOTES: {
    BASE: '/notes',
    UPLOAD: '/notes/upload',
    DOWNLOAD: (id: string) => `/notes/${id}/download`,
    DELETE: (id: string) => `/notes/${id}`
  },
  USER: {
    UPLOADS: '/user/uploads',
    DOWNLOADS: '/user/downloads'
  },
  STATS: '/stats'
};

export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'Please upload a PDF or PowerPoint file',
  FILE_TOO_LARGE: 'File size exceeds 50MB limit',
  INSUFFICIENT_CREDITS: 'Insufficient credits. Upload notes to earn more!',
  LOGIN_REQUIRED: 'Please login to continue',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again.'
};

export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: 'Notes uploaded successfully!',
  DOWNLOAD_SUCCESS: 'Download successful!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGIN_SUCCESS: 'Login successful!'
};
