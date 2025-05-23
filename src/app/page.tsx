'use client';

import BestSellers from '@/components/BestSellers';
import Category from '@/components/Category';
import Explore from '@/components/Explore';
import FlashSales from '@/components/FlashSales';
import Hero from '@/components/Hero';
import LoadingScreen from '@/components/LoadingScreen';
import SideNav from '@/components/navbar/SideNav';
import Summary from '@/components/navbar/Summary';
import NewArrival from '@/components/NewArrival';
import Poster from '@/components/Poster';
import ScrollTop from '@/components/ScrollTop';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { useEffect } from 'react';

export default function Home() {
  const { loading, onRefreshSession, userId } = useRefreshSession();
  const { loading: layoutloading, getLayoutLoadingData } = useLayoutLoading();

  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
   if (!loading) {
     getLayoutLoadingData(userId ?? '');
   }

    // eslint-disable-next-line
  }, [userId, loading]);

  if (loading || layoutloading) {
    return <LoadingScreen />;
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
