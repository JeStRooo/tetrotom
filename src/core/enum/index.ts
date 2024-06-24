export const NEWS_API_KEY = '7ddd4d3af989421793fe601b62b1601c';

export const NEWS_API_BASE_URL = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=';

export enum LoadingStage {
  LOAD = 'LOAD',
  LOADING = 'LOADING',
}

export enum Api {
  POSTS = 'posts',
  USERS = 'users',
  NEWS = `${NEWS_API_BASE_URL}${NEWS_API_KEY}`
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
  REGISTRATION = '/auth/registration',
  LOGIN = '/auth/login',
  MAIN = '/main-page',
  PROFILE = '/profile/:id'
}