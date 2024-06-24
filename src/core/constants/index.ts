import { ApiStatusState } from '@/core/models';
import { Routes } from '@/core/enum';

export const BASE_URL = `https://663215e3c51e14d695635207.mockapi.io/api/v1/`;

export const PUBLIC_ROUTES = [
  '/',
  Routes.REGISTRATION,
  Routes.LOGIN,
] as const

export const initialApiState: ApiStatusState<null> = {
  apiData: null,
  apiStatus: null,
  apiError: null,
};