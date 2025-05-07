import React from 'react';
import { Twitter } from '../icons/Xicon';
import { InstagramOutline } from '../icons/Instagram';
import { LinkedinLine } from '../icons/Linkedin';
import Image from 'next/image';

const TeamCard = ({
  src,
  title,
  subtitle,
}: {
  src: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="h-[35rem] w-full md:w-[370px]">
      <div className="w-full h-[75%] bg-mainGray flex  overflow-hidden">
        <Image
          src={src}
          width={408}
          height={500}
          alt="team1"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-3 py-2">
        <p className="text-[20px] md:text-[32px] font-semibold">{title}</p>
        <p>{subtitle}</p>
        <ul className="flex gap-10">
          <li>
            <Twitter />
          </li>
          <li>
            <InstagramOutline />
          </li>
          <li>
            <LinkedinLine />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeamCard;
