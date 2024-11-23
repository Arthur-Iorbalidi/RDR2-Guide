import { yupResolver } from '@hookform/resolvers/yup';
import { debounceInterval } from '@src/constants/defaultSearchValues';
import images from '@src/constants/images';
import useDebounce from '@src/hooks/useDebounce';
import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './SearchForm.module.scss';
import getValidationSchema from './validationSchema';

interface IFormFields {
  query?: string;
}

interface IProps {
  handleChangeQuery: (query: string) => void;
  currentSearchValue: string;
}

const SearchForm = ({ handleChangeQuery, currentSearchValue }: IProps) => {
  const validationSchema = getValidationSchema();

  const [lastQuery, setLastQuery] = useState<string>('');

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      query: currentSearchValue,
    },
  });

  const queryValue = watch('query') || '';

  const debouncedQuery = useDebounce(queryValue, debounceInterval);

  useEffect(() => {
    if (isValid && debouncedQuery !== lastQuery) {
      handleChangeQuery(debouncedQuery);
      setLastQuery(debouncedQuery);
    }
  }, [debouncedQuery, handleChangeQuery]);

  const onSubmit: SubmitHandler<IFormFields> = (data: IFormFields) => {
    handleChangeQuery(data.query!);
    setLastQuery(data.query!);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.search_form}>
      <div className={styles.form_field}>
        <input
          type="text"
          {...register('query')}
          placeholder="Search..."
          className={styles.query_field}
        />
        <button className={styles.submit_btn} type="submit">
          <img src={images.searchIcon} alt="search" />
        </button>
      </div>
      <p className={styles.error_message}>{errors.query?.message}</p>
    </form>
  );
};

export default memo(SearchForm);
