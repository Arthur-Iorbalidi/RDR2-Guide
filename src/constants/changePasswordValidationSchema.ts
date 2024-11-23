import * as yup from 'yup';

const getChangePasswordValidationSchema = () =>
  yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(/^[^\s]*$/, "Password mustn't contain spaces")
      .min(8, 'Password must be at least 8 characters'),

    oldPassword: yup
      .string()
      .required('Password is required')
      .matches(/^[^\s]*$/, "Password mustn't contain spaces")
      .min(8, 'Password must be at least 8 characters'),
  });

export default getChangePasswordValidationSchema;
