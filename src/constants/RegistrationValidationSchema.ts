import * as yup from 'yup';

const getRegistrationValidationSchema = () =>
  yup.object().shape({
    nickName: yup
      .string()
      .required('NickName is required')
      .min(2, 'NickName must be at least 2 characters')
      .max(50, 'NickName must be at most 50 characters'),
    name: yup
      .string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),

    password: yup
      .string()
      .required('Password is required')
      .matches(/^[^\s]*$/, "Password mustn't contain spaces")
      .min(8, 'Password must be at least 8 characters'),
  });

export default getRegistrationValidationSchema;
