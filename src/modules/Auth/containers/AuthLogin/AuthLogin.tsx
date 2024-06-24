import React, { useCallback, useEffect } from 'react';

import styles from './AuthLogin.module.scss';
import Cookies from 'js-cookie'
import { Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginInitialValues, validationLoginSchema } from '@/modules/Auth/data';
import { Input } from '@/shared/Input';
import { InputPassword } from '@/shared/InputPassword';
import { getHelperText } from '@/core/utils/getHelperText.ts';
import { getInputStatus } from '@/core/utils/getInputStatus.ts';
import { getUsers } from '@/modules/Auth/service';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { notification } from '@/core/components/Notifications/notification.tsx';
import { Routes } from '@/core/enum';

export const AuthLogin: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useAppSelector((state) => state.user.users.apiData);

  const {
    touched,
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    dirty,
  } = useFormik({
    initialValues: loginInitialValues,
    validationSchema: validationLoginSchema,
    onSubmit: ({ email, password }) => {
      const usersEmails = users?.map((user) => user.email);
      const usersPasswords = users?.map((user) => user.password);

      if (usersEmails?.includes(email)) {
        const userIndex = usersEmails.indexOf(email);

        if (usersPasswords?.[userIndex] === password) {
          const userId = users?.[userIndex].id;

          Cookies.set('user_id', userId || '')
          notification('You\'re logged into your account', 'success');
          navigate(Routes.MAIN);
        } else {
          notification('Incorrect password. Please, try again', 'error');
        }
      } else {
        notification('There is no account with this e-mail address', 'error');
      }
    },
  });

  const handleSubmitForm = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    handleSubmit();
  }, [handleSubmit]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.form}>
          <div className={styles.registrationInputs}>
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
          </div>
          <div className={styles.submitContainer}>
            <Button type="primary" className={styles.submitButton} disabled={!isValid || !dirty}
                    onClick={handleSubmitForm}>
              Sign in
            </Button>
            <p className={styles.auth}>
              Don`t have an account yet?
              <NavLink to={Routes.REGISTRATION} className={styles.signup}>
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};