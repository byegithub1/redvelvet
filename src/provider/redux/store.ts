'use client'

import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import _auth from '@/provider/redux/features/auth/slice'
import _attributes from '@/provider/redux/features/attributes/slice'

import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    }
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

export const store = configureStore({
  reducer: {
    auth: persistReducer({ key: 'auth', storage, version: 1 }, _auth),
    attributes: persistReducer({ key: 'attributes', storage, version: 1 }, _attributes)
  },
  devTools: process.env.NEXT_PUBLIC_APP_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: undefined,
          otherValue: 42
        }
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
