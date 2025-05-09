'use client';

import BestSellers from '@/components/BestSellers';
import Category from '@/components/Category';
import Explore from '@/components/Explore';
import FlashSales from '@/components/FlashSales';
import Hero from '@/components/Hero';
import SideNav from '@/components/navbar/SideNav';
import Summary from '@/components/navbar/Summary';
import NewArrival from '@/components/NewArrival';
import Poster from '@/components/Poster';
import ScrollTop from '@/components/ScrollTop';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import { FadeLoader } from 'react-spinners';

export default function Home() {
  const { loading } = useRefreshSession();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <FadeLoader
          loading={loading}
          color="#db4444"
          cssOverride={{ display: 'block', margin: '0 auto' }}
        />
      </div>
    );
  }

  return (
    <div className="mt-[12rem] md:mt-[10rem] default-margin">
      <div className="flex">
        <SideNav />
        <Hero />
      </div>
      <FlashSales />
      <Category />
      <BestSellers />
      <Poster />
      <Explore />
      <NewArrival />
      <Summary />
      <ScrollTop />
    </div>
  );
}
