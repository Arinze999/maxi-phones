import StarIcon from '@/components/icons/StarIcon';
import { products } from '@/db/products';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import { useAddToCart } from '@/hooks/cart/useAddToCart';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft12 } from '@/components/icons/ChevronLeft';
import { FadeLoader } from 'react-spinners';
import { Product } from '@/db/products';

const ProductDetailsModal = () => {
  const router = useRouter();

  const session = useAppSelector((state) => state.auth.session);
  const userId = session?.user.id;

  const { loading, onRefreshSession } = useRefreshSession();
  const { getLayoutLoadingData } = useLayoutLoading();

  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }

    // eslint-disable-next-line
  }, [userId, loading]);

  const { addToCart, loading: adding } = useAddToCart(() => {
    console.log('Cart updated!');
  });

  // ✨ pull params via hook instead of via props
  const params = useParams<{ title: string }>();
  const rawTitle = params?.title;
  if (!rawTitle) {
    return (
      <div className="flex flex-col items-center relative bg-mainWhite p-6 rounded-lg w-full max-w-[700px]">
        <FadeLoader loading={true} color="#db4444" speedMultiplier={1.5} />
      </div>
    );
  }

  // decode the URL-encoded title
  const decodedTitle = decodeURIComponent(rawTitle);

  // TODO: swap this for your Supabase lookup later
  const product = products.find((p: Product) => p.title === decodedTitle);

  return (
    <div className="flex flex-col items-center relative bg-mainWhite p-6 rounded-lg w-full max-w-[700px]">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center px-4 py-2 text-sm font-medium absolute top-4 left-0 text-mainOrange cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-x-2"
      >
        <ChevronLeft12 />
        Go Back
      </button>
      <h1 className="md:text-xl font-bold mt-10 mb-4">{product?.title}</h1>
      {product?.src && (
        <div className="w-full max-w-md mb-6 flex justify-center items-center">
          <Image
            src={product.src}
            alt={product.title}
            width={200}
            height={200}
            className="object-cover rounded"
            priority
          />
        </div>
      )}
      <p className="mb-4 text-[14px]">{product?.description}</p>
      <ol className="w-full max-w-[700px] list-disc list-inside mb-4">
        {product?.specs.map((spec, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold text-[14px]">{spec}</span>
          </li>
        ))}
      </ol>
      <div className="w-full max-w-[700px] flex flex-col gap-5">
        {product?.discountPercent && (
          <button className="text-mainWhite px-2 py-1 text-[12px] w-fit bg-mainOrange rounded">
            {product?.discountPercent}
          </button>
        )}
        <p className="flex gap-1 items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              width={20}
              color={product?.rating && i < product.rating ? 'gold' : '#8790A8'}
            />
          ))}
          <span className="text-[12px] text-[#8790A8]">{product?.rating}</span>
        </p>
        <p className="text-[14px] mb-2">
          Price: ₦{product?.price}{' '}
          {product?.slashedPrice && (
            <span className="text-gray-500 line-through ml-3">
              {' '}
              ₦{product?.slashedPrice}
            </span>
          )}{' '}
        </p>
        <p className='text-[14px] text-gray-500 mb-2'>
          categories:{' '}
          {product?.categories.map((cat, index) => (
            <span key={index}>{cat}, </span>
          ))}
        </p>
        <p className="text-gray-500">
          Deivered between:{' '}
          <span className="font-semibold">{product?.deliveryPeriod}</span>
        </p>
        <p
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product as Product);
          }}
          className="border-2 border-mainOrange w-fit text-mainOrange px-4 py-2 rounded-md text-[14px] cursor-pointer hover:bg-mainOrange hover:text-mainWhite transition duration-300"
        >
          {adding ? 'Adding...' : '+ Add to Cart'}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
