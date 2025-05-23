import React, { useState } from 'react';
import HeartIcon from '../icons/HeartIcon';
import EyeIcon from '../icons/EyeIcon2';
import Image from 'next/image';
import StarIcon from '../icons/StarIcon';
import { useAddToCart } from '@/hooks/useAddToCart';

interface ProductCardProps {
  src: string;
  title: string;
  price: string;
  slashedPrice: string;
  discountPercent?: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  src,
  title,
  price,
  slashedPrice,
  discountPercent,
  rating,
}) => {
  const [showCart, setShowCart] = useState(false);

  const { addToCart, loading } = useAddToCart(() => {
    console.log('Cart updated!');
  });

  const onAddToCart = () => {
    if (loading) return;
    addToCart({
      src,
      title,
      price,
      slashedPrice,
      discountPercent,
      rating,
    });
  };

  return (
    <div
      className="w-[16rem] min-w-[16rem] h-[21rem]"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
      onClick={() => setShowCart(true)}
    >
      <div className="bg-mainGray h-[72%] relative flex justify-center items-center overflow-hidden rounded-md">
        <span className="bg-white p-2 w-[2rem] h-[2rem] rounded-full absolute right-3 top-3 flex justify-center items-center">
          <HeartIcon color="white" />
        </span>
        <span className="bg-white p-2 w-[2rem] h-[2rem] rounded-full absolute right-3 top-15 flex justify-center items-center">
          <EyeIcon color="white" />
        </span>
        {discountPercent && (
          <button className="absolute left-3 top-3 text-mainWhite px-2 py-1 text-[12px] bg-mainOrange rounded">
            {discountPercent}
          </button>
        )}
        <Image
          src={src}
          alt="logo"
          width={172}
          height={152}
          className="cursor-pointer w-full h-auto object-contain transform scale-[0.7]"
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
          {loading ? 'Adding...' : 'Add To Cart'}
        </div>
      </div>
      <div className="py-1 flex justify-center gap-2 flex-col">
        <p className="text-[15px] font-[600]">{title}</p>
        <p className="text-[14px] text-mainOrange">
          ₦{price}{' '}
          <span className="text-gray-500 line-through ml-3">
            {' '}
            ₦{slashedPrice}
          </span>
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
