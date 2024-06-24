import { FormikErrors, FormikTouched } from 'formik';
import { LoadingStage } from '@/core/enum';

export interface CheckedInput<T> {
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  inputName: keyof T;
}

export type ErrorMessageType = {
  status: number | null
  message: string
}

export interface ApiStatusError<T = ErrorMessageType> {
  error: T;
}

/**
 * @param T - Тип apiData
 * @param E - Тип ошибки (apiStatus -> error)
 */
export interface ApiStatusState<T> {
  apiData: T | null;
  apiStatus: LoadingStage | null;
  apiError: ErrorMessageType | null;
}