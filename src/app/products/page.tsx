'use client';

import ProductCard from '@/components/cards/ProductCard';
import LoadingScreen from '@/components/LoadingScreen';
import { products } from '@/db/products';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import { useAppSelector } from '@/redux/store';
import React, { useEffect } from 'react';

const ProductsPage = () => {
  const session = useAppSelector((state) => state.auth.session);
  const userId = session?.user.id;

  const { loading, onRefreshSession } = useRefreshSession();
  const { loading: layoutloading, getLayoutLoadingData } = useLayoutLoading();

  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }

    // eslint-disable-next-line
  }, [userId, loading]);

  if (loading || layoutloading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-[50rem] mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
      <h3 className="text-xl font-semibold mb-4">Products</h3>

      <div className="flex flex-col md:flex-row flex-wrap gap-5 items-center justify-between w-full mt-10">
        {products.map((item, index) => (
          <>
            <ProductCard
              key={index}
              src={item.src}
              title={item.title}
              price={item.price}
              slashedPrice={item.slashedPrice}
              rating={item.rating}
              discountPercent={item.discountPercent}
              specs={item.specs}
              deliveryPeriod={item.deliveryPeriod}
              description={item.description}
              hover
            />
            {index !== products.length - 1 && (
              <hr className="bg-gray-200 w-full block md:hidden" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;