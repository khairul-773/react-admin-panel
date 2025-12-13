import axios, { AxiosResponse, AxiosError } from 'axios';

/**
 * API Configuration Constants
 */
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
} as const;

/**
 * Axios instance with default configuration
 */
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add auth token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const { token } = JSON.parse(user);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Response interceptor for global error handling
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Handles API errors and converts them to ApiError
 */
const handleApiError = (error: unknown, operation: string): never => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const message = error.response?.data?.message || error.message;
    throw new ApiError(
      `${operation}: ${message}`,
      statusCode,
      error
    );
  }
  throw new ApiError(`${operation}: An unexpected error occurred`, undefined, error);
};

/**
 * Fetches data from the API
 * @param endpoint - API endpoint
 * @param limit - Optional limit for results
 * @returns Promise with data of type T
 */
export const fetchData = async <T>(
  endpoint: string,
  limit?: number
): Promise<T> => {
  try {
    const url = limit ? `/${endpoint}?_limit=${limit}` : `/${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching data');
  }
};

/**
 * Creates new data via API
 * @param endpoint - API endpoint
 * @param data - Data to create
 * @returns Promise with created data of type T
 */
export const createData = async <T, D = unknown>(
  endpoint: string,
  data: D
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(
      `/${endpoint}`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error creating data');
  }
};

/**
 * Updates existing data via API
 * @param endpoint - API endpoint
 * @param id - ID of the resource to update
 * @param data - Data to update
 * @returns Promise with updated data of type T
 */
export const updateData = async <T, D = unknown>(
  endpoint: string,
  id: number,
  data: D
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(
      `/${endpoint}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error updating data');
  }
};

/**
 * Partially updates existing data via API
 * @param endpoint - API endpoint
 * @param id - ID of the resource to update
 * @param data - Partial data to update
 * @returns Promise with updated data of type T
 */
export const patchData = async <T, D = unknown>(
  endpoint: string,
  id: number,
  data: D
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.patch(
      `/${endpoint}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error patching data');
  }
};

/**
 * Deletes data via API
 * @param endpoint - API endpoint
 * @param id - ID of the resource to delete
 * @returns Promise that resolves when deletion is complete
 */
export const deleteData = async (
  endpoint: string,
  id: number
): Promise<void> => {
  try {
    await axiosInstance.delete(`/${endpoint}/${id}`);
  } catch (error) {
    handleApiError(error, 'Error deleting data');
  }
};

/**
 * Export axios instance for custom requests
 */
export { axiosInstance };