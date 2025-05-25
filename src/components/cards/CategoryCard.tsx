'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  querry: string;
}

const CategoryCard: React.FC<CardProps> = ({ icon, title, querry }) => {
  const router = useRouter();

  const handleClick = () => {
    // navigate to /products?category=<querry>
    router.push(`/products?category=${encodeURIComponent(querry)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        border-borderGray/70 border-[1px]
        w-[10rem] h-[8rem]
        rounded
        flex flex-col items-center justify-center gap-2
        hover:bg-mainOrange hover:text-mainWhite
        active:bg-mainOrange active:text-mainWhite
        transition-all duration-300 ease-in-out
        cursor-pointer
      "
    >
      {icon}
      <span className="text-[12px]">{title}</span>
    </div>
  );
};

export default CategoryCard;
