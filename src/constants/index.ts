/**
 * Application Constants
 * Centralized configuration values and magic numbers
 */

/**
 * Pagination constants
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100] as const,
  MAX_VISIBLE_PAGES: 5,
} as const;

/**
 * Form validation constants
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_PRODUCT_NAME_LENGTH: 3,
  MIN_POST_TITLE_LENGTH: 5,
  MIN_POST_BODY_LENGTH: 10,
  MIN_NAME_LENGTH: 2,
  MAX_SHORT_NAME_LENGTH: 10,
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebarOpen',
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  POSTS: 'posts',
  PHOTOS: 'photos',
  USERS: 'users',
  COMMENTS: 'comments',
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

/**
 * Animation/transition durations (ms)
 */
export const DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  API_SIMULATION_DELAY: 1000,
} as const;

/**
 * HTTP Status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Route paths
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  POSTS: {
    ADD: '/posts/add',
    ALL: '/posts/all',
  },
  PRODUCTS: {
    ADD: '/products/add',
    ALL: '/products/all',
    CATEGORY: '/products/category',
    BRAND: '/products/brand',
    UNIT: '/products/unit',
    BARCODE: '/products/barcode',
  },
} as const;

/**
 * Default product categories
 */
export const DEFAULT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Food',
  'Books',
  'Sports',
  'Toys',
] as const;

/**
 * Default product brands
 */
export const DEFAULT_BRANDS = [
  'Samsung',
  'Nike',
  'Sony',
  'Apple',
  'Adidas',
  'Dell',
  'HP',
  'Canon',
  'LG',
  'Puma',
] as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  AUTH: {
    REQUIRED_FIELDS: 'Email and password are required',
    INVALID_CREDENTIALS: 'Invalid credentials',
    LOGIN_FAILED: 'Login failed',
    REGISTER_FAILED: 'Registration failed',
    UNAUTHORIZED: 'You are not authorized to access this resource',
  },
  NETWORK: {
    GENERIC: 'An unexpected error occurred',
    TIMEOUT: 'Request timeout. Please try again.',
    NO_CONNECTION: 'No internet connection',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Invalid email format',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  },
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Product added successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  CATEGORY_ADDED: 'Category added successfully',
  CATEGORY_DELETED: 'Category deleted successfully',
  BRAND_ADDED: 'Brand added successfully',
  BRAND_DELETED: 'Brand deleted successfully',
  UNIT_ADDED: 'Unit added successfully',
  UNIT_DELETED: 'Unit deleted successfully',
  POST_ADDED: 'Post added successfully',
  POST_UPDATED: 'Post updated successfully',
  POST_DELETED: 'Post deleted successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful',
} as const;

/**
 * Table configuration
 */
export const TABLE_CONFIG = {
  EMPTY_MESSAGE: 'No data found.',
  LOADING_MESSAGE: 'Loading...',
  ERROR_MESSAGE: 'Error loading data.',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this item?',
} as const;

/**
 * Currency symbol
 */
export const CURRENCY_SYMBOL = '৳' as const;

/**
 * Date format
 */
export const DATE_FORMAT = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'yyyy-MM-dd HH:mm:ss',
} as const;
