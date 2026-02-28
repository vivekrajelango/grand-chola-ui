import { routePath } from '@/constants/api';
import apiClient from './api';
import { AxiosRequestConfig } from 'axios';

interface LoginRequest {
    emailID?: string;
    password?: string;
}

interface LoginResponse {
    data: {
        _id: string,
        userID: string,
        emailID: string,
        role: string
    },
    error: string
  }

// Generic GET method
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Generic POST method
export const postData = async <T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<R> => {
  try {
    const response = await apiClient.post<R>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Login function using reusable POST method
export const login = async (emailID?: string, password?: string): Promise<LoginResponse> => {
    const loginData: LoginRequest = { emailID, password };
  
    try {
      const response = await postData<LoginRequest, LoginResponse>(routePath.USER_LOGIN, loginData);
      return response;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  };