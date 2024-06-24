import { configureStore } from '@reduxjs/toolkit'

import mainPageSlice from '@/modules/Main/slices/index.ts'
import authSlice from '@/modules/Auth/slices/index.ts'

export const rootStore = () =>
  configureStore({
    reducer: {
      user: authSlice,
      main: mainPageSlice
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof rootStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']