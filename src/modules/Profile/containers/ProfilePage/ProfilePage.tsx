import { FC, useEffect } from 'react';

import { Header } from '@/core/components/Header';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { PostList } from '@/modules/Main/containers/PostList';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { Loader } from '@/shared/Loader';
import { LoadingStage } from '@/core/enum';
import { getApiStatus } from '@/core/utils/getApiStatus.ts';
import styles from './ProfilePage.module.scss';
import { ProfileCard } from '@/modules/Profile/containers/ProfileCard';
import { getUser } from '@/modules/Auth/service';
import { useParams } from 'react-router-dom';
import { Empty, Tabs, TabsProps } from 'antd';
import Cookies from 'js-cookie';


export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const currentUserId = Cookies.get('user_id');

  const user = useAppSelector((state) => state.user.user.apiData!) || {};
  const currentUser = useAppSelector((state) => state.user.currentUser.apiData!) || {};
  const userApiStatus = useAppSelector((state) => state.user.user.apiStatus!) || {};

  const currentUserData = currentUserId === id ? currentUser : user;

  const { posts, likes, colorProfile, avatar, nickName, userName } = currentUserData || {};

  const apiStatus = getApiStatus([userApiStatus]);

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Posts',
      children: posts?.length ? <PostList postList={posts} /> : <Empty />,
    },
    {
      key: '2',
      label: 'Likes',
      children: likes?.length ? <PostList postList={likes} /> : <Empty />,
    },
  ];

  useEffect(() => {
    dispatch(getUser({ id: id || '' }))
  }, [dispatch, id]);

  return (
    <>
      {apiStatus === LoadingStage.LOAD ? (
        <div className={styles.profilePage}>
          <Header title="Home" />
          <ProfileCard colorProfile={colorProfile} avatar={avatar} nickName={nickName} userName={userName} />
          <Tabs defaultActiveKey="1" size="large" items={tabItems} onChange={() => {}} className={styles.tabs} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};