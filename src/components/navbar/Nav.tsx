'use client';

import { useEffect, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/store';
import { useLogout } from '@/hooks/auth/useLogout';

const Nav = () => {
  // grab the session from the auth slice
  const session = useAppSelector((state) => state.auth.session);
  const user = session?.user;
  const navRef = useRef<HTMLDivElement>(null);

  const { logoutUser, loading } = useLogout();

  // sign‐out handler
  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();
    logoutUser();
  };

  // build your items
  const navItems: Array<
    { title: string; link: string } | { title: string; onClick: any }
  > = [
    { title: 'Home', link: '/' },
    { title: 'Contact', link: '/contact' },
    { title: 'About', link: '/about' },
    user
      ? { title: 'Log out', onClick: handleLogout }
      : { title: 'Sign in', link: '/signin' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        // …your existing logic…
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={navRef} className="hidden md:flex">
      <ul className="flex gap-2 text-xl">
        {navItems.map((item, idx) => (
          <li key={idx} className="relative">
            {'link' in item ? (
              <Link href={item.link}>
                <div className="flex items-center px-4 py-2 cursor-pointer">
                  <span className="text-[16px] hover:text-myPurple">
                    {item.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div
                onClick={item.onClick}
                className="flex items-center px-4 py-2 cursor-pointer"
              >
                <span className="text-[16px] hover:text-myPurple">
                  {loading ? '.....' : item.title}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
