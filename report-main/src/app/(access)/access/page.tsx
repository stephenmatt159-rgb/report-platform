'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { setSessionItem } from '@/storage/useSessionStorage';
import { routes } from '@/lib/routes';

export default function SetTokenPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passcode = 'FreshDeveloper';

    if (token.trim() !== passcode) {
      setError('Invalid passcode!');
      return;
    }

    // Save token
    setSessionItem('token', token);

    // Redirect safely
    router.replace(routes.dashboardOverview());
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm p-4 border rounded"
      >
        <input
          type="text"
          placeholder="Enter Pass"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setError('');
          }}
          className="border p-2 rounded "
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          disabled={token.length < 5}
          type="submit"
          className="bg-primary p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
