'use client';

import React, { useState, useEffect, useRef } from 'react';
import PrimaryButton from './PrimaryButton';
import ProductCard from './cards/ProductCard';

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const scrollRef = useRef<HTMLDivElement>(null);

  function getInitialTime() {
    const now = new Date().getTime();
    const endTime = now + 4 * 24 * 60 * 60 * 1000; // 4 days from now
    return endTime - now;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft <= 1000 ? 0 : prevTimeLeft - 1000
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeLeft = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return [
      { label: 'Days', value: days.toString().padStart(2, '0') },
      { label: 'Hours', value: hours.toString().padStart(2, '0') },
      { label: 'Minutes', value: minutes.toString().padStart(2, '0') },
      { label: 'Seconds', value: seconds.toString().padStart(2, '0') },
    ];
  };

  const timerItems = formatTimeLeft(timeLeft);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-10 flex flex-col gap-3">
      <h3 className="text-mainOrange font-[600]">
        <span className="bg-mainOrange py-2 px-1 rounded mr-3">s</span>Todays
      </h3>
      <div className="flex flex-col md:flex-row gap-3 md:gap-20 md:items-end">
        <h2 className="text-2xl md:text-3xl font-[600] font-inter">
          Flash Sales
        </h2>
        <ul className="flex gap-10">
          {timerItems.map((item, index) => (
            <li key={item.label} className="relative">
              <span className="text-[12px]">{item.label}</span>
              <p className="text-[25px] font-[700]">{item.value}</p>
              {index !== timerItems.length - 1 && (
                <span className="absolute right-[-15px] top-[25px] text-[20px] font-[700] text-mainOrange">
                  :
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex py-5 flex-col gap-5 justify-center items-center relative w-full">
        {/* Scroll buttons */}
        <div className="absolute right-3 top-[-3rem] gap-2 z-10 hidden md:flex">
          <button
            onClick={scrollLeft}
            className="bg-mainGray text-mainBlack h-[2rem] w-[2rem] rounded-full hover:text-mainOrange"
          >
            &larr;
          </button>
          <button
            onClick={scrollRight}
            className="bg-mainGray text-mainBlack h-[2rem] w-[2rem] rounded-full hover:text-mainOrange"
          >
            &rarr;
          </button>
        </div>

        {/* Scrollable ProductCards */}
        <div
          ref={scrollRef}
          className="flex flex-col md:flex-row gap-3 items-center justify-start w-full md:overflow-x-auto scrollbar-hide"
        >
          <ProductCard />
          <hr className="bg-gray-200 w-full block md:hidden" />
          <ProductCard />
          <hr className="bg-gray-200 w-full block md:hidden" />
          <ProductCard />
          <hr className="bg-gray-200 w-full block md:hidden" />
          <ProductCard />
          <hr className="bg-gray-200 w-full block md:hidden" />
          <ProductCard />
          <hr className="bg-gray-200 w-full block md:hidden" />
          <ProductCard />
          <hr className="bg-gray-200 w-full block md:hidden" />
          <ProductCard />
          <hr className="bg-gray-200 w-full block md:hidden" />
          <ProductCard /> <hr className="bg-gray-200 w-full block md:hidden" />
        </div>

        <PrimaryButton
          text="View All Products"
          onClick={() => {
            alert('clicked');
          }}
        />
      </div>
    </div>
  );
};

export default FlashSales;
