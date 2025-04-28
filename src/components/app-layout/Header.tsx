'use client';

import { useEffect, useState } from 'react';
// import CompanyLogo from '../components/CompanyLogo';
// import HamburgerIcon2 from '../components/HamburgerIcon2';
// import MobileNav from '../components/MobileNav';
// import Button from '../components/Button';
import Nav from '@/components/navbar/Nav';
import MobileNav from '@/components/navbar/MobileNav';
import Image from 'next/image';
import CompanyLogo from '@/components/CompanyLogo';
import TopControls from '../navbar/TopControls';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1152) {
        setNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-myWhite fixed w-full top-[3rem] z-10 border-b-borderGray/30 border-b pb-3 md:pb-0">
      <div className="default-margin md:min-h-[5rem] flex justify-between md:items-center relative">
        <CompanyLogo
          close={() => {
            setNavOpen(false);
          }}
        />
        <Nav />
        <div className="flex-col">
          <div className="md:hidden gap-2 flex justify-end py-2">
            {navOpen ? (
              <Image
                src={'/icons/close.png'}
                alt="menu"
                width={24}
                height={24}
                onClick={toggleNav}
                className="cursor-pointer flex md:hidden"
              />
            ) : (
              <Image
                src={'/icons/menu.png'}
                alt="menu"
                width={24}
                height={24}
                onClick={toggleNav}
                className="cursor-pointer flex md:hidden"
              />
            )}
          </div>

          <TopControls />
        </div>
        <MobileNav
          isOpen={navOpen}
          close={() => {
            setNavOpen(false);
          }}
        />
      </div>
    </header>
  );
};

export default Header;
