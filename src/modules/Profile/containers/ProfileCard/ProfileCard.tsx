import React, { useCallback, useState } from 'react';

import styles from './ProfileCard.module.scss';
import { Button } from 'antd';
import { Img } from 'react-image';
import { EditProfile } from '@/modules/Profile/containers/EditProfile';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProfileCardProps {
  colorProfile: string,
  avatar: string,
  userName: string,
  nickName: string,
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ colorProfile, avatar, userName, nickName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  const currentUserId = Cookies.get('user_id');

  const handleCancel = useCallback(() => setIsModalOpen(false), []);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

  return (
    <div className={styles.profileCard}>
      <div style={{ background: colorProfile }} className={styles.colorBlock} />
      <div className={styles.container}>
        <div className={styles.profileInfo}>
          <Img src={avatar} className={styles.profileImage} />
          <div className={styles.userNames}>
            <h2 className={styles.userName}>{userName}</h2>
            <p className={styles.nickName}>@{nickName}</p>
          </div>
        </div>
        {currentUserId === id && (
          <Button type="primary" onClick={handleOpenModal}>
            Edit Profile
          </Button>
        )}
      </div>
      <EditProfile isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};