
import { ToastBodyProps } from './Notification.types'

import styles from './styles.module.scss'
import { FC } from 'react';

const NotificationBody: FC<ToastBodyProps> = ({ message }) => (
  <div className={styles.wrapper}>
    <div className={styles.message}>{message}</div>
  </div>
)

export default NotificationBody
