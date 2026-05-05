const saveToCookie = (key: string, value: unknown, noExpire?: boolean) => {
  if (typeof document !== 'undefined') {
    // Set a cookie with an expiration time
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 6 * 60 * 60 * 1000);

    if (noExpire) {
      document.cookie = `${key}=${value};path=/`;
    } else {
      document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
    }
  }
};

const getFromCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split('=');
      if (cookieKey === key) {
        return cookieValue;
      }
    }
    return null;
  }
};

const clearCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1270 00:00:00 GMT;path=/`;
  }
};

const clearAllCookies = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieKey] = cookie.split('=');
      document.cookie = `${cookieKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
};

export const cookieStorage = {
  set: saveToCookie,
  get: getFromCookie,
  clear: clearCookie,
  clearAll: clearAllCookies,
};
