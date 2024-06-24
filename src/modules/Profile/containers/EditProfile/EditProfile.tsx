import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { ColorPicker, Modal } from 'antd';
import styles from './EditProfile.module.scss';
import { useFormik } from 'formik';
import {
  validationEditProfileSchema,
} from '@/modules/Auth/data';
import { notification } from '@/core/components/Notifications/notification.tsx';
import { updateUser } from '@/modules/Auth/service';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { Input } from '@/shared/Input';
import { getInputStatus } from '@/core/utils/getInputStatus.ts';
import { getHelperText } from '@/core/utils/getHelperText.ts';

interface EditProfileProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ isModalOpen, handleCancel }) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.user.users.apiData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = useAppSelector((state) => state.user.user.apiData!) || {};

  const { id, colorProfile, userName, nickName, birthday } = user || {};

  const {
    touched,
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    setFieldValue,
    dirty,
    setValues,
  } = useFormik({
    initialValues: {
      name: userName || '',
      nickname: nickName || '',
      color: colorProfile || '',
      // birthday: birthday ? dayjs(birthday) : null
    },
    validationSchema: validationEditProfileSchema,
    onSubmit: ({ name, nickname, color }) => {
      const usersNickNames = users?.map((user) => user.nickName);

      const userData = {
        ...user,
        userName: name,
        nickName: nickname,
        colorProfile: color,
        // birthday: birthday ? birthday.toISOString() : null
      };

      if (nickName !== nickname && usersNickNames?.includes(nickname)) {
        notification('This nickname is already taken', 'error');
        return;
      }

      dispatch(updateUser({ id, userData }));
      handleCancel();
    },
  });

  // const handleChangeDate: DatePickerProps['onChange'] = useCallback(
  //   (date: Dayjs | null) => {
  //     setFieldValue('birthday', date);
  //   },
  //   [setFieldValue]
  // );

  const handleChangeColor = useCallback(
    (_: never, hex: string) => {
      setFieldValue('color', hex);
    },
    [setFieldValue],
  );

  useEffect(() => {
    setValues({
      name: userName || '',
      nickname: nickName || '',
      color: colorProfile || '',
      // birthday: birthday ? dayjs(birthday) : null
    });
  }, [user, setValues, userName, nickName, colorProfile, birthday]);

  console.log(errors);

  return (
    <Modal
      title="Edit profile"
      open={isModalOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !isValid || !dirty }}
    >
      <div className={styles.container}>
        <Input
          type="text"
          status={getInputStatus({ errors, touched, inputName: 'name' })}
          helperText={getHelperText({ errors, touched, inputName: 'name' })}
          placeholder="Enter name"
          {...getFieldProps('name')}
        />
        <Input
          type="text"
          status={getInputStatus({ errors, touched, inputName: 'nickname' })}
          helperText={getHelperText({ errors, touched, inputName: 'nickname' })}
          placeholder="Enter nickname"
          {...getFieldProps('nickname')}
        />
        {/*<DatePicker*/}
        {/*  onChange={handleChangeDate}*/}
        {/*  value={values.birthday}*/}
        {/*/>*/}
        <ColorPicker
          defaultValue={colorProfile}
          showText
          onChange={handleChangeColor}
        />
      </div>
    </Modal>
  );
};
