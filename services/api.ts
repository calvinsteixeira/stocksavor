import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export interface ApiResponse<T = any> {
  hasError: boolean;
  status: number;
  message: string;
  data: T[]
}



