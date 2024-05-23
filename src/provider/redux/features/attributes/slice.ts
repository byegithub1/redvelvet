'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'attributes',
  initialState: { configs: {} },
  reducers: {
    setAttributes: (state, action: PayloadAction<any>): void => {
      state.configs = action.payload
    }
  }
})

export const { setAttributes } = slice.actions
export const attributes = (state: any) => state.attributes
export const configs = (state: any) => state.attributes.configs
export default slice.reducer
