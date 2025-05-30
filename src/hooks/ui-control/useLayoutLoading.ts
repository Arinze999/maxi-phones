import { useState } from 'react';
import { useGetCartItems } from '../cart/useGetCartItems';
import { useGetWishList } from '../wishlist/useGetWishList';

const useLayoutLoading = () => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems } = useGetCartItems();
  const { fetchWishList } = useGetWishList();

  const getLayoutLoadingData = (userId?: string) => {
    setLoading(true);

    Promise.all([
      console.log('layout loading...'),
      fetchCartItems(userId),
      fetchWishList(userId ?? ''),
    ])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return { getLayoutLoadingData, loading };
};

export default useLayoutLoading;
