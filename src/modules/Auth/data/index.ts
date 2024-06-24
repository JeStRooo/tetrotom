import * as yup from 'yup';

const nameRegEx = /^[а-яА-ЯЁa-zA-Z]+$/;

const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/;

export const registrationInitialValues = {
  name: '',
  nickName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const loginInitialValues = {
  email: '',
  password: '',
};

export const editProfileInitialValues = {
  name: '',
  nickName: '',
  color: '',
  birthday: ''
};

export const validationRegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .matches(nameRegEx, 'Incorrect name')
    .max(20, 'Too many characters'),

  nickName: yup
    .string()
    .required('Required')
    .max(20, 'Too many characters'),

  email: yup.string().required('Required').email('Incorrect email'),

  password: yup
    .string()
    .required('Required')
    .matches(passwordRegEx, 'Incorrect password'),

  confirmPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref(`password`)], 'Passwords don\'t match'),
});

export const validationLoginSchema = yup.object().shape({
  email: yup.string().required('Required').email('Incorrect email'),

  password: yup
    .string()
    .required('Required')
    .matches(passwordRegEx, 'Incorrect password'),
});

export const validationEditProfileSchema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegEx, 'Incorrect name')
    .max(20, 'Too many characters'),

  nickName: yup
    .string()
    .max(20, 'Too many characters'),

  colorProfile: yup
    .string()
});