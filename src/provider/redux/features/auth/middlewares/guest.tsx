'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { currentToken } from '@/provider/redux/features/auth/slice'

const Guest = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useSelector(currentToken)
  const router = useRouter()

  useEffect(() => {
    if (accessToken) router.replace('/-/cpanel', undefined, { shallow: true })
  }, [accessToken, router])

  return !accessToken && children
}

export default Guest
