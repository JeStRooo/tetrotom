import { FC, useEffect } from 'react';

import styles from './MainPage.module.scss';
import { Header } from '@/core/components/Header';
import { AddPostMenu } from '@/modules/Main/containers/AddPostMenu';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { getNews, getPosts } from '@/modules/Main/service';
import { PostList } from '@/modules/Main/containers/PostList';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { Loader } from '@/shared/Loader';
import { LoadingStage } from '@/core/enum';
import { getApiStatus } from '@/core/utils/getApiStatus.ts';
import { RightSideBar } from '@/modules/Main/containers/RightSideBar';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const postsApiStatus = useAppSelector((state) => state.main.posts.apiStatus!);
  const newsApiStatus = useAppSelector((state) => state.main.news.apiStatus!);
  const postList = useAppSelector((state) => state.main.posts.apiData!);

  const apiStatus = getApiStatus([postsApiStatus, newsApiStatus])

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getNews());
  }, [dispatch]);

  return (
    <>
      {apiStatus === LoadingStage.LOAD ? (
        <>
          <div className={styles.container}>
            <Header title="Home" />
            <AddPostMenu />
            <PostList postList={postList} />
          </div>
          <RightSideBar />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};