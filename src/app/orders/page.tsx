import React from 'react';
import { Suspense } from 'react';
import OrdersClient from './OrdersClient';

const OrdersPage = () => {
  return (
    <Suspense fallback="Loading....">
      <OrdersClient />
    </Suspense>
  );
};

export default OrdersPage;
