/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    // images: {
      // domains: ['lh3.googleusercontent.com', 'd106p58duwuiz5.cloudfront.net', "images.sympla.com.br", "s3.guicheweb.com.br", 
      // "images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com"],
    // },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig