'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/cards/ProductCard';
import { useAppSelector } from '@/redux/store';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import LoadingScreen from '@/components/LoadingScreen';
import PrimaryButton from '@/components/PrimaryButton';
import { useAddMultipleToCart } from '@/hooks/cart/useAddMultipleToCart';
import { CartOutline } from '@/components/icons/CartOutline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WishListPage = () => {
  const session = useAppSelector((s) => s.auth.session);
  const userId = session?.user.id;
  const wishListItems = useAppSelector((state) => state.wishList.items);

  const { loading, onRefreshSession } = useRefreshSession();
  const { loading: layoutLoading, getLayoutLoadingData } = useLayoutLoading();
  const [load, setLoad] = useState(true);

  const { loading: adding, addMultipleToCart } = useAddMultipleToCart();

  const router = useRouter();

  // on mount, refresh session
  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/signin');
    }
  }, [loading, session, router]);

  // once auth is back, run layout hook
  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }
    // eslint-disable-next-line
  }, [loading, userId]);

  // when both done, mark ready
  async function allReady() {
    // replace these with your real async checks
    const checkAuth = () => Promise.resolve(loading);
    const loadLayout = () => Promise.resolve(layoutLoading);

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

  const onAddMultiple = () => {
    const itemsWithQty = wishListItems.map((p) => ({ ...p, quantity: 1 }));
    addMultipleToCart(itemsWithQty);
  };

  if (load) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-[50rem] mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
        <h3 className="text-xl font-semibold mb-5">
          Wish List{' '}
          <span className="ml-4 text-sm text-gray-400">
            {wishListItems.length}
          </span>
        </h3>
        <PrimaryButton
          text={adding ? 'Adding…' : 'Add All to Cart'}
          onClick={onAddMultiple}
          disabled={adding || wishListItems.length === 0}
          className="max-w-[12.5rem]"
          icon={<CartOutline />}
        />
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-10 items-center w-full mt-10">
        {wishListItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-gray-500">Your wishlist is empty.</p>
            <div className="flex justify-center mt-4">
              <Image
                src="/gif/emptywishlist.gif"
                alt="Empty Cart"
                width={150}
                height={150}
                unoptimized
              />
            </div>
          </div>
        ) : (
          wishListItems.map((item) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default WishListPage;
