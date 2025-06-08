import * as Yup from 'yup';

export const AccountSchema = Yup.object().shape({
  userName: Yup.string(),
  firstName: Yup.string(),
  lastName: Yup.string(),
});

export type AccountDataType = Yup.InferType<typeof AccountSchema>;

export const AccountInitialValues: AccountDataType = {
  userName: '',
  firstName: '',
  lastName: '',
};
