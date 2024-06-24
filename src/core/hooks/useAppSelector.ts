import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppState } from '@/core/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector