import { configureStore } from '@reduxjs/toolkit'
import modulesReducer from './slices/modulesSlice'

export const store = configureStore({
  reducer: {
    modules: modulesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
