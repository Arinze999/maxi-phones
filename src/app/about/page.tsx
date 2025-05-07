import Statx from '@/components/aboutlayout/Statx';
import Team from '@/components/aboutlayout/Team';
import Summary from '@/components/navbar/Summary';
import Image from 'next/image';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
      <div className="flex flex-col md:flex-row items-center">
        <div className="max-w-[525px] flex flex-col gap-10">
          <h3 className="text-[32px] md:text-[54px] font-bold">Our Story</h3>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.{' '}
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="flex-1 min-w-[500px] h-[609px] overflow-hidden flex justify-center items-center">
          <Image
            src={'/imgs/customers.png'}
            width={600}
            height={400}
            alt="about"
            className="w-full h-auto object-cover scale-[0.7]"
          />
        </div>
      </div>
      <Statx />
      <Team />
      <Summary />
    </div>
  );
};

export default AboutPage;
