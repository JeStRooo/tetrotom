import React, { useState } from 'react';
import { Avatar, Button, Form, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

import styles from './AddComment.module.scss';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { notification } from '@/core/components/Notifications/notification.tsx';
import { LoadingStage } from '@/core/enum';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { createComment } from '@/modules/Main/service';
import { IPost } from '@/modules/Main/models';

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

interface AddCommentProps {
  post: IPost;
}

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <div className={styles.editor}>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export const AddComment: React.FC<AddCommentProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');

  const currentUser = useAppSelector((state) => state.user.currentUser.apiData!) || {};
  const apiStatus = useAppSelector((state) => state.main.comments.apiStatus!) || {};

  const { avatar, userName, userId, nickName } = currentUser || {};

  const handleSubmit = () => {
    if (!value.trim()) {
      notification('The field must not be empty!', 'error');
      return;
    }

    const currentComment = {
      id: moment.now(),
      likes: 0,
      title: value,
      userName,
      userId,
      nickName,
      avatar,
    }

    const currentPost = {
      ...post,
      comments: [...post.comments, currentComment]
    }

    dispatch(createComment({ id: post?.id, post: currentPost })).then(() => setValue(''))
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.addComment}>
      <Avatar src={avatar} />
      <Editor onChange={handleChange} onSubmit={handleSubmit} submitting={apiStatus === LoadingStage.LOADING} value={value} />
    </div>
  )
}