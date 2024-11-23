import * as yup from 'yup';

const getValidationSchema = () => {
  return yup.object().shape({
    query: yup.string().trim(),
  });
};

export default getValidationSchema;
