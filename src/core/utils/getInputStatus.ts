import { CheckedInput } from '@/core/models';

export const getInputStatus = <T>({ errors, touched, inputName }: CheckedInput<T>): '' | 'error' | 'warning' | undefined => {
  const touchedField = touched[inputName];
  const errorField = errors[inputName];

  if (touchedField && typeof errorField === 'string') {
    return 'error';
  }

  return '';
};