import React from 'react';
import CategoryCard from './cards/CategoryCard';
import PhoneIcon from './icons/PhoneIcon';
import LaptopIcon from './icons/LaptopIcon';
import GamepadIcon from './icons/GamepadIcon';
import HeadsetIcon from './icons/HeadsetIcon';
import SmartwatchIcon from './icons/SmartwatchIcon';

const categories = [
  { icon: <PhoneIcon width={50} height={50} />, title: 'Phones' },
  { icon: <LaptopIcon width={50} height={50} />, title: 'Computers' },
  { icon: <GamepadIcon width={50} height={50} />, title: 'Gaming' },
  { icon: <HeadsetIcon width={50} height={50} />, title: 'Entertainment' },
  { icon: <SmartwatchIcon width={50} height={50} />, title: 'Smartwatch' },
];

const Category = () => {
  return (
    <div className="py-10 flex flex-col gap-3">
      {' '}
      <h3 className="text-mainOrange font-[600]">
        <span className="bg-mainOrange py-2 px-1 rounded mr-3">s</span>
        Categories
      </h3>
      <h2 className="text-2xl md:text-3xl font-[600] font-inter">
        Browse By Category
      </h2>
      <div className="flex flex-wrap md:flex-row gap-5 items-center justify-between md:justify-start w-full md:overflow-x-auto scrollbar-hide mt-5">
        {categories.map((item, index) => (
          <CategoryCard key={index} title={item.title} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};

export default Category;
