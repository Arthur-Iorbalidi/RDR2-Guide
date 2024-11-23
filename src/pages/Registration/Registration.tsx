import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@src/components/ui/Button/Button';
import Loader from '@src/components/ui/Loader/Loader';
import getRegistrationValidationSchema from '@src/constants/RegistrationValidationSchema';
import routes from '@src/constants/routes';
import useAppDispatch from '@src/hooks/useAppDispatch';
import serverAPI from '@src/services/serverAPI';
import {
  changeIsAuthorized,
  changeUserInfo,
} from '@src/store/slices/userSlice';
import { IAuthUserResponse } from '@src/types/serverAPITypes';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Registration.module.scss';

interface IFormFields {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const Registration = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const validationSchema = getRegistrationValidationSchema();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState({
    isShowed: false,
    text: '',
  });

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    serverAPI.register(data, succesReg, errorReg);
    setIsLoading(true);
  };

  const succesReg = (value: IAuthUserResponse) => {
    setIsLoading(false);
    serverAPI.setToken(value.token);
    dispatch(changeIsAuthorized(true));
    dispatch(changeUserInfo(value.user));
    navigate('/');
  };

  const errorReg = (message?: string) => {
    setIsLoading(false);
    if (message) {
      setModal({ isShowed: true, text: message });
    } else {
      setModal({ isShowed: true, text: 'Error' });
    }

    setTimeout(() => {
      setModal({ isShowed: false, text: '' });
    }, 6000);
  };

  return (
    <div className={styles.registration}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registration_form}
      >
        <h2 className={styles.form_header}>Registration</h2>
        <div className={styles.form_fields}>
          <div className={styles.form_field_wrapper}>
            <input
              {...register('name')}
              className={styles.form_field}
              type="text"
              placeholder="Name"
            />
            <div className={styles.form_field_error}>
              {errors.name?.message}
            </div>
          </div>
          <div className={styles.form_field_wrapper}>
            <input
              {...register('surname')}
              className={styles.form_field}
              type="text"
              placeholder="Surname"
            />
            <div className={styles.form_field_error}>
              {errors.surname?.message}
            </div>
          </div>
          <div className={styles.form_field_wrapper}>
            <input
              {...register('email')}
              className={styles.form_field}
              type="text"
              placeholder="Email"
            />
            <div className={styles.form_field_error}>
              {errors.email?.message}
            </div>
          </div>
          <div className={styles.form_field_wrapper}>
            <input
              {...register('password')}
              className={styles.form_field}
              type="text"
              placeholder="Password"
            />
            <div className={styles.form_field_error}>
              {errors.password?.message}
            </div>
          </div>
        </div>
        <div className={styles.submit_wrapper}>
          <Button value="Sign Up" type="submit" />
          <p>
            Already have an account?{' '}
            <Link to={routes.login} className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
        {modal.isShowed && <div className={styles.modal}>{modal.text}</div>}
      </form>
      {isLoading && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Registration;
