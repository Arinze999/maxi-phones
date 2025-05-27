// app/products/page.tsx

import React from 'react';
import ProductsClient from './ProductsClient';
import { Suspense } from 'react';

export default function ProductsPage() {
  return (
    <Suspense fallback="Loading....">
      <ProductsClient />
    </Suspense>
  );
}
