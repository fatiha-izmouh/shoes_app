import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.paypal.com https://www.paypalobjects.com https://*.paypal.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://www.paypalobjects.com https://*.paypal.com",
              "connect-src 'self' https://www.paypal.com https://*.paypal.com https://api.paypal.com https://api-m.paypal.com",
              "frame-src 'self' https://www.paypal.com https://*.paypal.com",
              "child-src 'self' https://www.paypal.com https://*.paypal.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
