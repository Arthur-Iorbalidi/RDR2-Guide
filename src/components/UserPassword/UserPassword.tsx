import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@src/components/ui/Button/Button';
import getChangePasswordValidationSchema from '@src/constants/changePasswordValidationSchema';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ModalMessage from '../ModalMessage/ModalMessage';
import Loader from '../ui/Loader/Loader';
import styles from './UserPassword.module.scss';

interface IFormFields {
  password: string;
  oldPassword: string;
}

const UserPassword = () => {
  const validationSchema = getChangePasswordValidationSchema();

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

  const succesCallback = () => {
    setIsLoading(false);
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
      <h2 className={styles.form_header}>Password</h2>
      {!isDisabled && (
        <div className={styles.form_fields}>
          <div className={styles.form_field_wrapper}>
            <input
              {...register('password')}
              className={styles.form_field}
              type="text"
              placeholder="New password"
              disabled={isDisabled}
            />
            <div className={styles.form_field_error}>
              {errors.password?.message}
            </div>
          </div>
          <div className={styles.form_field_wrapper}>
            <input
              {...register('oldPassword')}
              className={styles.form_field}
              type="text"
              placeholder="Old password"
              disabled={isDisabled}
            />
            <div className={styles.form_field_error}>
              {errors.oldPassword?.message}
            </div>
          </div>
        </div>
      )}
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

export default UserPassword;
