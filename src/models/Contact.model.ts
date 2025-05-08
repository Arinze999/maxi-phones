import * as Yup from 'yup';

export const ContactUsSchema = Yup.object().shape({
  name: Yup.string().min(1).required('Please provide your Name'),
  phone: Yup.string().min(1).required('Please provide your Phone number'),
  email: Yup.string().email().required('Please provide your email'),
  message: Yup.string().min(1),
});

export type ContactUsDataType = Yup.InferType<typeof ContactUsSchema>;

type InitialValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export const contactUsInitialValues: InitialValues = {
  name: '',
  phone: '',
  email: '',
  message: '',
};
