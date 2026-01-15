import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface AuthResponse {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
  message?: string;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = (error.response?.data as { message?: string })?.message || 'Login failed';
        throw new Error(errorMessage);
      }
      throw new Error('Login failed');
    }
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = (error.response?.data as { message?: string })?.message || 'Registration failed';
        throw new Error(errorMessage);
      }
      throw new Error('Registration failed');
    }
  },

  getUser: async (): Promise<UserResponse> => {
    try {
      const response = await apiClient.get<UserResponse>('/auth/user');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = (error.response?.data as { message?: string })?.message || 'Failed to fetch user details';
        throw new Error(errorMessage);
      }
      throw new Error('Failed to fetch user details');
    }
  },
};

