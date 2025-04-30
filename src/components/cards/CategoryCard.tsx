import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
}

const CategoryCard: React.FC<CardProps> = ({ icon, title }) => {
  return (
    <div className="border-borderGray/70 border-[1px] w-[10rem] h-[8rem] rounded flex flex-col items-center justify-center gap-2 hover:bg-mainOrange hover:text-mainWhite transition-all duration-300 ease-in-out cursor-pointer">
 
      {icon}
      <span className="text-[12px]">{title}</span>
    </div>
  );
};

export default CategoryCard;
