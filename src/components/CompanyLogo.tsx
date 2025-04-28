import Link from 'next/link';

const CompanyLogo = ({
  textClass,
  close,
}: {
  textClass?: string;
  close?: () => void;
}) => {
  return (
    <Link href={'/'}>
      <h3
        className={`font-[900] text-myPurple text-[24px] md:text-[32px] flex flex-col gap-0 relative  ${textClass}`}
        onClick={close}
      >
        MAXI 
        <span className='text-[10px] absolute bottom-[-5px]'>phones</span>
      </h3>
    </Link>
  );
};

export default CompanyLogo;
