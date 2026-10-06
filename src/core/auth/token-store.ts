/**
 * Access token chỉ nằm trong bộ nhớ của tab (không localStorage/sessionStorage) để XSS không lấy được token dài hạn.
 * Tải lại trang ⇒ lấy lại token bằng cookie refresh httpOnly.
 */
let accessToken: string | null = null;

export const getAccessToken = (): string | null => accessToken;
export const setAccessToken = (token: string): void => {
  accessToken = token;
};
export const clearAccessToken = (): void => {
  accessToken = null;
};
