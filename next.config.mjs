/** @type {import('next').NextConfig} */
import { config } from 'dotenv';
config(); // Load .env file

export default {
  env: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        'mock-aws-s3': false,
        'aws-sdk': false,
        nock: false
      };
    }
    return config;
  }
};
