'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { identity: undefined, accessToken: undefined },
  reducers: {
    setCredentials: (state, action: PayloadAction<any>): void => {
      const { identity, accessToken } = action.payload
      state.identity = identity
      state.accessToken = accessToken
    },
    signOut: (state, action: PayloadAction<any>): void => {
      state.identity = undefined
      state.accessToken = undefined
    }
  }
})

export const { setCredentials, signOut } = slice.actions
export const currentIdentity = (state: any) => state.auth.identity
export const currentToken = (state: any) => state.auth.accessToken
export default slice.reducer
