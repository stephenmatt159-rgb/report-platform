'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/lib/routes';
import { getToken } from '@/storage/useSessionStorage';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace(routes.access());
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  // Prevent rendering protected content before auth check
  if (checkingAuth) return null; // or a loader component

  return <>{children}</>;
}
