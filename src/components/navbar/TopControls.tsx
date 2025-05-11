import Image from 'next/image';
import React from 'react';
import UserDropdown from '../UserDropdown';
import { useAppSelector } from '@/redux/store';
import { CartOutline } from '../icons/CartOutline';
import { HeartOutline } from '../icons/HeartOutline';

const TopControls = () => {
  const session = useAppSelector((state) => state.auth.session);
  const user = session?.user;

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
      <div className="flex gap-5 justify-center items-center">
        <HeartOutline />
        <CartOutline />
        {user && <UserDropdown />}
      </div>
    </div>
  );
};

export default TopControls;
