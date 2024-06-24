import { ToastOptions, TypeOptions } from 'react-toastify'

import styles from './styles.module.scss'
import { Warning } from '@/core/assets/icons/Warning.tsx';
import { Success } from '@/core/assets/icons/Success.tsx';
import { Error } from '@/core/assets/icons/Error.tsx';
import { Info } from '@/core/assets/icons/Info.tsx';


export const iconByType: Record<TypeOptions, JSX.Element> = {
  'success': <Success />,
  'warning': <Warning />,
  'error': <Error />,
  'default': <Info />,
  'info': <Info />,
} as const

export const styleNotification: Record<TypeOptions, string> = {
  'success': styles.success,
  'warning': styles.warning,
  'error': styles.error,
  'default': styles.wrapper__toast,
  'info': styles.info,
} as const

export const NOTIFICATION_OPTIONS: ToastOptions = {
  position: 'top-right',
  hideProgressBar: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  autoClose: 5000,
  draggable: true,
  pauseOnHover: true,
  bodyClassName: `${styles.container}`,
} as const
