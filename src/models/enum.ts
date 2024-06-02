export enum LoadingStage {
  LOAD = 'LOAD',
  LOADING = 'LOADING',
}

export enum Api {
  POSTS = 'posts',
}

export enum FormErrors {
  EMAIL_INCORRECT = 'Введён некорректный e-mail',
  NAME_INCORRECT = 'Введено некорректное имя',
  REQUIRED = 'Обязательное поле',
  PASSWORD_INCORRECT = 'Пароль должен содержать не менее 8 символов, одну цифру и заглавную букву',
}

export enum FormSuccess {
  REGISTRATION_CONFIRMATION = 'Вы успешно вошли в аккаунт!',
}

export enum Routes {
  REGISTRATION = '/auth/REGISTRATION',
  LOGIN = '/auth/login',
  MAIN = '/main-page',
  PROFILE = '/profile/:id'
}