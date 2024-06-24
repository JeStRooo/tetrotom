import axios from 'axios';
import { BASE_URL } from '@/core/constants';

export const configuredAxios = axios.create({
  baseURL: BASE_URL,
})