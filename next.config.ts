/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Permite todas las rutas bajo res.cloudinary.com
      },
    ],
  },
};

module.exports = nextConfig;