'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormComponent } from '@/components/form/FormComponent';
import {
  AuthTextInputField,
  AuthPasswordInputField,
} from '@/components/form/FormField';
import {
  LoginInitialValues,
  LoginSchema,
} from '@/models/auth/SignIn.model';
import ValidatingFormSubmitButton from '@/components/Button/ValidatingFormSubmitButton';
import { useSignin } from '@/hooks/auth/useSignin';

const LoginPage = () => {
  const { signinUser, loading } = useSignin();

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
          Log in to MAXI phones
        </h3>
        <p className="mb-10">Enter your details below</p>
        <FormComponent
          schema={LoginSchema}
          initialValues={LoginInitialValues}
          onSubmit={signinUser}
        >
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
              className="py-4 px-10"
              loading={loading}
            >
              Login
            </ValidatingFormSubmitButton>
            <p className="text-mainOrange cursor-pointer">Forget Password?</p>
          </div>

          <p className="text-gray-500">
            Don't have an account?
            <Link href={'/signup'} className="underline text-mainOrange ml-5">
              Signup
            </Link>
          </p>
        </FormComponent>
      </div>
    </div>
  );
};

export default LoginPage;
