import Image from 'next/image';
import React from 'react';

const NewArrival = () => {
  return (
    <div className="py-10 flex flex-col gap-3 mt-10">
      <h3 className="text-mainOrange font-[600]">
        <span className="bg-mainOrange py-2 px-1 rounded mr-3">s</span>Featured
      </h3>
      <div className="flex flex-col md:flex-row gap-3 md:gap-20 md:items-end">
        <h2 className="text-2xl md:text-3xl font-[600] font-inter">
          New Arrival
        </h2>
      </div>

      <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 h-[37rem]">
        {/* Left Column - One container filling full height */}
        <div className="group relative h-full bg-mainBlack overflow-hidden">
          <div className="flex items-center] justify-center h-full">
            <Image
              src={'/imgs/ps52.png'}
              height={1600}
              width={1600}
              alt="ps52"
              className="w-full h-auto object-contain scale-[0.7] md:scale-[0.9] max-w-[600px] max-h-[600px]"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-300">
            Extra Content
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-1 gap-4 h-full">
          {/* Top Container */}
          <div className="group relative bg-blue-950/60 overflow-hidden h-[13rem] md:h-[27rem] lg:h-[22.6rem]">
            <div className="flex items-center justify-center h-full">
            <Image
              src={'/imgs/tv-4.png'}
              height={600}
              width={600}
              alt="ps52"
              className="w-full h-full object-contain scale-[0.7] md:scale-[0.9]"
            />
            </div>
            <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              Extra Content
            </div>
          </div>

          {/* Bottom Two Containers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative bg-purple-200 overflow-hidden">
              <div className="flex items-center justify-center h-full translate-y-3">
              <Image
              src={'/imgs/iPhone12-2.png'}
              height={600}
              width={600}
              alt="ps52"
              className="w-full h-auto object-contain scale-[0.7] md:scale-[0.9]"
            />
              </div>
              <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                Extra Content
              </div>
            </div>

            <div className="group relative border bg-mainBlack/90  overflow-hidden">
              <div className="flex items-center justify-center h-full">
              <Image
              src={'/imgs/samsung-22.png'}
              height={600}
              width={600}
              alt="ps52"
              className="w-full h-auto object-contain scale-[0.7] md:scale-[0.9]"
            />
              </div>
              <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                Extra Content
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
