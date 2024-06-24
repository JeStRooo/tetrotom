import React from 'react';

import styles from './Layout.module.scss';
import { LeftSideBar } from '@/core/components/LeftSideBar/LeftSideBar.tsx';
import { useLocation } from 'react-router-dom';
import { Routes } from '@/core/enum';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const isPublicPage = pathname === Routes.LOGIN || pathname === Routes.REGISTRATION;

  const isMainPage = pathname === Routes.MAIN;

  return (
    <div className={styles.layout}>
      {!isPublicPage && <LeftSideBar />}
      {isMainPage ? (
        <>
          {children}
        </>
      ) : (
        <main className={styles.main}>
          {children}
        </main>
      )}
    </div>
  );
}
