import { BaselineMailOutline } from '@/components/icons/Mail';
import { Telephone } from '@/components/icons/Telephone';
import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen mt-[12rem] md:mt-[10rem] default-margin mb-[3rem] flex flex-col justify-center items-center md:flex-row gap-5">
      <div className="shadow-md rounded-md w-[340px] h-[457px] p-8 flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <p className="font-[600] flex items-center gap-5">
            <span className="bg-mainOrange w-[2.5rem] h-[2.5rem] rounded-full text-mainWhite flex justify-center items-center">
              <Telephone />
            </span>{' '}
            Call To Us
          </p>
          <small>We are available 24/7, 7 days a week.</small>
          <small>Phone: +8801611112222</small>
        </div>

        <hr className="text-gray-600" />

        <div className="flex flex-col gap-5">
          <p className="font-[600] flex items-center gap-5">
            <span className="bg-mainOrange w-[2.5rem] h-[2.5rem] rounded-full text-mainWhite flex justify-center items-center">
              <BaselineMailOutline />
            </span>{' '}
            Write To US
          </p>
          <small>
            Fill out our form and we will contact you within 24 hours.
          </small>
          <small>Emails: customer@exclusive.com</small>
          <small>Emails: support@exclusive.com</small>
        </div>
      </div>
      <div className="border flex-1"></div>
    </div>
  );
};

export default Contact;
