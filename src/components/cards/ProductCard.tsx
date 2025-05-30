import React, { useState } from 'react';
import HeartIcon from '../icons/HeartIcon';
import EyeIcon from '../icons/EyeIcon2';
import Image from 'next/image';
import StarIcon from '../icons/StarIcon';
import { useAddToCart } from '@/hooks/cart/useAddToCart';
import Link from 'next/link';
import { Product } from '@/db/products';
import { useAddToWishList } from '@/hooks/wishlist/useAddToWishList';
import { useAppSelector } from '@/redux/store';
import { useRemoveFromWishList } from '@/hooks/wishlist/useRemoveFromWishList';
import { CartOutline } from '../icons/CartOutline';

interface ProductCardProps extends Product {
  // src: string;
  // title: string;
  // price: string;
  // slashedPrice: string;
  // discountPercent?: string;
  // rating: number;
  hover?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  src,
  title,
  price,
  slashedPrice,
  discountPercent,
  rating,
  description,
  deliveryPeriod,
  specs,
  hover,
  categories,
}) => {
  const wishItems = useAppSelector((s) => s.wishList.items);

  const [showCart, setShowCart] = useState(false);

  const { addToCart, loading } = useAddToCart(() => {
    console.log('Cart updated!');
  });

  const { loading: wishing, addToWishList } = useAddToWishList();

  const { loading: removing, removeFromWishList } = useRemoveFromWishList();

  const isWish = wishItems.some((item) => item.title === title);

  const onAddToCart = () => {
    if (loading) return;
    addToCart({
      src,
      title,
      price,
      slashedPrice,
      discountPercent,
      rating,
      description,
      deliveryPeriod,
      specs,
      categories,
    } as Product);
  };

  const onAddToWishList = () => {
    if (loading) return;
    addToWishList({
      src,
      title,
      price,
      slashedPrice,
      discountPercent,
      rating,
      description,
      deliveryPeriod,
      specs,
      categories,
    } as Product);
  };

  const onRemoveFromWishList = () => {
    if (loading) return;
    removeFromWishList(title);
  };

  return (
    <div
      className={`w-[16rem] min-w-[16rem] h-[21rem] ${
        hover &&
        'p-2 transition duration-200 ease-in-out hover:translate-y-[-10px] hover:scale-[1.08] hover:shadow rounded-md'
      }`}
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
      onClick={() => setShowCart(true)}
    >
      <div className="bg-mainGray h-[72%] relative flex justify-center items-center overflow-hidden rounded-md">
        <span
          onClick={isWish ? onRemoveFromWishList : onAddToWishList}
          className={`
            cursor-pointer p-2 w-[2rem] h-[2rem] rounded-full absolute z-5 right-3 top-3 flex justify-center items-center
            bg-mainWhite
            ${isWish ? 'text-red-500' : 'text-mainWhite'}
          `}
        >
          {wishing || removing ? (
            <p className="text-mainBlack">..</p>
          ) : (
            <HeartIcon stroke={isWish ? '' : 'black'} />
          )}
        </span>
        <Link href={`/products/${encodeURIComponent(title)}`}>
          <span className="bg-white cursor-pointer p-2 w-[2rem] h-[2rem] rounded-full absolute z-5 right-3 top-15 flex justify-center items-center">
            <EyeIcon color="white" />
          </span>
        </Link>
        {discountPercent && (
          <button className="absolute z-1 left-3 top-3 text-mainWhite px-2 py-1 text-[12px] bg-mainOrange rounded">
            {discountPercent}
          </button>
        )}
        <Image
          src={src}
          alt="logo"
          width={172}
          height={152}
          className="cursor-pointer w-full h-auto object-contain transform scale-[0.7]"
          priority
        />
        <div
          className={`absolute cursor-pointer bottom-0 left-0 right-0 bg-mainBlack text-mainWhite text-[12px] font-[600] py-2 flex justify-center items-center gap-2 transition-transform duration-300 ${
            showCart ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          {loading ? 'Adding...' : 'Add To Cart'} <CartOutline />
        </div>
      </div>
      <div className="py-1 flex justify-center gap-2 flex-col">
        <p className="text-[15px] font-[600]">{title}</p>
        <p className="text-[14px] text-mainOrange">
          ₦{price}{' '}
          {slashedPrice && (
            <span className="text-gray-500 line-through ml-3">
              {' '}
              ₦{slashedPrice}
            </span>
          )}
        </p>
        <p className="flex gap-1 items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              width={20}
              color={i < rating ? 'gold' : '#8790A8'}
            />
          ))}
          <span className="text-[12px] text-[#8790A8]">{rating}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
