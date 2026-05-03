import { formatDate } from './format-date';

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  vendor: string;
  language: string;
  languages: string[];
  timezone: string;
  screen: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  hardware?: {
    memoryGB?: number;
    cpuCores?: number;
  };
  network?: {
    type?: string;
    downlink?: number;
    rtt?: number;
  };
  page: {
    url: string;
    path: string;
    referrer: string;
  };
  timestamp: string;
}

export function getDeviceInfo(): DeviceInfo | null {
  if (typeof window === 'undefined') return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;
  // console.log(nav);
  // console.log(window.location);
  // console.log(document.referrer);
  // console.log(document);
  // console.log(nav.connection);

  return {
    page: {
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer || 'direct',
    },
    timestamp: formatDate(new Date(), 'hh:mm A | Do MMMM, YYYY'),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    userAgent: nav.userAgent ?? '',
    platform: nav.platform ?? '',
    vendor: nav.vendor ?? '',
    language: nav.language ?? '',
    languages: nav.languages ?? [],

    screen: {
      width: screen.width,
      height: screen.height,
      pixelRatio: window.devicePixelRatio,
    },

    hardware: {
      memoryGB: nav.deviceMemory,
      cpuCores: nav.hardwareConcurrency,
    },

    network: {
      type: nav.connection?.effectiveType,
      downlink: nav.connection?.downlink,
      rtt: nav.connection?.rtt,
    },
  };
}
