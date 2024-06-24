import React, { useCallback, useState } from 'react';

import styles from './Post.module.scss';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { NavLink, useLocation } from 'react-router-dom';
import { Img } from 'react-image';
import { IPost } from '@/modules/Main/models';
import Comment from '@/core/assets/icons/Comment.svg'
import { LikeButton } from '@/shared/LikeButton';
import { isMatchingRoute } from '@/core/utils/isMatchingRoute.ts';
import cn from 'classnames';
import { updateUser } from '@/modules/Auth/service';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { setLike } from '@/modules/Main/service';
import { Comments } from '@/modules/Main/containers/Comments/Comments.tsx';

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const currentUser = useAppSelector((state) => state.user.currentUser.apiData!) || {};

  const [isShowComments, setIsShowComments] = useState(false);

  const { likes: userLikes, posts } = currentUser || {};

  const { id, avatar, userName, nickName, title, likes, comments, userId } = post || {};

  const isPostLiked = !!currentUser?.likes?.find((like => like?.id === post?.id));

  const handleSetLike = useCallback(() => {
    const updatedLikes = isPostLiked ? likes - 1 : likes + 1;

    const isExistLike = userLikes?.some((like) => like.id === post.id);
    const isMyPost = posts?.some((currentPost) => currentPost?.id === post?.id);

    const currentPost = {
      ...post,
      likes: updatedLikes,
      liked: !post.liked,
    };

    let updatedLikesList;
    if (isExistLike) {
      updatedLikesList = userLikes.filter((like) => like.id !== post.id);
    } else {
      updatedLikesList = [...userLikes, currentPost];
    }

    const updatedPosts = isMyPost
      ? posts.map((currentPost) =>
        currentPost.id === post.id ? { ...currentPost, ...currentPost, likes: updatedLikes, liked: !currentPost.liked } : currentPost
      )
      : posts;

    const updatedUserData = {
      ...currentUser,
      likes: updatedLikesList,
      posts: updatedPosts,
    };

    dispatch(setLike({ id, post: currentPost }));
    dispatch(updateUser({ id: userId, userData: updatedUserData }));
  }, [isPostLiked, likes, userLikes, posts, post, currentUser, dispatch, id, userId]);

  const isProfileRoute = isMatchingRoute('/profile/:id', pathname);

  const handleShowComments = () => {
    setIsShowComments(prevState => !prevState)
  }

  return (
    <div className={cn(styles.post, { [styles.isProfileRoute]: isProfileRoute })}>
      <div className={styles.postInfo}>
        <NavLink to={`/profile/${userId}`}>
          <Img src={avatar} alt="Аватар" className={styles.userAvatar} />
        </NavLink>
        <div className={styles.container}>
          <div className={styles.userNames}>
            <p className={styles.name}>{userName}</p>
            <p className={styles.nickName}>@{nickName}</p>
          </div>
          <p className={styles.title}>{title}</p>
        </div>
      </div>
      <div className={styles.postActions}>
        <LikeButton likes={likes} liked={isPostLiked} setPostLikes={handleSetLike} />
        <div className={styles.commentsContainer}>
          <Img src={Comment} alt='Comments' className={styles.commentsIcon} onClick={handleShowComments} />
          <p className={styles.comments}>{comments.length}</p>
        </div>
      </div>
      {isShowComments && (
        <Comments comments={comments} post={post} />
      )}
    </div>
  );
};