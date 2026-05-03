type User = any;

type SessionStorageMap = {
  token: string;
  user: User;
};

type sessionStorageKeys = keyof SessionStorageMap;

// get everything in the sessionStorage
export const getStorageInformation = () => {
  if (typeof window === 'undefined') return null;
  if (sessionStorage) return sessionStorage;
};

// setting session storage methods
export const setSessionItem = <K extends sessionStorageKeys>(
  key: K,
  value: SessionStorageMap[K],
) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(key, JSON.stringify(value));
};

// get session storage methods
export const getSessionItem = <K extends sessionStorageKeys>(
  key: K,
): SessionStorageMap[K] | null => {
  if (typeof window === 'undefined') return null;

  const data = sessionStorage.getItem(key);
  try {
    return data ? (JSON.parse(data) as SessionStorageMap[K]) : null;
  } catch (err) {
    console.error('Error parsing session data:', err);
    return null;
  }
};

//  removing sessionStorageItems = () => {}
export const clearSessionData = <K extends sessionStorageKeys>(key: K) => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(key);
};

// clear session storage
export const clearSessionStorage = () => {
  if (typeof window === 'undefined') return null;

  sessionStorage.clear();
};

export const token = getSessionItem('token');

export const getToken = () => getSessionItem('token');
