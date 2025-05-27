'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

interface Slide {
  src1?: string;
  text1: string;
  text2: string;
  text3: string;
  src2: string;
}

const slides: Slide[] = [
  {
    src1: '/imgs/appleLogo.png',
    text1: 'iPhone 16 series',
    text2: 'Up to 10% off Voucher',
    text3: 'Shop Now',
    src2: '/imgs/i14.png',
  },
  {
    src1: '/imgs/samLogo.png',
    text1: 'Samsung S series',
    text2: 'Up to 20% off Voucher',
    text3: 'Shop Now',
    src2: '/imgs/s25banner.png',
  },
  {
    // src1: '/imgs/appleLogo.png',
    text1: 'Redmi Note13 series',
    text2: 'Up to 10% off Voucher',
    text3: 'Shop Now',
    src2: '/imgs/redmibanner2.png',
  },
  {
    // src1: '/imgs/appleLogo.png',
    text1: 'Infinix Hot Series',
    text2: 'Up to 23% off Voucher',
    text3: 'Shop Now',
    src2: '/imgs/hot50banner.png',
  },
  {
    // src1: '/imgs/appleLogo.png',
    text1: 'Tecno Spark 10 series',
    text2: 'Up to 20% off Voucher',
    text3: 'Shop Now',
    src2: '/imgs/sparkbanner.png',
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const directionRef = useRef(1);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        let next = prev + directionRef.current;
        if (next >= slides.length) {
          directionRef.current = -1;
          next = prev + directionRef.current;
        } else if (next < 0) {
          directionRef.current = 1;
          next = prev + directionRef.current;
        }
        return next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden flex-1 md:px-4">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full overflow-hidden flex-shrink-0 h-[18rem] md:h-[18rem] bg-mainBlack text-mainWhite flex flex-col md:flex-row justify-center items-center p-3 lg:p-5 transition-opacity duration-200 ease-in-out"
            style={{ opacity: index === current ? 1 : 0 }}
          >
            <div className="md:w-1/2 w-full flex flex-col lg:justify-around gap-2">
              <p className="flex text-[14px] lg:text-[16px] items-center gap-2 font-medium">
                {slide.src1 && (
                  <Image
                    src={slide.src1}
                    alt="logo"
                    width={40}
                    height={40}
                    className="cursor-pointer w-[16px] md:w-[40px]"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                )}
                {slide.text1}
              </p>

              <h3 className="lg:text-[48px] md:text-[30px] font-semibold max-w-[300px]">
                {slide.text2}
              </h3>
              <p
                onClick={() => {
                  router.push(
                    `/products?category=${encodeURIComponent('phones')}`
                  );
                }}
                className="border-b text-[14px] md:text-[16px] w-fit cursor-pointer md:mt-0"
              >
                {slide.text3}
              </p>
            </div>
            <div
              className="md:w-1/2 w-full max-h-[11rem] flex scale-[0.7] md:scale-none items-center justify-center transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === current ? 1 : 0 }}
            >
              <Image
                src={slide.src2}
                alt="product"
                width={300}
                height={300}
                className="cursor-pointer md:w-full max-w-[450px] h-auto"
                style={{ width: 'auto', height: 'auto', maxHeight: '15rem' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 md:bottom-[2rem] left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`md:w-3 w-2 h-2 md:h-3 rounded-full transition-all ${
              idx === current
                ? 'bg-mainOrange border-mainWhite border transform scale-[1.2]'
                : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
