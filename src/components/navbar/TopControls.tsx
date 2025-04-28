import Image from 'next/image';
import React from 'react';

const TopControls = () => {
  return (
    <div className="flex flex-col md:flex-row items-end-safe gap-2 md:justify-center md:items-center">
      <div className="bg-mainGray rounded w-[15rem] lg:w-[17rem] relative">
        <input
          type="text"
          className="w-full text-[12px] lg:text-[14px] p-3"
          placeholder="what are you looking for?"
        />
        <Image
          src={'/icons/searchtool.png'}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer w-[16px] lg:w-[24px] absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[-1.5rem]"
        />
      </div>
      <div className='flex gap-2 justify-center items-center'>
      <Image
          src={'/icons/heart.png'}
          alt="search"
          width={32}
          height={32}
          className="cursor-pointer w-[24px] lg:w-[24px]"
        />
         <Image
          src={'/icons/cart.png'}
          alt="search"
          width={32}
          height={32}
          className="cursor-pointer w-[24px] lg:w-[24px]"
        />
      </div>
    </div>
  );
};

export default TopControls;
