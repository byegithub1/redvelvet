/**
 * -------------------------------------------------------------------------------
 * © rvnrstnsyh All Rights Reserved
 * -------------------------------------------------------------------------------
 *
 * Author : <re@redvelvet.me> (https://redvelvet.me)
 * GitHub : https://github.com/rvnrstnsyh
 * GitLab : https://gitlab.com/rvnrstnsyh
 *
 */

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:7952/api/:path*'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
