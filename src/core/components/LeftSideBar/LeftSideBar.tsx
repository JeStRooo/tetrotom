import React from 'react';

import styles from './LeftSideBar.module.scss';
import LogoDark from '@/core/assets/images/logo_dark.svg'
import { RouteLinks } from '@/core/components/RouteLinks';
import { useLocation } from 'react-router-dom';
import { Routes } from '@/core/enum';

export const LeftSideBar: React.FC = () => {
  const { pathname } = useLocation();

  const isPublicPage = pathname === Routes.REGISTRATION || pathname === Routes.LOGIN;

  return (
    <div className={styles.leftSideBar}>
      <img src={LogoDark} alt="Tetrotom" className={styles.logo} />
      {!isPublicPage && <RouteLinks />}
    </div>
  )
}
