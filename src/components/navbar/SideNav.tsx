'use client';

import React from 'react';
import Link from 'next/link';

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: 'Apple', href: '/phones/apple' },
  { title: 'Samsung', href: '/phones/samsung' },
  { title: 'Redmi', href: '/phones/redmi' },
  { title: 'Infinix', href: '/phones/infinix' },
  { title: 'Tecno', href: '/phones/tecno' },
];

const SideNav = ({ show }: { show?: boolean }) => {
  return (
    <nav className={`relative w-full md:w-[20%] ${show ? 'block' : 'hidden'} md:block`}>
      <ul className={`flex  gap-5 ${show ? 'flex-row w-full flex-wrap' : 'flex-col'}`}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-mainBlack text-[14px] md:text-[16px] hover:text-mainOrange transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute right-0 top-[-33px] bottom-0 bg-borderGray/30 w-px hidden md:block" />
    </nav>
  );
};

export default SideNav;
