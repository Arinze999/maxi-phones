import { useState } from 'react';
import { useGetCartItems } from '../useGetCartItems';

const useLayoutLoading = () => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems } = useGetCartItems();

  const getLayoutLoadingData = (userId?: string) => {
    setLoading(true);

    Promise.all([console.log('layout loading...'), fetchCartItems(userId)])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return { getLayoutLoadingData, loading };
};

export default useLayoutLoading;
