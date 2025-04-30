import Image from 'next/image';
import React from 'react';

const Poster = () => {
  return (
    <div className="bg-mainBlack text-mainWhite p-5 md:p-10  lg:h-[30rem] w-full flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex flex-col gap-3 md:gap-5">
        <p className="text-mainGreen">Categories</p>
        <p className="text-[20px] md:text-[30px] lg:text-[48px] max-w-[180px] md:max-w-[450px]">
          Enhance Your Music Experience
        </p>
        <ul className="flex gap-5">
          <li className="bg-mainWhite text-mainBlack w-[3rem] md:w-[4rem] h-[3rem] md:h-[4rem] rounded-full flex flex-col items-center justify-center">
            <span className="text-[14px] md:text-[16px] font-[600]">05</span>
            <p className="text-[12px]">Days</p>
          </li>
          <li className="bg-mainWhite text-mainBlack w-[3rem] md:w-[4rem] h-[3rem] md:h-[4rem] rounded-full flex flex-col items-center justify-center">
            <span className="text-[14px] md:text-[16px] font-[600]">23</span>
            <p className="text-[12px]">Hours</p>
          </li>

          <li className="bg-mainWhite text-mainBlack w-[3rem] md:w-[4rem] h-[3rem] md:h-[4rem] rounded-full flex flex-col items-center justify-center">
            <span className="text-[14px] md:text-[16px] font-[600]">59</span>
            <p className="text-[12px]">Mins</p>
          </li>
          <li className="bg-mainWhite text-mainBlack w-[3rem] md:w-[4rem] h-[3rem] md:h-[4rem] rounded-full flex flex-col items-center justify-center">
            <span className="text-[14px] md:text-[16px] font-[600]">60</span>
            <p className="text-[12px]">Secs</p>
          </li>
        </ul>
        <button className="bg-mainGreen w-[12rem] h-[2rem] lg:h-[4rem] rounded-md">
          Buy Now!
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center relative">
        {/* <div className="absolute bg-mainWhite w-full h-full rounded-full opacity-10 blur-3xl"></div> */}
        <Image
          src={'/imgs/jbl.png'}
          width={400}
          height={200}
          alt="jbl"
          className="w-full max-w-[800px] md:min-w-[400px] h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Poster;
