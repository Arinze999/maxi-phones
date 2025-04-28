import Hero from '@/components/Hero';
import SideNav from '@/components/navbar/SideNav';


export default function Home() {
  return (
    <div className='mt-[12rem] md:mt-[10rem] default-margin'>
     <div className='flex'>
     <SideNav />
     <Hero/>
     </div>
    </div>
  );
}
