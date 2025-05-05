import Image from 'next/image';
import React from 'react';

const Summary = () => {
  return (
    <div className="py-10">
      <ul className="flex flex-col md:flex-row justify-around gap-12 md:gap-0 items-center">
        <li className="flex flex-col justify-center gap-3 items-center">
          <Image
            src={'/imgs/serv1.png'}
            height={80}
            width={80}
            alt="service"
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
          />
          <p className="md:text-[20px] font-semibold">FREE AND FAST DELIVERY</p>
          <small className="md:text-[14px]">
            Free delivery for all orders over #100,000
          </small>
        </li>
        <li className="flex flex-col justify-center gap-3 items-center">
          <Image
            src={'/imgs/serv2.png'}
            height={80}
            width={80}
            alt="service"
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
          />
          <p className="md:text-[20px] font-semibold">24/7 CUSTOMER SERVICE</p>
          <small className="md:text-[14px]">
            Friendly 24/7 customer support
          </small>
        </li>
        <li className="flex flex-col justify-center gap-3 items-center">
          <Image
            src={'/imgs/serv3.png'}
            height={80}
            width={80}
            alt="service"
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
          />
          <p className="md:text-[20px] font-semibold">MONEY BACK GUARANTEE</p>
          <small className="md:text-[14px]">
            We reurn money within 30 days
          </small>
        </li>
      </ul>
    </div>
  );
};

export default Summary;
