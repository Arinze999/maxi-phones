import { useState } from 'react';
import { useGetCartItems } from '../cart/useGetCartItems';
import { useGetWishList } from '../wishlist/useGetWishList';
import { useGetBillingDetails } from '../others/useGetBillingDetails';

const useLayoutLoading = () => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems } = useGetCartItems();
  const { fetchWishList } = useGetWishList();
  const { fetchBillingDetails } = useGetBillingDetails();

  const getLayoutLoadingData = (userId?: string) => {
    setLoading(true);
    if (!userId) return Promise.all([fetchCartItems(encodeURIComponent(''))]);

    Promise.all([
      console.log('layout loading...'),
      fetchCartItems(encodeURIComponent(userId ?? '')),
      fetchWishList(encodeURIComponent(userId ?? '')),
      fetchBillingDetails(encodeURIComponent(userId ?? '')),
    ])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return { getLayoutLoadingData, loading };
};

export default useLayoutLoading;
