'use client';

import React from 'react';
import UserDropdown from '../UserDropdown';
import { useAppSelector } from '@/redux/store';
import { HeartOutline } from '../icons/HeartOutline';
import CartIndicator from '../CartIndicator';
import { RoundSearch } from '../icons/RoundSearch';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { products } from '@/db/products';

const TopControls = () => {
  const session = useAppSelector((state) => state.auth.session);
  const user = session?.user;

  const containerRef = useRef<HTMLDivElement>(null);

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // 1) Replace your existing search‐debounce effect with this:

  useEffect(() => {
    // if user cleared the box, reset everything immediately
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    const handler = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      // search across all fields
      const matches = products.filter((p) => {
        const hay = [
          p.title,
          p.description,
          p.deliveryPeriod,
          ...p.specs,
          p.slashedPrice ?? '',
          p.discountPercent ?? '',
          p.price,
          ...p.categories,
        ]
          .join(' ')
          .toLowerCase();
        return hay.includes(term);
      });

      if (matches.length) {
        setSearchResults(matches.map((p) => p.title));
        setSearchError(null);
      } else {
        setSearchResults([]);
        setSearchError('No matches found.');
      }
      setSearchLoading(false);
    }, 1500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchError) return;
    const t = setTimeout(() => {
      setSearchError(null);
      setSearchResults([]);
      setSearchTerm(''); // reset input
      setSearchLoading(false); // ensure spinner is off
    }, 2000);
    return () => clearTimeout(t);
  }, [searchError]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSearchResults([]);
        setSearchError(null);
        setSearchTerm('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-end-safe gap-2 md:justify-center md:items-center">
      <div
        ref={containerRef}
        className="bg-mainGray rounded w-[15rem] lg:w-[17rem] relative"
      >
        <input
          type="text"
          className="w-full text-[12px] lg:text-[14px] p-3 outline-mainBlack"
          placeholder="what are you looking for?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <Image
          src={'/icons/searchtool.png'}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer w-[16px] lg:w-[24px] absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[-1.5rem]"
        /> */}
        {(searchLoading || searchResults.length > 0 || searchError) && (
          <div className="absolute z-1 left-0 right-0 mt-1 bg-white text-mainBlack shadow rounded max-h-40 overflow-y-auto scrollbar-none">
            {searchLoading ? (
              <div className="px-3 py-2 text-[12px] italic">Searching…</div>
            ) : searchError ? (
              <div className="px-3 py-2 text-[12px] italic">{searchError}</div>
            ) : (
              searchResults.map((title) => (
                <Link
                  key={title}
                  href={`/products/${encodeURIComponent(title)}`}
                  onClick={() => setSearchResults([])}
                  className="block px-3 py-2 text-[12px] hover:bg-gray-100"
                >
                  {title}
                </Link>
              ))
            )}
          </div>
        )}

        <div className="cursor-pointer w-[16px] lg:w-[24px] absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[-1.5rem]">
          <RoundSearch />
        </div>
      </div>
      <div className="flex gap-5 justify-center items-center">
        <HeartOutline />
        <CartIndicator />
        {user && <UserDropdown />}
      </div>
    </div>
  );
};

export default TopControls;
