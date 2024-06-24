import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie'

import { Layout } from '@/core/components/Layout';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { getCurrentUser, getUsers } from '@/modules/Auth/service';
import { PUBLIC_ROUTES } from '@/core/constants';
import { Routes } from '@/core/enum';

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const userId = Cookies.get('user_id');
  const isPublicRouter = PUBLIC_ROUTES.includes(
    pathname as (typeof PUBLIC_ROUTES)[number],
  )

  useEffect(() => {
    if (!userId) return;
    
    dispatch(getCurrentUser({ id: userId }))
    dispatch(getUsers())
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userId && !isPublicRouter) {
      navigate(Routes.REGISTRATION)
    }

    if (userId && isPublicRouter) {
      navigate(Routes.MAIN)
    }
  }, [isPublicRouter, navigate, userId]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default AppRouter