import React from 'react';
import { IComment } from '@/modules/Main/models';
import cn from 'classnames';
import styles from './Comment.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { isMatchingRoute } from '@/core/utils/isMatchingRoute.ts';
import { Avatar } from 'antd';
// import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';

interface CommentProps {
  comment: IComment
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  // const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { avatar, userId, userName, nickName, title } = comment || {};

  const isProfileRoute = isMatchingRoute('/profile/:id', pathname);

  return (
    <div className={cn(styles.post, { [styles.isProfileRoute]: isProfileRoute })}>
      <div className={styles.postInfo}>
        <NavLink to={`/profile/${userId}`}>
          <Avatar src={avatar} alt="Аватар" />
        </NavLink>
        <div className={styles.container}>
          <div className={styles.userNames}>
            <p className={styles.name}>{userName}</p>
            <p className={styles.nickName}>@{nickName}</p>
          </div>
          <p className={styles.title}>{title}</p>
        </div>
      </div>
    </div>
  )
}
