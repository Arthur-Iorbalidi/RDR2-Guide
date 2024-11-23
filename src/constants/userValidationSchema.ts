import * as yup from 'yup';

const getUserValidationSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    surname: yup
      .string()
      .required('Surname is required')
      .min(2, 'Surname must be at least 2 characters')
      .max(50, 'Surname must be at most 50 characters'),

    email: yup
      .string()
      .required('Email is required')
      .email('Email is not valid'),
  });

export default getUserValidationSchema;
