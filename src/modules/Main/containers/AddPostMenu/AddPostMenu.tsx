import React, { useCallback, useState } from 'react';

import styles from './AddPostMenu.module.scss';
import { Button } from 'antd';
import { Input } from '@/shared/Input';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { createPost } from '@/modules/Main/service';
import { notification } from '@/core/components/Notifications/notification.tsx';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { Img } from 'react-image';
import { updateUser } from '@/modules/Auth/service';
import { IPost } from '@/modules/Main/models';

export const AddPostMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const userApiData = useAppSelector((state) => state.user.currentUser.apiData!);

  const { avatar, nickName, userName, id, posts } = userApiData || {};

  const [postText, setPostText] = useState('');

  const handleChangePostText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
  }, []);

  const handleCreatePost = useCallback(() => {
    const newPost = {
      photos: [],
      title: postText,
      nickName,
      likes: 0,
      comments: [],
      avatar,
      userName,
      userId: id,
      liked: false,
    };

    if (!postText.trim()) {
      notification('The field must not be empty!', 'error');
      return;
    }

    dispatch(createPost({ post: newPost })).then(({ payload }) => {
      const updatedUserData = {
        ...userApiData,
        posts: [...posts, payload]
      }

      notification('The post was successfully created!', 'success')
      setPostText('')
      // @ts-ignore
      dispatch(updateUser({ id, userData: updatedUserData }))
    });
  }, [avatar, dispatch, id, nickName, postText, userName]);

  return (
    <div className={styles.addPostMenu}>
      <div className={styles.container}>
        <Img src={avatar} alt="You" className={styles.avatar} />
        <div className={styles.postActions}>
          <Input placeholder="What`s happening?" className={styles.addPostInput} value={postText}
                 onChange={handleChangePostText} />
        </div>
      </div>
      <Button type="primary" onClick={handleCreatePost}>
        Post
      </Button>
    </div>
  );
};