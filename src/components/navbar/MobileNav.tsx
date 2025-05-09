import React from 'react';
import Link from 'next/link';
import SideNav from './SideNav';
import { useAppSelector } from '@/redux/store';
import { useLogout } from '@/hooks/auth/useLogout';

type MobileNavProps = {
  isOpen: boolean;
  close: () => void;
};

const navItems = [
  { title: 'Home', link: '/' },
  { title: 'Contact', link: '/contact' },
  { title: 'About', link: '/about' },
  { title: 'Sign in', link: '/signin' },
];

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, close }) => {
  const session = useAppSelector((state) => state.auth.session);
  const user = session?.user;
  const { logoutUser, loading } = useLogout();

  const handleToggle = () => {
    close();
  };

  // build dynamic items: replace "Sign in" with "Log out" when user is present
  const mobileNavItems = navItems.map((item) => {
    if (item.title === 'Sign in' && user) {
      return {
        title: 'Log out',
        onClick: async () => {
          close();
          await logoutUser();
        },
      } as {
        title: string;
        onClick: () => Promise<void>;
      };
    }
    return item;
  });

  return (
    <div
      className={`fixed top-0 left-0 min-h-[23rem] h-fit w-full bg-mainWhite shadow pb-[1rem] z-[-10] transition-transform duration-200 flex flex-col gap-[2rem] md:hidden ${
        isOpen ? 'translate-y-[14%]' : '-translate-y-full'
      }`}
    >
      <ul className="flex flex-col w-full text-xl mt-[6rem] gap-[1rem]">
        {mobileNavItems.map((item, index) => (
          <li key={index}>
            <div
              className="flex justify-between items-center px-4 cursor-pointer w-fit"
              onClick={() =>
                'onClick' in item ? item.onClick() : handleToggle()
              }
            >
              {'link' in item ? (
                <Link href={item.link}>
                  <span className="text-[14px] hover:text-myPurple">
                    {item.title}
                  </span>
                </Link>
              ) : (
                <span className="text-[14px] hover:text-myPurple">
                  {loading ? '.....' : item.title}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="px-4 w-full">
        <SideNav show />
      </div>
    </div>
  );
};

export default MobileNav;
