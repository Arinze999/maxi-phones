import { ChevronLeft12 } from '@/components/icons/ChevronLeft';
import Link from 'next/link';

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">404: Page Not Found</h1>
      <p className="text-gray-600 text-center mb-6">
        Oops—you’ve wandered off the map. Go back home?
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-mainOrange text-white rounded hover:bg-mainOrange/80 flex items-center justify-center gap-5"
      >
        <ChevronLeft12 />
        Back Home
      </Link>
    </div>
  );
}
