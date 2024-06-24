import { CheckedInput } from '@/core/models';

export const getHelperText = <T>({ errors, touched, inputName }: CheckedInput<T>): string | null => {
  const touchedField = touched[inputName];
  const errorField = errors[inputName];

  if (touchedField && typeof errorField === 'string') {
    return errorField;
  }

  return null;
};