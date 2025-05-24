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
import { useEffect, useState } from 'react';

export default function Home() {
  const { loading, onRefreshSession, userId } = useRefreshSession();
  const { loading: layoutloading, getLayoutLoadingData } = useLayoutLoading();

  const [load, setLoad] = useState(true);

  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }

    // eslint-disable-next-line
  }, [userId, loading]);

  async function allReady() {
    // replace these with your real async checks
    const checkAuth = () => Promise.resolve(loading);
    const loadLayout = () => Promise.resolve(layoutloading);

    // run them in parallel
    const results = await Promise.all([checkAuth(), loadLayout()]);

    // only true if every result is truthy
    return results.every(Boolean);
  }

  useEffect(() => {
    allReady().then((ok) => {
      setLoad(false);
      console.log('All checks passed, ready to render:', ok);
      if (!ok) {
        console.error('Not all checks passed, something went wrong.');
      }
    });
    // eslint-disable-next-line
  }, []);

  if (load) {
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
