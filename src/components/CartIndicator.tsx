import React from 'react';
import { CartOutline } from './icons/CartOutline';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';

const CartIndicator = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart">
      <div className="relative cursor-pointer">
        {cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-mainOrange text-mainWhite text-xs rounded-full w-5 h-5 flex items-center justify-center">
            <span>{totalItems}</span>
          </div>
        )}
        <CartOutline />
      </div>
    </Link>
  );
};

export default CartIndicator;
