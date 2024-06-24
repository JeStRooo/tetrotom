import React, { useCallback, useEffect } from 'react';

import styles from './AuthRegistration.module.scss';
import { Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registrationInitialValues, validationRegistrationSchema } from '@/modules/Auth/data';
import { Input } from '@/shared/Input';
import { InputPassword } from '@/shared/InputPassword';
import { getInputStatus } from '@/core/utils/getInputStatus.ts';
import { getHelperText } from '@/core/utils/getHelperText.ts';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { notification } from '@/core/components/Notifications/notification.tsx';
import { createUser, getUsers } from '@/modules/Auth/service';
import { Routes } from '@/core/enum';

export const AuthRegistration: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useAppSelector((state) => state.user.users.apiData);

  const {
    values,
    touched,
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    dirty,
  } = useFormik({
    initialValues: registrationInitialValues,
    validationSchema: validationRegistrationSchema,
    onSubmit: ({ name, nickName, email, password }) => {
      const usersEmails = users?.map((user) => user.email);
      const usersNickNames = users?.map((user) => user.nickName);

      const userData = {
        userName: name,
        nickName,
        email,
        password,
        avatar: '',
      }

      if (usersNickNames?.includes(nickName)) {
        notification('This nickname is already taken', 'error');
        return;
      }

      if (usersEmails?.includes(email)) {
        notification('An account with this email already exists', 'error');
        return;
      }

      dispatch(createUser({ userData })).then(() => {
        localStorage.setItem('user', JSON.stringify({ email: values.email, password: values.password }));
        notification('Account successfully created', 'success')
        navigate(Routes.MAIN)
      });
    },
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmitForm = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    handleSubmit();
  }, [handleSubmit])

  return (
    <div className={styles.registration}>
      <div className={styles.registrationContainer}>
        <h1 className={styles.title}>Registration</h1>
        <div className={styles.form}>
          <div className={styles.registrationInputs}>
            <Input
              type="text"
              status={getInputStatus({ errors, touched, inputName: 'name' })}
              helperText={getHelperText({ errors, touched, inputName: 'name' })}
              placeholder="Enter name"
              {...getFieldProps('name')}
            />
            <Input
              type="text"
              status={getInputStatus({ errors, touched, inputName: 'nickName' })}
              helperText={getHelperText({ errors, touched, inputName: 'nickName' })}
              placeholder="Enter nickname"
              {...getFieldProps('nickName')}
            />
            <Input
              type="email"
              status={getInputStatus({ errors, touched, inputName: 'email' })}
              helperText={getHelperText({ errors, touched, inputName: 'email' })}
              placeholder="Enter email"
              {...getFieldProps('email')}
            />
            <InputPassword
              type="password"
              status={getInputStatus({ errors, touched, inputName: 'password' })}
              helperText={getHelperText({ errors, touched, inputName: 'password' })}
              placeholder="Enter password"
              {...getFieldProps('password')}
            />
            <InputPassword
              type="password"
              status={getInputStatus({ errors, touched, inputName: 'confirmPassword' })}
              helperText={getHelperText({ errors, touched, inputName: 'confirmPassword' })}
              placeholder="Confirm password"
              {...getFieldProps('confirmPassword')}
            />
          </div>
          <div className={styles.submitContainer}>
            <Button type="primary" className={styles.submitButton} disabled={!isValid || !dirty} onClick={handleSubmitForm}>
              Sign up
            </Button>
            <p className={styles.auth}>
              Do you already have an account?
              <NavLink to={Routes.LOGIN} className={styles.signup}>
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
