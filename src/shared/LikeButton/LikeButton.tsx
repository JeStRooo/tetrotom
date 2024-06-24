import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';

import styles from './LikeButton.module.scss';
import React from 'react';

interface LikeButtonProps {
  liked: boolean;
  likes: number;
  setPostLikes: any;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ likes, liked, setPostLikes }) => (
  <div className={styles.likeContainer}>
    <IconButton onClick={setPostLikes}>
      {liked ? (
        <FavoriteIcon style={{ color: 'red', width: '20px' }} />
      ) : (
        <FavoriteBorderOutlinedIcon style={{ color: 'grey', width: '20px' }} />
      )}
    </IconButton>
    <p className={styles.likes}>{likes}</p>
  </div>
);

