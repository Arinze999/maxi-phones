'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
// import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail';

const VerifyEmailPage = () => {
  // const { loading } = useVerifyEmail();

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
      <p className="text-center text-[14px]">Verifying Email...please wait</p>
      {/* {loading && (
        <FadeLoader loading={true} color="#db4444" speedMultiplier={1.5} />
      )} */}
    </div>
  );
};

export default VerifyEmailPage;
