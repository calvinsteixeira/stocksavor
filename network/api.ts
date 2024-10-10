import axios from 'axios';

// Se você quiser acessar o projeto a partir de um navegador mobile porém rodar o servidor em um desktop
// basta alterar o ipv4RemoteServer para o ip da sua máquina (os dois dispositivos precisam estar na mesma rede)
const isClient = typeof window !== 'undefined';
const ipv4RemoteServer = 'http://172.27.2.49:3001/';
const isMobile = isClient && /Mobi|Android/i.test(navigator.userAgent);
const baseURL = isMobile ? ipv4RemoteServer : 'http://localhost:3001/';

export const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  async response => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return response;
  },
  async error => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  hasError: boolean;
  status: number;
  message: string;
  data: T[];
}
