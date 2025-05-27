import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className="default-padding py-24 pb-20 bg-mainBlack text-mainWhite flex flex-col lg:flex-row justify-between gap-5">
      <div>
        <h3 className="mb-4 md:text-[24px] font-bold">Exclusive</h3>
        <p className="mb-4 text-[14px] md:text-[20px]">Subscribe</p>
        <p className="mb-4 text-[12px]">Get 24% off your first order</p>
        <input
          placeholder="Enter your email"
          type="text"
          className="border-mainGray border-[1px] rounded outline-mainOrange text-[14px] text-mainGray p-3"
        />
      </div>

      {/*  */}
      <div>
        <p className="mb-4 text-[14px] md:text-[20px]">Support</p>
        <ul>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">
              exclusive@gmail.com
            </p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">+88015-88888-9999</p>
          </li>
        </ul>
      </div>

      {/*  */}
      <div>
        <p className="mb-4 text-[14px] md:text-[20px]">Account</p>
        <ul>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">My Account</p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">Login / Register</p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">Cart</p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">WishList</p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">Shop</p>
          </li>
        </ul>
      </div>

      {/*  */}
      <div>
        <p className="mb-4 text-[14px] md:text-[20px]">Quick Link</p>
        <ul>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">Privacy Policy</p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">Terms Of Use</p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">FAQ</p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">Contact</p>
          </li>
        </ul>
      </div>

      {/*  */}
      <div>
        <p className="mb-4 text-[14px] md:text-[20px]">Download App</p>
        <ul>
          <li>
            <p className="mb-4 text-[12px] text-mainGray2 max-w-[200px]">
              Save $3 with App New User Only
            </p>
          </li>
          <li>
            <p className="mb-4 text-[14px] max-w-[200px]">
              <Image
                src={'/imgs/footimg.png'}
                width={200}
                height={150}
                alt="qr-code"
                style={{ width: 'auto', height: 'auto' }}
              />
            </p>
          </li>
          <li className="flex gap-7">
            <p>
              <Image
                src={'/imgs/facebook.png'}
                width={10}
                height={10}
                alt="qr-code"
                style={{ width: 'auto', height: 'auto' }}
              />
            </p>
            <p>
              <Image
                src={'/imgs/twitter.png'}
                width={24}
                height={24}
                alt="qr-code"
                style={{ width: 'auto', height: 'auto' }}
              />
            </p>
            <p>
              <Image
                src={'/imgs/insta.png'}
                width={24}
                height={24}
                alt="qr-code"
                style={{ width: 'auto', height: 'auto' }}
              />
            </p>
            <p>
              <Image
                src={'/imgs/linkedin.png'}
                width={20}
                height={20}
                alt="qr-code"
                style={{ width: 'auto', height: 'auto' }}
              />
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
