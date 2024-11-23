import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@src/components/ui/Button/Button';
import getUserValidationSchema from '@src/constants/userValidationSchema';
import useAppDispatch from '@src/hooks/useAppDispatch';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import { changeUserInfo } from '@src/store/slices/userSlice';
import { IAuthUserResponse } from '@src/types/serverAPITypes';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ModalMessage from '../ModalMessage/ModalMessage';
import Loader from '../ui/Loader/Loader';
import styles from './MainUserInfo.module.scss';

interface IFormFields {
  name: string;
  surname: string;
  email: string;
}

const MainUserInfo = () => {
  const dispatch = useAppDispatch();

  const validationSchema = getUserValidationSchema();

  const userInfo = useAppSelector((state) => state.userReducer.userInfo);

  const [isDisabled, setIsDisabled] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: userInfo?.name ? userInfo?.name : '',
      surname: userInfo?.surname ? userInfo?.surname : '',
      email: userInfo?.email ? userInfo?.email : '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState({
    isShowed: false,
    isSucces: false,
    text: '',
  });

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    serverAPI.updateUserInfo(userInfo!.id, data, succesCallback, errorCallback);
    setIsLoading(true);
  };

  const succesCallback = (value: IAuthUserResponse) => {
    setIsLoading(false);
    dispatch(changeUserInfo(value.user));
    serverAPI.setToken(value.token);
    setIsDisabled(true);
    setModal({ isShowed: true, isSucces: true, text: 'Success' });
    clearModal();
  };

  const errorCallback = (message?: string) => {
    setIsLoading(false);
    if (message) {
      setModal({ isShowed: true, isSucces: false, text: message });
    } else {
      setModal({ isShowed: true, isSucces: false, text: 'Error' });
    }

    clearModal();
  };

  const clearModal = () => {
    setTimeout(() => {
      setModal({ isShowed: false, isSucces: false, text: '' });
    }, 6000);
  };

  const cancelChanges = () => {
    reset();
    toggleIsDisabled();
  };

  const toggleIsDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.main_info_form}>
      <h2 className={styles.form_header}>Main Info</h2>
      <div className={styles.form_fields}>
        <div className={styles.form_field_wrapper}>
          <input
            {...register('name')}
            className={styles.form_field}
            type="text"
            placeholder="Name"
            disabled={isDisabled}
          />
          <div className={styles.form_field_error}>{errors.name?.message}</div>
        </div>
        <div className={styles.form_field_wrapper}>
          <input
            {...register('surname')}
            className={styles.form_field}
            type="text"
            placeholder="Surname"
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
          <div className={styles.form_field_error}>{errors.email?.message}</div>
        </div>
      </div>
      <div className={styles.btns_wrapper}>
        {isDisabled ? (
          <Button
            key="edit"
            value="Edit"
            type="button"
            onClick={toggleIsDisabled}
          />
        ) : (
          <>
            <Button
              key="cancel"
              value="Cancel"
              type="button"
              appearence="danger"
              onClick={cancelChanges}
            />
            <Button value="Submit" type="submit" />
          </>
        )}
      </div>
      {modal.isShowed && (
        <ModalMessage
          className={styles.modal}
          text={modal.text}
          appearence={modal.isSucces ? 'success' : 'error'}
        />
      )}
      {isLoading && <Loader />}
    </form>
  );
};

export default MainUserInfo;
