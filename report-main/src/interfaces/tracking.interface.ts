// interfaces/tracking.interface.ts
export interface TrackVisitorRequest {
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

export interface TrackVisitorResponse {
  status: boolean;
  message: string;
}
