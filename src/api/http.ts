import api from "./axiosClient";

export type QueryParams = Record<string, any>;

function toQuery(params?: QueryParams) {
  if (!params) return "";
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    usp.append(k, String(v));
  });
  const s = usp.toString();
  return s ? `?${s}` : "";
}

/** GET */
export async function get<T>(path: string, params?: QueryParams): Promise<T> {
  const { data } = await api.get<T>(`${path}${toQuery(params)}`);
  return data;
}

/** POST (JSON) */
export async function post<T, B = any>(path: string, body?: B): Promise<T> {
  const { data } = await api.post<T>(path, body);
  return data;
}

/** PUT (JSON) */
export async function put<T, B = any>(path: string, body?: B): Promise<T> {
  const { data } = await api.put<T>(path, body);
  return data;
}

/** PATCH (JSON) */
export async function patch<T, B = any>(path: string, body?: B): Promise<T> {
  const { data } = await api.patch<T>(path, body);
  return data;
}

/** DELETE + params */
export async function httpDelete<T>(path: string, params?: QueryParams): Promise<T> {
  const { data } = await api.delete<T>(`${path}${toQuery(params)}`);
  return data;
}
