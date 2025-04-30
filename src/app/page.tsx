import BestSellers from '@/components/BestSellers';
import Category from '@/components/Category';
import Explore from '@/components/Explore';
import FlashSales from '@/components/FlashSales';
import Hero from '@/components/Hero';
import SideNav from '@/components/navbar/SideNav';
import NewArrival from '@/components/NewArrival';
import Poster from '@/components/Poster';

export default function Home() {
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
    </div>
  );
}
