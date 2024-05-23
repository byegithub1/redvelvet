'use client'

import { ConfigProvider as Provider } from 'antd'

const theme = {
  token: {
    colorBgBase: '#fdfdfd',
    colorBgLayout: '#f5f5f5',
    colorPrimary: '#7f2a3c',
    colorLink: '#1b96a7',
    colorTextPlaceholder: '#9ca3af',
    colorBgSpotlight: '#001529',
    colorWhite: '#f9f9f9'
  }
}

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider theme={theme}>{children}</Provider>
}

export default AntdProvider
