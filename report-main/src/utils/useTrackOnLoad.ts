'use client';

import { useTrackVisitor } from '@/store/mutations/useTrackVisitor';
import { useEffect, useRef } from 'react';
import { getDeviceInfo } from './device-info';

export function useTrackOnLoad() {
  const { mutate } = useTrackVisitor();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    // 🚫 skip localhost
    if (window.location.hostname.includes('localhost')) return;

    hasTracked.current = true;

    const deviceInfo = getDeviceInfo();
    if (deviceInfo) {
      mutate(deviceInfo);
    }
  }, [mutate]);
}
