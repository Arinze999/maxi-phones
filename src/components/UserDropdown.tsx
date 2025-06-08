import React, { useState, useRef, useEffect } from 'react';
import { UserFill } from './icons/UserFill';
import { ShoppingBag } from './icons/ShoppingBag';
// import { CancelCircle } from './icons/CancelCircle';
import { Logout2Broken } from './icons/Logout2Broken';
// import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/auth/useLogout';
import { LoadingTwotoneLoop } from './icons/LoadingLoop';
import { useAppSelector } from '@/redux/store';

const drop = [
  { text: 'Manage My Account', icon: <UserFill />, path: '/account' },
  { text: 'My Orders', icon: <ShoppingBag />, path: '/orders' },
  // { text: 'My Cancellations', icon: <CancelCircle />, path: '/cancelations' },
  { text: 'Logout', icon: <Logout2Broken />, path: '/' },
];

const UserDropdown = () => {
  // const session = useAppSelector((state) => state.auth.session);
  // const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { loading: outing, logoutUser } = useLogout();

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const account = useAppSelector((state) => state.account);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="cursor-pointer w-[2rem] h-[2rem] rounded-full bg-mainOrange flex justify-center items-center"
        onClick={toggleOpen}
        onMouseEnter={() => setIsOpen(true)}
      >
        <UserFill />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-55 bg-mainBlack/30 text-mainGreen/70  backdrop-blur-md rounded-lg shadow-lg z-50">
          <ul className="py-2">
            {drop.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-mainOrange/60 text-mainWhite text-[12px] cursor-pointer flex gap-5 items-center"
                onClick={() => {
                  if (item.text === 'Logout') {
                    logoutUser();
                  } else {
                    router.push(item.path);
                  }
                }}
              >
                {item.icon}{' '}
                {item.text === 'Logout' && outing ? (
                  <LoadingTwotoneLoop />
                ) : item.text === 'Manage My Account' ? (
                  <p className='relative'>
                    {item.text}{' '}
                    <span className='text-[10px] absolute left-0 bottom-[-14px]'>{account.userName && account.userName}</span>
                  </p>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
