import Image from 'next/image';
import React from 'react';

interface StatxCardProps {}

const StatxCard = ({
  src,
  title,
  subtitle,
}: {
  src: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="border rounded border-mainGray w-[15rem] h-[12rem] flex flex-col justify-center items-center">
      <Image
        src={src}
        height={80}
        width={80}
        alt="service"
        className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
      />
      <p className="text-[20px] md:text-[32px] font-bold">{title}</p>
      <p>{subtitle}</p>
    </div>
  );
};

export default StatxCard;
