'use client';

import React from 'react';
import ProductCard from './cards/ProductCard';
import { bestsellers } from '@/db/bestsellers';

const BestSellers = () => {
  return (
    <div className="py-10 flex flex-col gap-3">
      {' '}
      <h3 className="text-mainOrange font-[600]">
        <span className="bg-mainOrange py-2 px-1 rounded mr-3">s</span>
        This Month
      </h3>
      <h2 className="text-2xl md:text-3xl font-[600] font-inter">
        Best Selling Products
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-5 items-center justify-between w-full mt-10">
        {bestsellers.map((item, index) => (
          <>
            <ProductCard
              key={index}
              src={item.src}
              title={item.title}
              price={item.price}
              slashedPrice={item.slashedPrice}
              description={item.description}
              deliveryPeriod={item.deliveryPeriod}
              discountPercent={''}
              specs={item.specs}
              rating={item.rating}
            />
            {index !== bestsellers.length - 1 && (
              <hr className="bg-gray-200 w-full block md:hidden" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
