import React from 'react';
import { IComment, IPost } from '@/modules/Main/models';

import styles from './Comments.module.scss';
import { Comment } from '@/shared/Comment/Comment.tsx';
import { AddComment } from '@/shared/AddComment';

interface CommentsProps {
  comments: IComment[];
  post: IPost;
}

export const Comments: React.FC<CommentsProps> = ({ comments, post }) => {

  return (
    <div className={styles.comments}>
      {comments?.map((comment) => (
        <Comment comment={comment} key={comment?.id} />
      ))}
      <AddComment post={post} />
    </div>
  );
};