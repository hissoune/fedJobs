import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearAuthToken, clearRefreshToken, getAuthToken, getRefreshToken, saveAuthToken, saveRefreshToken } from "../helpers/storage";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

interface ApiErrorResponse {
  message: string;
  code?: number;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

const baseURL = process.env.EXPO_BASE_URL|| "http://192.168.1.58:3000";


export function isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
  return axios.isAxiosError(error);
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});


let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};


axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
   
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
      console.log("ax err ",status);
      console.log("ax err ",error);
      console.log("ax err ",originalRequest._retry);
      
    if (status === 401 && !originalRequest._retry) {
      console.log("u r here ifffffff");
      
      originalRequest._retry = true;

      if (isRefreshing) {
        console.log("okay u r here ");
        
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers = { ...originalRequest.headers, Authorization: `Bearer ${token}` };
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      const refreshToken = await getRefreshToken();
      console.log("fhfjhfjhfjhfj",refreshToken);
      
      if (!refreshToken) {
        await clearAuthToken();
        await clearRefreshToken();
        return Promise.reject(error);
      }

      try {
  console.log('🔥 BEFORE REFRESH REQUEST');

  const response = await axios.post(
    `${baseURL}/auth/refresh`,
    { refreshToken }
  );

  console.log('🔥 AFTER REFRESH REQUEST');
  console.log('🔥 STATUS:', response.status);
  console.log('🔥 DATA:', response.data);

 await saveAuthToken(response.data.accessToken)
 await saveRefreshToken(response.data.refreshToken)
    originalRequest.headers = {
      ...originalRequest.headers,
      Authorization: `Bearer ${response.data.accessToken}`,
    };

return axiosInstance(originalRequest);
} catch (err) {
  console.log('🔥🔥 REFRESH FAILED:', err);
  console.log('🔥🔥 RESPONSE:', (err as AxiosError).response?.data);
  console.log('🔥🔥 STATUS:', (err as AxiosError).response?.status);

  processQueue(err, null);

  await clearAuthToken();
  await clearRefreshToken();

  return Promise.reject(err);
}
    }
     if (!error.response) {
      console.error("Server is unreachable");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;


