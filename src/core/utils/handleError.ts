import { AxiosError } from 'axios'
import { useError } from '@/core/hooks/useError.ts';
import { ErrorMessageType } from '@/core/models';
import { notification } from '@/core/components/Notifications/notification.tsx';


export const HandleError = (error: unknown) => {
  const { status, message } = useError(error as AxiosError<ErrorMessageType>)

  if (status !== 498 && status !== 401) {
    if (Array.isArray(message)) {
      message.map((nameError) => notification(nameError, 'error'))
    } else {
      notification(message, 'error')
    }
  }

  return {
    status,
    message,
  }
}
