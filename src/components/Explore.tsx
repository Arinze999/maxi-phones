'use client';

import React from 'react';
import PrimaryButton from './PrimaryButton';
import ProductCard from './cards/ProductCard';
import { products } from '@/db/products';
import Link from 'next/link';

const Explore = () => {
  return (
    <div className="py-10 flex flex-col gap-3 mt-10">
      <h3 className="text-mainOrange font-[600]">
        <span className="bg-mainOrange py-2 px-1 rounded mr-3">s</span>Our
        Products
      </h3>
      <div className="flex flex-col md:flex-row gap-3 md:gap-20 md:items-end">
        <h2 className="text-2xl md:text-3xl font-[600] font-inter">
          Explore Our Products
        </h2>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-5 items-center justify-between w-full mt-10">
        {products.slice(0,4).map((item, index) => (
          <>
            <ProductCard
              key={index}
              src={item.src}
              title={item.title}
              price={item.price}
              slashedPrice={item.slashedPrice}
              rating={item.rating}
            />
            {index !== products.length - 1 && (
              <hr className="bg-gray-200 w-full block md:hidden" />
            )}
          </>
        ))}
      </div>
      <div className="flex justify-center items-center mt-10">
        <Link href="/products">
          <PrimaryButton text="View All Products" onClick={() => {}} />
        </Link>
      </div>
    </div>
  );
};

export default Explore;
