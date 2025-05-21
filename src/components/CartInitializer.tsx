// src/components/CartInitializer.tsx
'use client';

import { useGetCartItems } from '@/hooks/useGetCartItems';

export default function CartInitializer() {
  const {} = useGetCartItems();

  // You can render a global spinner here if you like:
  // return loading ? <FullPageSpinner /> : null

  // For now, we don’t need to show anything
  return null;
}
