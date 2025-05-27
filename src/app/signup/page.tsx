'use client';

import Image from 'next/image';
import React from 'react';
import { FormComponent } from '@/components/form/FormComponent';
import {
  AuthTextInputField,
  AuthPasswordInputField,
} from '@/components/form/FormField';
import {
  SignupSchema,
  SignupInitialValues,
} from '@/models/auth/SignUp.model';
import ValidatingFormSubmitButton from '@/components/Button/ValidatingFormSubmitButton';
import Link from 'next/link';
import { Google } from '@/components/icons/Google';
import { useSignup } from '@/hooks/auth/useSignup';

const SignupPage = () => {
  const { signupUser, loading } = useSignup();

  const handleGoogle = () => {
    alert('google here');
  };

  return (
    <div className="lg:min-h-[50rem] min-h-[35rem] mt-[12rem] md:mt-[10rem] mb-[3rem] default-margin flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="w-full hidden lg:block max-w-[705px]">
        <Image
          src="/imgs/authphone.png"
          width={705}
          height={681}
          alt="auth.bg"
        />
      </div>
      <div className="lg:flex-1 w-full max-w-[500px] lg:px-10">
        <h3 className="text-[20px] md:text-[24px] font-semibold mb-4">
          Create an account
        </h3>
        <p className="mb-10">Enter your details below</p>
        <FormComponent
          schema={SignupSchema}
          initialValues={SignupInitialValues}
          onSubmit={signupUser}
        >
          <AuthTextInputField name="name" label="" placeholder="Name" />
          <AuthTextInputField
            name="identifier"
            label=""
            placeholder="Email or Phone Number"
          />
          <AuthPasswordInputField
            name="password"
            label=""
            placeholder="Password"
          />
          <div className="w-full flex justify-between items-center">
            <ValidatingFormSubmitButton
              className="w-full py-4"
              loading={loading}
            >
              Create Account
            </ValidatingFormSubmitButton>
          </div>
          <div>
            <p
              onClick={handleGoogle}
              className="w-full cursor-pointer flex justify-center items-center gap-5 border py-4 border-gray-300 rounded-md"
            >
              <Google /> Sign up with Google
            </p>
          </div>
          <p className="text-gray-500">
            Already have an account?
            <Link href={'/signin'} className="underline text-mainOrange ml-5">
              Login
            </Link>
          </p>
        </FormComponent>
      </div>
    </div>
  );
};

export default SignupPage;
