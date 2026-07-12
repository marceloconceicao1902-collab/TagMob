import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/crm", destination: "/negocios", permanent: true },
      { source: "/leads", destination: "/negocios", permanent: true },
      { source: "/contatos", destination: "/negocios", permanent: true },
      { source: "/atividades", destination: "/negocios", permanent: true },
      { source: "/construtora", destination: "/negocios", permanent: true },
    ];
  },
};

export default nextConfig;
