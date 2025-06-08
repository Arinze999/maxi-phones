'use client';

import React, { useEffect, useState } from 'react';
import { useGetOrders } from '@/hooks/others/useGetOrders';
import { useAppSelector } from '@/redux/store';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { useUpdateOrderStatus } from '@/hooks/others/useUpdateOrderStatus';
import { OrderStatus } from '@/redux/slices/orderSlice';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LoadingTwotoneLoop } from '@/components/icons/LoadingLoop';
import LoadingScreen from '@/components/LoadingScreen';

const filters: { label: string; value: OrderStatus | ''; color: string }[] = [
  { label: 'Pending', value: 'pending', color: 'amber' },
  { label: 'Successful', value: 'successful', color: 'green' },
  { label: 'Cancelled', value: 'cancelled', color: 'red' },
  { label: 'All', value: '', color: 'gray' },
];

const OrdersClient = () => {
  const { loading, onRefreshSession } = useRefreshSession();
  const { getLayoutLoadingData, loading: layouting } = useLayoutLoading();
  const session = useAppSelector((state) => state.auth.session);
  const userId = session?.user.id;
  const orders = useAppSelector((state) => state.orders.orders);
  const { getOrders, loading: getting } = useGetOrders();
  const { updateOrderStatus, loading: updating } = useUpdateOrderStatus();
  const searchParams = useSearchParams();
  const statusQuery = searchParams.get('status') as OrderStatus | null;
  const [changed, setChanged] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }
    // eslint-disable-next-line
  }, [userId, loading]);

  useEffect(() => {
    if (userId) {
      getOrders(userId, statusQuery ?? undefined);
      setExpandedOrderId('');
    }
  }, [userId, getOrders, statusQuery, changed]);

  const handleStatusChange = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: OrderStatus;
  }) => {
    if (userId) {
      await updateOrderStatus(userId, orderId, status);
      setChanged(!changed);
    }
  };

  if (layouting) return <LoadingScreen />;

  return (
    <div className="min-h-[50rem] mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
      <h3 className="text-xl font-semibold mb-5">Orders</h3>

      <div className="flex gap-4 mb-[4rem] flex-wrap">
        {filters.map((filter) => {
          const isActive =
            statusQuery === filter.value ||
            (!statusQuery && filter.value === '');
          return (
            <Link
              key={filter.label}
              href={`/orders${filter.value ? `?status=${filter.value}` : ''}`}
              className={`px-4 py-1 rounded-full text-sm border ${
                isActive
                  ? `border-${filter.color}-600 bg-${filter.color}-300/10 text-${filter.color}-800`
                  : 'border-gray-300 text-gray-600'
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="flex">
        <div className="flex flex-col gap-4 w-full md:w-[40%]">
          {getting ? (
            <p className="flex gap-3 items-center">
              Loading orders <LoadingTwotoneLoop />
            </p>
          ) : orders.length === 0 ? (
            <p>
              {statusQuery ? (
                <>You do not have any {statusQuery} orders</>
              ) : (
                <>
                  You do not have any Orders, head to the{' '}
                  <Link
                    href={'/products'}
                    className="underline semi-bold text-blue-600"
                  >
                    Products Page
                  </Link>{' '}
                  to start shopping
                </>
              )}
            </p>
          ) : (
            orders
              .slice() // Create a copy to avoid mutating original array
              .sort((a, b) => {
                const aDateTime = new Date(`${a.date}T${a.time}`);
                const bDateTime = new Date(`${b.date}T${b.time}`);
                return bDateTime.getTime() - aDateTime.getTime(); // Descending
              })
              .map((order) => {
                const isExpanded = expandedOrderId === order.id;
                return (
                  <div
                    key={order.id}
                    className={`border-dashed border w-full max-w-[25rem] p-3 text-sm flex flex-col gap-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
                      order.status === 'pending'
                        ? 'border-amber-500 bg-amber-300/10 text-amber-800'
                        : order.status === 'successful'
                        ? 'border-green-600 bg-green-300/10 text-green-800'
                        : 'border-red-600 bg-red-300/10 text-red-800'
                    }`}
                  >
                    <p>Order ID: {order.id}</p>
                    <p>Date: {order.date}</p>
                    <p>Time: {order.time}</p>
                    <p>
                      Status:{' '}
                      {order.status === 'pending'
                        ? 'Order placed, awaiting confirmation on delivery'
                        : order.status === 'successful'
                        ? 'Confirmed, Order Delivered'
                        : 'Order cancelled'}
                    </p>

                    {order.status === 'pending' && (
                      <div className="flex gap-5">
                        <p
                          className="text-red-600"
                          onClick={() => {
                            handleStatusChange({
                              orderId: order.id,
                              status: 'cancelled',
                            });
                          }}
                        >
                          {updating ? '...' : 'cancel'}
                        </p>
                        <p
                          className="text-green-600"
                          onClick={() => {
                            handleStatusChange({
                              orderId: order.id,
                              status: 'successful',
                            });
                          }}
                        >
                          {updating ? '...' : 'confirm'}
                        </p>
                      </div>
                    )}

                    <button
                      className="mt-2 text-blue-600 underline text-left"
                      onClick={() =>
                        setExpandedOrderId(isExpanded ? null : order.id)
                      }
                    >
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 border-t pt-3 flex flex-col gap-3">
                        {order.cart.map((item, index) => (
                          <div key={index} className="flex gap-3 items-center">
                            <Image
                              src={item.src}
                              alt={item.title}
                              width={40}
                              height={40}
                              className="rounded object-cover"
                            />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} × ₦{item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                        <p className="text-right font-semibold pt-2">
                          Total: ₦{order.total}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>

        <div className="flex-1 border-gray-300 border-l-[2px] hidden lg:flex justify-center-safe items-start">
          <Image
            src="/imgs/customers.png"
            alt="orderbg"
            width={1200}
            height={260}
            className="w-full h-auto max-w-[600]"
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersClient;
