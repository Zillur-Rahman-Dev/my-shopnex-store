import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  serverExternalPackages: [
    'decimal.js',
    'rate-limiter-flexible',
    'pino',
    'pino-pretty',
    'sharp',
    'libsql',
  ],
  webpack: (webpackConfig, { isServer }) => {
    if (isServer) {
      webpackConfig.externals = [
        ...(webpackConfig.externals || []),
        'bufferutil',
        'utf-8-validate',
        'decimal.js',
        'rate-limiter-flexible',
      ]
    }
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
