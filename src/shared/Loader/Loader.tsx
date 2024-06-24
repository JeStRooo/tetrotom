import React from 'react';

import styles from './Loader.module.scss';
import { Spin } from 'antd';

export const Loader: React.FC = () => (
  <div className={styles.loaderContainer}>
    <Spin size="large" />
  </div>
)