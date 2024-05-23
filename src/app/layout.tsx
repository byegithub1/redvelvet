'use client'

import '@/app/_index.css'

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => children

export default RootLayout
