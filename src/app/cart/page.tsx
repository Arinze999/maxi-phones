'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import Image from 'next/image';
import { useAppSelector, useAppDisPatch } from '@/redux/store';
import { cartActions, CartItem } from '@/redux/slices/cartSlice';
import { useRemoveFromCart } from '@/hooks/cart/useRemoveFromCart';
import { createClient } from '../../../utils/supabase/client';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import LoadingScreen from '@/components/LoadingScreen';
import PrimaryButton from '@/components/PrimaryButton';
import Swal from 'sweetalert2';
import { BaselineCancel } from '@/components/icons/BaselineCancel';
import Link from 'next/link';
import { ChevronLeft12 } from '@/components/icons/ChevronLeft';
import { useClearCart } from '@/hooks/cart/useClearCart';
import { TrashBinOutline } from '@/components/icons/TrashIcon';
import { Product } from '@/db/products';
import { useRouter } from 'next/navigation';
import { LoadingTwotoneLoop } from '@/components/icons/LoadingLoop';

const CartPage: React.FC = () => {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const userId = session?.user.id;
  const cartItems = useAppSelector((state) => state.cart.items) as CartItem[];
  const cartTotal = useAppSelector((state) => state.cart.total);
  const [localItems, setLocalItems] = useState(cartItems);
  const [hovered, setHovered] = useState<string | null>(null);

  const router = useRouter();

  const { loading, onRefreshSession } = useRefreshSession();
  const { loading: layoutloading, getLayoutLoadingData } = useLayoutLoading();

  const { removeFromCart, loading: removing } = useRemoveFromCart();

  const { loading: clearingCart, clearCart } = useClearCart(() => console.log('Cart cleared'), true);

  const [saving, setSaving] = useState(false);

  const initialItemsRef = useRef<CartItem[]>([]);

  useEffect(() => {
    // Store a copy of the cart’s initial quantities for later comparison
    initialItemsRef.current = cartItems.map((item) => ({ ...item }));
    // Also make sure localItems matches Redux at the start
    setLocalItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }

    // eslint-disable-next-line
  }, [userId, loading]);

  useEffect(() => {
    setLocalItems(cartItems);
  }, [cartItems]);

  const handleQuantityChange = useCallback((title: string, qty: number) => {
    setLocalItems((items) =>
      items.map((item) =>
        item.title === title ? { ...item, quantity: qty } : item
      )
    );
  }, []);

  const handleUpdateCart = useCallback(async () => {
    setSaving(true);
    // persist changes
    if (userId) {
      const supabase = await createClient();
      const { error } = await supabase
        .from('profiles')
        .update({ cart_items: localItems, updated_at: new Date() })
        .eq('id', userId);
      if (error) {
        console.error('Failed to update cart on Supabase:', error);
        return;
      }
    } else {
      sessionStorage.setItem('cartItems', JSON.stringify(localItems));
    }

    // sync Redux
    dispatch(cartActions.clearCart());
    localItems.forEach((item) => {
      const { quantity, ...prod } = item;
      dispatch(cartActions.addToCart({ product: prod as Product, quantity }));
    });
    Swal.fire({
      title: 'Cart Updated!',
      icon: 'success',
      confirmButtonText: 'Great',
    });
    initialItemsRef.current = localItems.map((item) => ({ ...item }));
    setSaving(false);
  }, [userId, localItems, dispatch]);

  const hasChanges = useMemo(() => {
    const initial = initialItemsRef.current;
    // Different length means something was removed/added
    // if (initial.length !== localItems.length) {
    //   return true;
    // }
    // Check each item’s quantity against the initial snapshot
    return localItems.some((currItem) => {
      const match = initial.find((i) => i.title === currItem.title);
      return !match || match.quantity !== currItem.quantity;
    });
  }, [localItems]);

  if (loading || layoutloading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-[50rem] mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
      <h3 className="text-xl font-semibold mb-4">Cart</h3>
      {localItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">
            Your cart is empty. Start shopping!
          </p>
          <div className="flex justify-center mt-4">
            <Image
              src="/gif/emptycart.gif"
              alt="Empty Cart"
              width={150}
              height={150}
              unoptimized
            />
          </div>
        </div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="md:p-4 text-[14px] md:text-[16px] py-4 text-left">
                Product
              </th>
              <th className="md:p-4 text-[14px] md:text-[16px] py-4 text-left">
                Price
              </th>
              <th className="md:p-4 text-[14px] md:text-[16px] py-4 text-left">
                Quantity
              </th>
              <th className="md:p-4 text-[14px] md:text-[16px] py-4 text-left">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {localItems.map((item) => (
              <tr
                key={item.title}
                className="relative hover:bg-gray-50 text-[14px] md:text-[16px]"
                onMouseEnter={() => setHovered(item.title)}
                onMouseLeave={() => setHovered(null)}
              >
                <td className="md:p-4 py-4 flex flex-col md:flex-row md:items-center space-x-4">
                  <div className="relative md:w-14 md:h-14 w-0 h-fit">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={54}
                      height={54}
                      className="rounded hidden md:block"
                    />
                    {hovered === item.title && (
                      <button
                        className="absolute md:-top-2 -top-5 md:-left-4 bg-white p-1 rounded-full text-red-400 shadow hover:bg-gray-100 cursor-pointer"
                        disabled={removing}
                        onClick={() => {
                          removeFromCart(item.title);
                          initialItemsRef.current = localItems.map((item) => ({
                            ...item,
                          }));
                        }}
                      >
                        <BaselineCancel />
                      </button>
                    )}
                  </div>
                  <span className="text-[12px] md:text-[16px]">
                    {item.title}
                  </span>
                </td>
                <td className="md:p-4 py-4">₦{parseInt(item.price)}</td>
                <td className="md:p-4 py-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    className="md:w-20 w-15 border rounded px-2 py-1"
                    onChange={(e) =>
                      handleQuantityChange(
                        item.title,
                        Math.max(1, Number(e.target.value))
                      )
                    }
                  />
                </td>
                <td className="md:p-4 py-4">
                  ₦{parseInt(item.price) * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {localItems.length > 0 && (
        <div className="mt-6 text-right flex flex-col md:flex-row justify-end gap-10 items-center">
          {hasChanges && (
            <p className="text-[12px] text-gray-500">
              you have made some changes, do well to save these chnages before
              leaving your cart
            </p>
          )}
          <button
            className="flex items-center  cursor-pointer gap-5 text-red-500 hover:text-red-700 border-red-500 border-2 rounded px-4 py-2 transition duration-200 ease-in-out hover:translate-y-[-5px]"
            onClick={clearCart}
            disabled={clearingCart}
          >
            {clearingCart ? <LoadingTwotoneLoop /> : <TrashBinOutline />}{' '}
            <span>Clear Cart</span>
          </button>
          <PrimaryButton
            text="Save Changes"
            onClick={handleUpdateCart}
            className="cursor-pointer disabled:color-gray-400 "
            disabled={!hasChanges || removing}
            loading={saving}
          />
        </div>
      )}
      <div className="mt-6 flex w-fit">
        <Link
          href={'/'}
          className="text-mainOrange underline transition-transform duration-200 ease-in-out hover:-translate-x-2"
        >
          <ChevronLeft12 />
          Back to Shop
        </Link>
      </div>
      <div className="my-4 flex justify-end">
        <div className="border-[2px] border-mainBlack/40 w-full max-w-130 h-[20rem] p-4 rounded flex flex-col justify-between">
          <h4 className="font-semibold">Cart Total</h4>
          <p className="border-b-gray-400 border-b-[2px] pb-4 flex justify-between">
            Sub total: <span className="text-gray-500">₦{cartTotal}</span>
          </p>
          <p className="border-b-gray-400 border-b-[2px] pb-4 flex justify-between">
            Shipping: <span className="text-gray-500">Free</span>
          </p>
          <p className="flex justify-between">
            Total <span className="text-gray-500">₦{cartTotal}</span>
          </p>
          <PrimaryButton
            text="Proceed to checkout"
            onClick={() => {
              if (userId) {
                router.push('/cart/checkout');
              } else {
                Swal.fire({
                  title: 'Please Sign In',
                  text: 'You must be signed in to procced',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              }
            }}
            className="mx-auto"
            disabled={cartTotal ? false : true}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
