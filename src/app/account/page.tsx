'use client';

import { FormComponent } from '@/components/form/FormComponent';
import LoadingScreen from '@/components/LoadingScreen';
import useLayoutLoading from '@/hooks/ui-control/useLayoutLoading';
import { useRefreshSession } from '@/hooks/ui-control/useRefreshSession';
import React, { useEffect, useState } from 'react';
import {
  AccountDataType,
  AccountInitialValues,
  AccountSchema,
} from '@/models/auth/Account.model';
import { TextInputField } from '@/components/form/FormField';
import ValidatingFormSubmitButton from '@/components/Button/ValidatingFormSubmitButton';
import Image from 'next/image';
import { useEditAccount } from '@/hooks/auth/useEditAccount';
import { useAppSelector } from '@/redux/store';
import { FormikHelpers } from 'formik';

const AccountPage = () => {
  const { loading, onRefreshSession, userId } = useRefreshSession();
  const { loading: layoutloading, getLayoutLoadingData } = useLayoutLoading();
  const { loading: editing, editAccount } = useEditAccount();

  const [load, setLoad] = useState(true);

  const account = useAppSelector((state) => state.account);

  console.log(account);

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
    const loadLayout = () => Promise.resolve(layoutloading);

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

  const handleSubmit = (
    values: AccountDataType,
    actions: FormikHelpers<AccountDataType>
  ) => {
    editAccount(userId ?? '', values);
    actions.resetForm({ values: AccountInitialValues });
  };

  if (load) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-[50rem] mt-[12rem] md:mt-[10rem] default-margin mb-[3rem]">
      <h3 className="text-xl font-semibold mb-5 pt-10 ">Manage your Account</h3>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-[40%]">
          <FormComponent
            initialValues={
              Object.keys(account).length > 0 ? account : AccountInitialValues
            }
            schema={AccountSchema}
            onSubmit={handleSubmit}
          >
            <TextInputField name="firstName" label="First name" />
            <TextInputField name="lastName" label="Last name" />
            <TextInputField name="userName" label="User name" />
            <ValidatingFormSubmitButton loading={editing}>
              Save
            </ValidatingFormSubmitButton>
          </FormComponent>
        </div>
        <div className="flex-1 hidden md:flex justify-center items-center">
          {' '}
          <Image
            src="/imgs/account.png"
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

export default AccountPage;
