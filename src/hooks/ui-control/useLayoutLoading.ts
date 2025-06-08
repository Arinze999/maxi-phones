import { useState } from 'react';
import { useGetCartItems } from '../cart/useGetCartItems';
import { useGetWishList } from '../wishlist/useGetWishList';
import { useGetBillingDetails } from '../others/useGetBillingDetails';
import { useGetAccount } from '../auth/useGetAccount';

const useLayoutLoading = () => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems } = useGetCartItems();
  const { fetchWishList } = useGetWishList();
  const { fetchBillingDetails } = useGetBillingDetails();
  const { getAccount } = useGetAccount();

  const getLayoutLoadingData = (userId?: string) => {
    setLoading(true);
    if (!userId)
      return Promise.all([
        fetchCartItems(encodeURIComponent(''))
          .then(() => setLoading(false))
          .catch(() => setLoading(false)),
      ]);

    Promise.all([
      console.log('layout loading...'),
      fetchCartItems(encodeURIComponent(userId ?? '')),
      fetchWishList(encodeURIComponent(userId ?? '')),
      fetchBillingDetails(encodeURIComponent(userId ?? '')),
      getAccount(userId ?? ''),
    ])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return { getLayoutLoadingData, loading };
};

export default useLayoutLoading;
