// app/error.tsx
'use client';
import { useEffect } from 'react';
import PrimaryButton from '@/components/PrimaryButton';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Log error for diagnostics
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Something broke 😢</h1>
      <p className="text-gray-600 mb-6">{error?.message}</p>
      <p className="text-gray-600 mb-6">
        Please try again or contact support if the issue persists.
      </p>
      <PrimaryButton text="Try again" onClick={reset} />
    </div>
  );
}
