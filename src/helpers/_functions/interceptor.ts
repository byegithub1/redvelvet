'use client'

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import { store } from '@/provider/redux/store'
import { setCredentials } from '@/provider/redux/features/auth/slice'

const _instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  auth: {
    username: process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME!,
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD!
  },
  withCredentials: true,
  responseType: 'json'
})

const interceptor = (_instance: AxiosInstance) => {
  const repeater = _instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Reject promise if usual error
      if (error.response.data.code !== 401) return Promise.reject(error)
      if (!error.response.data.feed.match(/\b(token|expired)\b/gi)) return Promise.reject(error)

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      if (repeater) _instance.interceptors.response.eject(repeater)

      try {
        const state = store.getState()
        const accessToken = state.auth.accessToken

        const response = await _instance.get('/api/v0/auth/refresh')
        const data = response.data.data

        store.dispatch(setCredentials({ ...data }))
        error.config.headers['x-authorization'] = accessToken

        return _instance(error.config)
      } catch (error) {
        localStorage.clear()
        window.location.replace('/')
        return Promise.reject(error)
      }
    }
  )

  _instance
    .get('/api/v0/auth/csrf')
    .then((response: AxiosResponse) => (_instance.defaults.headers.post['x-csrf-token'] = response.data.data.CSRFToken))
    .catch((error: AxiosError) => {
      //
    })
}

interceptor(_instance)

export { _instance }
