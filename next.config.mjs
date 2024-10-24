/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tethermax.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prod-tethermax.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
