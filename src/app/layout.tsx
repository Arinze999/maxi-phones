import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/app-layout/Header';
import Footer from '@/components/app-layout/Footer';
import ReduxProvider from '@/redux/ReduxProvider';

const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'MaxiPhones - Best Deals on Smartphones and Gadgets',
  description:
    'MaxiPhones is your go-to e-commerce store for the latest smartphones, accessories, and unbeatable tech deals. Enjoy 50% off promo sales and free express delivery!',

  keywords: [
    'smartphones',
    'buy phones online',
    'MaxiPhones',
    'gadget store',
    'iPhones',
    'Android phones',
    'tech accessories',
    'best phone deals',
    'e-commerce electronics',
  ],

  openGraph: {
    title: 'MaxiPhones - Top Tech Deals Online',
    description:
      'Shop the best smartphones and gadgets at MaxiPhones. Enjoy exclusive discounts, fast delivery, and the latest devices at unbeatable prices.',
    url: 'https://maxi-phones.vercel.app/',
    siteName: 'MaxiPhones',
    images: [
      {
        url: 'https://maxi-phones.vercel.app/imgs/maxiphones.png', // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: 'MaxiPhones - Promo Sale Banner',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MaxiPhones - Top Tech Deals Online',
    description:
      'Your go-to gadget store for the latest smartphones and accessories. Big discounts and free express delivery await!',
    images: ['https://maxi-phones.vercel.app/imgs/maxiphones.png'], // Replace with actual image
    creator: '@arinze_dev', // Optional: your brand's Twitter handle
  },

  metadataBase: new URL('https://maxi-phones.vercel.app/'),
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <ReduxProvider>
          <aside className="fixed top-0 left-0 right-0 text-[12px] md:text-[14px] z-10 flex items-center justify-center gap-3 bg-black p-4 text-mainWhite h-[3rem]">
            <p>
              {' '}
              Promo Sale For All Phones and Free Express Delivery - OFF 50%!{' '}
            </p>
            <span className="underline"> ShopNow</span>
          </aside>
          <Header />
          {modal}
          {children}
          <Footer />
          <div id="modal-root" />
        </ReduxProvider>
      </body>
    </html>
  );
}
