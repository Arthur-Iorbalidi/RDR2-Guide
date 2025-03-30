import { yupResolver } from '@hookform/resolvers/yup';
import getUserValidationSchema from '@src/constants/userValidationSchema';
import useAppSelector from '@src/hooks/useAppSelector';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../ui/Button/Button';
import styles from './MainUserInfo.module.scss';

interface IFormFields {
  username: string;
  nickname: string;
}

const MainUserInfo = () => {
  // const dispatch = useAppDispatch();

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
      username: userInfo?.username ? userInfo?.username : '',
      nickname: userInfo?.nickname ? userInfo?.nickname : '',
    },
  });

  // const [isLoading, setIsLoading] = useState(false);

  // const [modal, setModal] = useState({
  //   isShowed: false,
  //   isSucces: false,
  //   text: '',
  // });

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
    // serverAPI.updateUserInfo(userInfo!.id, data, succesCallback, errorCallback);
    // setIsLoading(true);
  };

  // const succesCallback = (value: IAuthUserResponse) => {
  //   setIsLoading(false);
  //   dispatch(changeUserInfo(value.user));
  //   serverAPI.setToken(value.token);
  //   setIsDisabled(true);
  //   setModal({ isShowed: true, isSucces: true, text: 'Success' });
  //   clearModal();
  // };

  // const errorCallback = (message?: string) => {
  //   setIsLoading(false);
  //   if (message) {
  //     setModal({ isShowed: true, isSucces: false, text: message });
  //   } else {
  //     setModal({ isShowed: true, isSucces: false, text: 'Error' });
  //   }

  //   clearModal();
  // };

  // const clearModal = () => {
  //   setTimeout(() => {
  //     setModal({ isShowed: false, isSucces: false, text: '' });
  //   }, 6000);
  // };

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
            {...register('nickname')}
            className={styles.form_field}
            type="text"
            placeholder="NickName"
            disabled={isDisabled}
          />
          <div className={styles.form_field_error}>
            {errors.nickname?.message}
          </div>
        </div>
        <div className={styles.form_field_wrapper}>
          <input
            {...register('username')}
            className={styles.form_field}
            type="text"
            placeholder="Name"
            disabled={isDisabled}
          />
          <div className={styles.form_field_error}>
            {errors.username?.message}
          </div>
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
      {/* {modal.isShowed && (
        <ModalMessage
          className={styles.modal}
          text={modal.text}
          appearence={modal.isSucces ? 'success' : 'error'}
        />
      )}
      {isLoading && <Loader />} */}
    </form>
  );
};

export default MainUserInfo;
