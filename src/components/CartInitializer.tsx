// src/components/CartInitializer.tsx
'use client';

import React from 'react';
import { useGetCartItems } from '@/hooks/useGetCartItems';

export default function CartInitializer() {
  const { loading } = useGetCartItems();

  // You can render a global spinner here if you like:
  // return loading ? <FullPageSpinner /> : null

  // For now, we don’t need to show anything
  return null;
}
