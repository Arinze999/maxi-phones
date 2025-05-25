'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/cards/ProductCard';
import LoadingScreen from '@/components/LoadingScreen';
import { products, getProductsByCategory, Category } from '@/db/products';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import { useAppSelector } from '@/redux/store';

const allCategories: Category[] = [
  'phones',
  'computers',
  'gaming',
  'entertainment',
  'smart watch',
];

const ProductsPage = () => {
  const router = useRouter();
  const session = useAppSelector((s) => s.auth.session);
  const userId = session?.user.id;

  const { loading, onRefreshSession } = useRefreshSession();
  const { loading: layoutloading, getLayoutLoadingData } = useLayoutLoading();
  const [load, setLoad] = useState(true);

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;

  const displayItems = categoryParam
    ? getProductsByCategory(categoryParam)
    : products;

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
    const checkAuth = () => Promise.resolve(loading);
    const loadLayout = () => Promise.resolve(layoutloading);
    const results = await Promise.all([checkAuth(), loadLayout()]);
    return results.every(Boolean);
  }

  useEffect(() => {
    allReady().then((ok) => {
      setLoad(false);
      if (!ok) console.error('Not all checks passed.');
    });
    // eslint-disable-next-line
  }, []);

  if (load) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      {' '}
      <div className="min-h-[50rem] mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
        <h3 className="text-xl font-semibold mb-5">
          {categoryParam ? `Category: ${categoryParam}` : 'All Products'}
        </h3>

        {/* ← category selector row ↓ */}
        <div className="flex flex-wrap gap-3 mb-6">
          {allCategories.map((cat) => {
            const isActive = cat === categoryParam;
            // prettify display name: "smart watch" → "Smart Watch"
            const label = cat
              .split(' ')
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(' ');

            return (
              <button
                key={cat}
                onClick={() =>
                  router.push(
                    cat === categoryParam
                      ? '/products'
                      : `/products?category=${encodeURIComponent(cat)}`
                  )
                }
                className={`
                px-4 py-1 rounded-full text-[13px]
                transition 
                ${
                  isActive
                    ? 'bg-mainOrange text-mainWhite'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-5 items-center justify-between w-full mt-10">
          {displayItems.map((item) => (
            <React.Fragment key={item.title}>
              <ProductCard
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
              <hr className="bg-gray-200 w-full block md:hidden" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default ProductsPage;
