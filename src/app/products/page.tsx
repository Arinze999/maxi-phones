'use client';

import ProductCard from '@/components/cards/ProductCard';
import LoadingScreen from '@/components/LoadingScreen';
import { products } from '@/db/products';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import { useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';

const ProductsPage = () => {
  const session = useAppSelector((state) => state.auth.session);
  const userId = session?.user.id;

  const { loading, onRefreshSession } = useRefreshSession();
  const { loading: layoutloading, getLayoutLoadingData } = useLayoutLoading();

  const [load, setLoad] = useState(true);

  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }

    // eslint-disable-next-line
  }, [userId, loading]);

  async function allReady() {
    // replace these with your real async checks
    const checkAuth = () => Promise.resolve(loading);
    const loadLayout = () => Promise.resolve(layoutloading);

    // run them in parallel
    const results = await Promise.all([checkAuth(), loadLayout()]);

    // only true if every result is truthy
    return results.every(Boolean);
  }

  useEffect(() => {
    allReady().then((ok) => {
      setLoad(false);
      console.log('All checks passed, ready to render:', ok);
      if (!ok) {
        console.error('Not all checks passed, something went wrong.');
      }
    });
    // eslint-disable-next-line
  }, []);

  if (load) {
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
              categories={item.categories}
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
