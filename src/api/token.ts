const ACCESS_TOKEN_KEY = "access_token";
const REMEMBER_ME_KEY = "remember_me"; // cờ đơn giản

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string, remember = true) {
  // Ở FE, remember chỉ là flag — thực tế dùng refresh token ở BE.
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  if (remember) localStorage.setItem(REMEMBER_ME_KEY, "1");
  else localStorage.removeItem(REMEMBER_ME_KEY);
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REMEMBER_ME_KEY);
}
