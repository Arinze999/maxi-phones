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
import CartInitializer from '@/components/CartInitializer';

export default function Home() {
  const { loading } = useRefreshSession();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="mt-[12rem] md:mt-[10rem] default-margin">
      <CartInitializer />
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
