import React from 'react';
import cn from 'classnames';
import styles from './RouteLinks.module.scss';
import { NavLink } from 'react-router-dom';
import { Routes } from '@/core/enum';
import Home from '@/core/assets/images/Home.svg';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { Img } from 'react-image';
import { Spin } from 'antd';

export const RouteLinks: React.FC = () => {
  const { avatar, id } = useAppSelector((state) => state.user.currentUser.apiData!) || {}

  const routes = [
    {
      img: Home,
      title: 'Home',
      path: Routes.MAIN,
    },
    {
      img: avatar,
      title: 'Profile',
      path: `/profile/${id}`,
    },
  ];

  return (
    <nav className={styles.routes}>
      {routes.map(({ path, title, img }) => (
        <NavLink to={path} key={path} className={styles.route}>
          <Img src={img} alt={title} className={cn(title === 'Profile' ? styles.profileImage : styles.image)} loader={<Spin />} />
          <p className={styles.title}>
            {title}
          </p>
        </NavLink>
      ))}
    </nav>
  );
}