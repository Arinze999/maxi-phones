import React from 'react';
import Link from 'next/link';
import SideNav from './SideNav';

type MobileNavProps = {
  isOpen: boolean;
  close: () => void;
};

const navItems = [
  //   { title: 'Home', link: '/home' },
  { title: 'Home', link: '/' },
  { title: 'Contact', link: '/contact' },
  { title: 'About', link: '/about' },
  { title: 'Sign in', link: '/signin' },
];

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, close }) => {
  const handleToggle = () => {
    close();
  };

  return (
    <div
      className={`fixed top-0 left-0 min-h-[23rem] h-fit w-full bg-mainWhite shadow pb-[1rem] z-[-10] transition-transform duration-200 flex flex-col gap-[2rem] md:hidden ${
        isOpen ? 'translate-y-[14%]' : '-translate-y-full'
      }`}
    >
      <ul className="flex flex-col w-full text-xl mt-[6rem] gap-[1rem]">
        {navItems.map((item, index) => (
          <li key={index}>
            <div
              className="flex justify-between items-center px-4  cursor-pointer w-fit"
              onClick={() => handleToggle()}
            >
              <Link href={item.link}>
                <span className="text-[14px] hover:text-myPurple">
                  {item.title}
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-4 w-full"><SideNav show/></div>
    </div>
  );
};

export default MobileNav;
