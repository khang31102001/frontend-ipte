/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
        {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
       {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: "/**", 
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: "/**", 
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
