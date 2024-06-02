import { configureStore } from '@reduxjs/toolkit'

// import applicationReducer from '@/modules/Application/store'
// import applicationsReducer from '@/modules/Applications/store'
// import userReducer from '@/modules/Auth/store'

export const rootStore = () =>
  configureStore({
    reducer: {
      // user: userReducer,
      // application: applicationReducer,
      // applications: applicationsReducer,
    },
    // devTools: process.env.NODE_ENV === 'development',
  })

export type AppStore = ReturnType<typeof rootStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']