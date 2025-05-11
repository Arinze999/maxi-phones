import React from 'react';
import { FadeLoader } from 'react-spinners';
import CompanyLogo from './CompanyLogo';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-5 justify-center items-center">
      <CompanyLogo />
      <FadeLoader loading={true} color="#db4444" speedMultiplier={1.5} />
    </div>
  );
};
 
export default LoadingScreen;
