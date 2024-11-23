import * as yup from 'yup';

const getLoginValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Email is not valid'),

    password: yup
      .string()
      .required('Password is required')
      .matches(/^[^\s]*$/, "Password mustn't contain spaces")
      .min(8, 'Password must be at least 8 characters'),
  });

export default getLoginValidationSchema;
