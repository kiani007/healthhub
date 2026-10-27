const withTm = require('next-transpile-modules')(['react-countup'])
module.exports = withTm({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
  },
  // Static food-business mockups live in public/food-mockups. These rewrites serve the
  // board at /food-mockups and keep extensionless mockup URLs working with cleanUrls.
  async rewrites() {
    return [
      { source: '/food-mockups', destination: '/food-mockups/index.html' },
      {
        source: '/food-mockups/mockups/:slug',
        destination: '/food-mockups/mockups/:slug.html',
      },
    ]
  },
})
