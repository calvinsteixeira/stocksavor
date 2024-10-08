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

