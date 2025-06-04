import * as Yup from 'yup';

export const BillingDetailsSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(1, 'Please provide your full name')
    .required('Please provide your full name'),
  streetAddress: Yup.string()
    .min(1, 'Please provide your street address')
    .required('Please provide your street address'),
  city: Yup.string()
    .min(1, 'Please provide your city')
    .required('Please provide your city'),
  state: Yup.string()
    .min(1, 'Please provide your state')
    .required('Please provide your state'),
  phone: Yup.string()
    .min(1, 'Please provide your phone number')
    .required('Please provide your phone number'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Please provide your email'),
});

export type BillingDetailsDataType = Yup.InferType<typeof BillingDetailsSchema>;

export const BillingDetailsInitialValues: BillingDetailsDataType = {
  fullname: '',
  streetAddress: '',
  city: '',
  state: '',
  phone: '',
  email: '',
};
