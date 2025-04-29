import React, { useState } from 'react';
import HeartIcon from '../icons/HeartIcon';
import EyeIcon from '../icons/EyeIcon';
import Image from 'next/image';
import StarIcon from '../icons/StarIcon';

const ProductCard = () => {
  const [showCart, setShowCart] = useState(false);

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
        <button className="absolute left-3 top-3 text-mainWhite px-2 py-1 text-[12px] bg-mainOrange rounded">
          -40%
        </button>
        <Image
          src={'/imgs/pad.png'}
          alt="logo"
          width={172}
          height={152}
          className="cursor-pointer w-full h-auto object-contain transform scale-[0.7]"
        />
        <div
          className={`absolute cursor-pointer bottom-0 left-0 right-0 bg-mainBlack text-mainWhite text-[12px] font-[600] py-2 flex justify-center items-center gap-2 transition-transform duration-300 ${
            showCart ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          Add To Cart
        </div>
      </div>
      <div className="py-1 flex justify-center gap-2 flex-col">
        <p className="text-[15px] font-[600]">HAVIT HV-G92 Gamepad</p>
        <p className="text-[15px] text-mainOrange">
          $120 <span className="text-gray-500">$160</span>
        </p>
        <p className="flex gap-1">
          <StarIcon width={20} color="gold" />
          <StarIcon width={20} color="gold" />
          <StarIcon width={20} color="gold" />
          <StarIcon width={20} color="gold" />
          <StarIcon width={20} color="#8790A8" />
          <span className="text-[12px] text-[#8790A8]">(88)</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
