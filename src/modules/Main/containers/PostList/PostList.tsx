import React, { useMemo } from 'react';

import styles from './PostList.module.scss';
import { Post } from '@/modules/Main/containers/Post';
import { IPost } from '@/modules/Main/models';

interface PostListProps {
  postList: IPost[]
}

export const PostList: React.FC<PostListProps> = ({ postList }) => {
  const reversedPostList = useMemo(() => postList ? [...postList].reverse() : [], [postList]);

  return (
     <div className={styles.postList}>
       {reversedPostList?.map((post) => (
         <Post post={post} key={post.id} />
       ))}
     </div>
   )
}