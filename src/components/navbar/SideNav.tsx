'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getProductsByCategory } from '@/db/products';

interface NavItem {
  title: string;
}

const navItems: NavItem[] = [
  { title: 'Apple' },
  { title: 'Samsung' },
  { title: 'Redmi' },
  { title: 'Infinix' },
  { title: 'Tecno' },
];

const SideNav = ({ show }: { show?: boolean }) => {
  const [openVendor, setOpenVendor] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // Close popover if clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        openVendor &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setOpenVendor(null);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [openVendor]);

  // all "phones" products
  const phones = getProductsByCategory('phones');

  return (
    <nav
      className={`
        relative w-full md:w-[20%]
        ${show ? 'block' : 'hidden'} md:block
      `}
    >
      <ul
        ref={navRef}
        className={`
          flex
          ${show ? 'flex-row flex-wrap gap-5' : 'flex-col gap-7'}
        `}
      >
        {navItems.map((item) => {
          const isOpen = openVendor === item.title;

          // filter phones by vendor in title
          const matches = phones.filter((p) =>
            p.title.toLowerCase().includes(item.title.toLowerCase())
          );

          return (
            <li key={item.title} className="relative">
              <button
                onClick={() => setOpenVendor(isOpen ? null : item.title)}
                className="
                  text-mainBlack text-[14px] md:text-[16px]
                  hover:text-mainOrange transition-colors
                "
              >
                {item.title}
              </button>

              {isOpen && matches.length > 0 && (
                <div
                  className={`
      absolute top-full mt-2
      bg-white shadow-lg rounded
      max-h-64 overflow-auto
      w-40
      z-5
      ${
        ['Infinix', 'Tecno'].includes(item.title) && show ? 'right-0' : 'left-0'
      }
    `}
                >
                  {matches.map((p) => (
                    <Link
                      key={p.title}
                      href={`/products/${encodeURIComponent(p.title)}`}
                      onClick={() => setOpenVendor(null)}
                      className="
                        block px-3 py-2 text-[13px]
                        hover:bg-gray-100
                        transition-colors 
                      "
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* vertical divider on md+ */}
      <div className="absolute right-0 top-[-33px] bottom-0 bg-borderGray/30 w-px hidden md:block" />
    </nav>
  );
};

export default SideNav;
