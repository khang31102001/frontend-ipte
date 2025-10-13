// src/api/http.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./token";

// --- Base URL: ưu tiên Vite env, fallback localhost ---
const baseURL =
  // import.meta.env?.VITE_API_URL ||
  // process.env?.REACT_APP_API_BASE_URL ||
  "http://localhost:4000/api";

// --- Axios instance ---
const http = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true, // để cookie HttpOnly (refresh) đi kèm khi gọi /auth/refresh
  headers: { "Content-Type": "application/json" },
});

// ===================== Refresh queue =====================
let isRefreshing = false;
let subscribers: Array<(token: string | null) => void> = [];

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  subscribers.push(cb);
}
function onRrefreshed(token: string | null) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

// ===================== Request: attach Bearer =====================
http.interceptors.request.use((config) => {
  // const token = getAccessToken();
  // if (token && config.headers) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// ===================== Response: handle 401 + refresh =====================
http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status ?? 0;
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Nếu không phải 401, hoặc đã retry rồi, ném lỗi luôn
    if (status !== 401 || original?._retry) {
      throw error;
    }

    // Tránh tự refresh lặp vô hạn khi /auth/refresh cũng 401
    const isRefreshUrl = original?.url?.includes("/auth/refresh");
    if (isRefreshUrl) {
      clearAccessToken();
      throw error;
    }

    // Đánh dấu để không vào lại nhánh 401 của request này
    original._retry = true;

    // Nếu đang refresh: chờ tới lượt
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          if (!newToken) return reject(error);
          if (original.headers) {
            original.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(http(original));
        });
      });
    }

    // Bắt đầu refresh
    isRefreshing = true;

    try {
      // Gọi refresh token (cookie HttpOnly 'rt' đi kèm do withCredentials: true)
      const { data } = await axios.post(
        `${baseURL}/auth/refresh`,
        {},
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      // Giả định BE trả về { access_token: string }
      const newToken = (data as any)?.access_token as string | undefined;

      if (!newToken) {
        // Không có token mới -> coi như fail
        clearAccessToken();
        onRrefreshed(null);
        throw error;
      }

      // Lưu token mới
      setAccessToken(newToken);

      // Báo cho các request đang đợi
      onRrefreshed(newToken);
      // Set lại cờ
      isRefreshing = false;

      // Retry request ban đầu
      if (original.headers) {
        original.headers.Authorization = `Bearer ${newToken}`;
      }
      return http(original);
    } catch (e) {
      // Refresh fail: xoá token, đánh thức hàng đợi với null
      clearAccessToken();
      onRrefreshed(null);
      isRefreshing = false;
      throw error;
    }
  }
);

export default http;
