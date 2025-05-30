import React from 'react';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { HeartOutline } from './icons/HeartOutline';

const WishListIndicator = () => {
  const wishListItems = useAppSelector((state) => state.wishList.items);

  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);

  if (!isUser) return <HeartOutline />;

  return (
    <Link href="/wishlist">
      <div className="relative cursor-pointer">
        {wishListItems.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-mainOrange text-mainWhite text-xs rounded-full w-5 h-5 flex items-center justify-center">
            <span>{wishListItems.length}</span>
          </div>
        )}
        <HeartOutline />
      </div>
    </Link>
  );
};

export default WishListIndicator;
