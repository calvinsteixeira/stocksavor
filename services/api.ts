import axios, { InternalAxiosRequestConfig } from 'axios'

export interface ApiResponse {
  hasError: boolean;
  message: string;
  data: []
}

export const api = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export interface ApiResponse {
  hasError: boolean;
  status: number;
  message: string;
  data: []
}

// adiciona timeout nas requests para simular uma conexão real
api.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 3000);
    });
  },
  (error) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(error);
      }, 3000);
    });
  }
);



