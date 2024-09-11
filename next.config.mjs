/** @type {import('next').NextConfig} */
import { config } from 'dotenv';

config(); // .env 파일에서 환경 변수 로드

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
        'timers/promises': false,
      };
    }
    return config;
  },
};
export default {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};