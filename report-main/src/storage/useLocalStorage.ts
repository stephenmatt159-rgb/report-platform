/* eslint-disable @typescript-eslint/no-explicit-any */
type User = any;

type LocalStorageMap = {
  token: string;
  user: User;
  theme?: 'light' | 'dark';
  lastActive?: number; // timestamp
};

type localStorageKeys = keyof LocalStorageMap;

export const getLocalStorageInformation = () => {
  if (typeof window === 'undefined') return null;
  return localStorage;
};

export const setLocalItem = <K extends localStorageKeys>(
  key: K,
  value: LocalStorageMap[K]
) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = <K extends localStorageKeys>(
  key: K
): LocalStorageMap[K] | null => {
  if (typeof window === 'undefined') return null;

  const data = localStorage.getItem(key);
  try {
    return data ? (JSON.parse(data) as LocalStorageMap[K]) : null;
  } catch (err) {
    console.error('Error parsing localStorage data:', err);
    return null;
  }
};

export const clearLocalData = <K extends localStorageKeys>(key: K) => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  localStorage.clear();
};

export const updateLastActive = () => {
  setLocalItem('lastActive', Date.now());
};

export const isTokenExpired = (expiryTimestamp?: number) => {
  if (!expiryTimestamp) return true;
  return Date.now() > expiryTimestamp;
};

// for ever syncing storages
export const syncSessionToLocal = () => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');

  if (token) localStorage.setItem('token', token);
  if (user) localStorage.setItem('user', user);
};

export const token = getLocalItem('token');
