'use client';

import React, { useEffect, useState } from 'react';
import {
  BillingDetailsDataType,
  BillingDetailsInitialValues,
  BillingDetailsSchema,
} from '@/models/BillingDetails.model';
import { FormComponent } from '@/components/form/FormComponent';
import { TextInputField } from '@/components/form/FormField';
import ValidatingFormSubmitButton from '@/components/Button/ValidatingFormSubmitButton';
import { useAppSelector } from '@/redux/store';
import { CartItem } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import PrimaryButton from '@/components/PrimaryButton';
import { useCreateBillingDetails } from '@/hooks/others/useCreateBillingDetails';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { FadeLoader } from 'react-spinners';
import { useSaveOrder } from '@/hooks/others/useSaveOrder';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import Script from 'next/script';
import { payWithPaystack } from '../../../../utils/paystack';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
  const { loading, onRefreshSession } = useRefreshSession();

  const { loading: layoutLoading, getLayoutLoadingData } = useLayoutLoading();

  const session = useAppSelector((state) => state.auth.session);
  const userId = session?.user.id ?? '';

  const { createBillingDetails, loading: savingDetails } =
    useCreateBillingDetails();

  const { loading: saving, saveOrder } = useSaveOrder();

  const [load, setLoad] = useState(true);

  // Trigger session refresh on mount
  useEffect(() => {
    onRefreshSession();
  }, [onRefreshSession]);

  useEffect(() => {
    if (!loading) {
      getLayoutLoadingData(userId ?? '');
    }

    // eslint-disable-next-line
  }, [userId, loading]);

  async function allReady() {
    // replace these with your real async checks
    const checkAuth = () => Promise.resolve(loading);
    const loadLayout = () => Promise.resolve(layoutLoading);

    // run them in parallel
    const results = await Promise.all([checkAuth(), loadLayout()]);

    // only true if every result is truthy
    return results.every(Boolean);
  }

  useEffect(() => {
    allReady().then((ok) => {
      setLoad(false);
      console.log('All checks passed, ready to render:', ok);
      if (!ok) {
        console.error('Not all checks passed, something went wrong.');
      }
    });
    // eslint-disable-next-line
  }, []);

  const cartItems = useAppSelector((state) => state.cart.items) as CartItem[];

  const cartTotal = useAppSelector((state) => state.cart.total);

  const storedDetails = useAppSelector(
    (state) => state.billingDetails
  ) as BillingDetailsDataType;

  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod' | ''>('');

  const initialValues: BillingDetailsDataType =
    storedDetails.fullname || storedDetails.email
      ? storedDetails
      : BillingDetailsInitialValues;

  const handleSubmit = async (values: BillingDetailsDataType) => {
    if (userId) {
      await createBillingDetails(userId, values);
    }
    // alert(JSON.stringify(values));
  };

  const placeOrder = async () => {
    if (
      storedDetails &&
      typeof storedDetails === 'object' &&
      Object.keys(storedDetails).length === 0
    ) {
      await Swal.fire({
        title: 'Blocked',
        text: 'Provide your billing details',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (paymentMethod === 'cod') {
      const now = new Date();

      const order = {
        id: uuidv4(),
        cart: cartItems,
        date: now.toISOString().split('T')[0], // e.g., "2025-06-07"
        time: now.toTimeString().split(' ')[0].slice(0, 5), // e.g., "14:35"
        total: cartTotal,
        status: 'pending' as const,
      };

      await saveOrder(userId, order);
    } else if (paymentMethod === 'bank') {
      const now = new Date();

      const order = {
        id: uuidv4(),
        cart: cartItems,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].slice(0, 5),
        total: cartTotal,
        status: 'successful' as const,
      };

      payWithPaystack({
        email: storedDetails.email,
        amount: cartTotal,
        onSuccess: async (response) => {
          console.log('Payment success:', response);
          await saveOrder(userId, order);
        },
        onClose: () => {
          console.log('Payment closed by user');
        },
      });
    }
  };

  return (
    <div className="min-h-[50rem] mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        defer
      />

      <h3 className="text-xl font-semibold mb-5">Billing Details</h3>
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[50%] max-w-[600px]">
          <FormComponent
            schema={BillingDetailsSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <TextInputField label="Full name" name="fullname" required />
            <TextInputField
              label="Street address"
              name="streetAddress"
              required
            />
            <TextInputField label="City" name="city" required />
            <TextInputField label="State" name="state" required />
            <TextInputField label="Phone" name="phone" required />
            <TextInputField label="Email" name="email" required />
            <ValidatingFormSubmitButton
              className="w-fit"
              loading={savingDetails}
            >
              Submit & Save
            </ValidatingFormSubmitButton>
            <small className="text-[12px] text-gray-500">
              saved for future orders, to make checkout faster
            </small>
          </FormComponent>
        </div>
        {load ? (
          <div className="justify-center items-center px-auto">
            {' '}
            <FadeLoader color="#db4444" />
          </div>
        ) : (
          <div className="w-full md:w-[50%] max-w-[500px]">
            {cartItems.map((item) => (
              <div
                key={item.title}
                className="text-[14px] md:text-[16px] flex justify-between items-center"
              >
                <div className="md:p-4 py-4 flex flex-col md:flex-row md:items-center space-x-4">
                  <div className="relative md:w-14 md:h-14 h-fit">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={54}
                      height={54}
                      className="rounded"
                    />
                  </div>
                  <span className="text-[12px] md:text-[14px]">
                    {item.title}
                  </span>
                </div>
                <div className="md:p-4 py-4">{item.quantity}</div>
                <div className="md:p-4 py-4">
                  ₦{parseInt(item.price) * item.quantity}
                </div>
              </div>
            ))}
            <p className="border-b-gray-400 text-[14px] border-b-[2px] pb-4 flex justify-between">
              Sub total: <span className="text-gray-500">₦{cartTotal}</span>
            </p>
            <p className="border-b-gray-400 text-[14px] border-b-[2px] pt-4 pb-4 flex justify-between">
              Shipping: <span className="text-gray-500">Free</span>
            </p>
            <p className="flex justify-between text-[14px] pt-4">
              Total <span className="text-gray-500">₦{cartTotal}</span>
            </p>
            <div className="mt-6">
              {/* Bank option */}
              <div className="flex items-center mb-2">
                <input
                  id="payment-bank"
                  name="payment"
                  type="radio"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="mr-2"
                />
                <label htmlFor="payment-bank" className="cursor-pointer">
                  Bank
                </label>

                <div className="ml-auto flex gap-3">
                  <Image
                    src="/imgs/bnk1.png"
                    width={30}
                    height={30}
                    alt={'bank1'}
                    className="w-full h-auto object-contain"
                  />
                  <Image
                    src="/imgs/bnk2.png"
                    width={30}
                    height={30}
                    alt={'bank1'}
                    className="w-full h-auto object-contain"
                  />
                  <Image
                    src="/imgs/bnk3.png"
                    width={30}
                    height={30}
                    alt={'bank1'}
                    className="w-full h-auto object-contain"
                  />
                  <Image
                    src="/imgs/bnk4.png"
                    width={30}
                    height={30}
                    alt={'bank1'}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Cash on Delivery option */}
              <div className="flex items-center">
                <input
                  id="payment-cod"
                  name="payment"
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mr-2"
                />
                <label htmlFor="payment-cod" className="cursor-pointer">
                  Cash on Delivery
                </label>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <PrimaryButton
                text="Place Order"
                onClick={placeOrder}
                className="my-4"
                disabled={!paymentMethod || saving || cartItems.length === 0}
                loading={saving}
              />
            </form>

            <p className="text-sm">
              Head to the{' '}
              <Link
                href="/orders"
                className="text-semibold underline text-blue-600"
              >
                Orders Page
              </Link>{' '}
              to confirm or cancel your order, orders made using bank method are
              successful by default, for Cash onDelivery, you need to confirm
              this in the Orders page.
            </p>
            <p className="mt-4">
              {' '}
              <span className="italic text-mainOrange mb-6 text-sm">
                "Thanks for Testing my App"
              </span>
              <br />
              <span className="font-semibold">
                Arinze: <span>Developer</span>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
