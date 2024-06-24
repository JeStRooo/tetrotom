import { createBrowserRouter } from 'react-router-dom';
import AppRouter from '@/app/AppRouter.tsx';
import { Routes } from '@/core/enum';
import { AuthRegistration } from '@/modules/Auth/containers/AuthRegistration';
import { AuthLogin } from '@/modules/Auth/containers/AuthLogin';
import { MainPage } from '@/modules/Main/containers/MainPage';
import { ProfilePage } from '@/modules/Profile/containers/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRouter />,
    children: [
      {
        path: Routes.REGISTRATION,
        element: <AuthRegistration />,
      },
      {
        path: Routes.LOGIN,
        element: <AuthLogin />,
      },
      {
        path: Routes.MAIN,
        element: <MainPage />,
      },
      {
        path: Routes.PROFILE,
        element: <ProfilePage />,
      },
    ],
    errorElement: null,
  }
]);
