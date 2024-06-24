import { toast, ToastOptions, TypeOptions } from 'react-toastify'
import classNames from 'classnames'

import {
  iconByType,
  NOTIFICATION_OPTIONS,
  styleNotification,
} from './constants'

import styles from './styles.module.scss'
import NotificationBody from '@/core/components/Notifications/NotificationBody.tsx';

export const notification = (message: string, type: TypeOptions) => {
  const options: ToastOptions = {
    ...NOTIFICATION_OPTIONS,
    className: classNames(styles.wrapper__toast, styleNotification[type]),
    icon: iconByType[type],
    type,
  }

  toast(<NotificationBody message={message} />, options)
}
