import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { rootStore } from '@/core/store';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/core/common/routes.tsx';
import 'react-toastify/dist/ReactToastify.css'
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={rootStore()}>
    <ConfigProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
