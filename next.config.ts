import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xaydungminhnhat.vn',
        port: '',
        pathname: '/wp-content/uploads/**',
        search: '',
      },
    ],
  },
}
export default nextConfig;
