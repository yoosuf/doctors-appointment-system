const nextTranslate = require('next-translate-plugin')

const withTM = require('next-transpile-modules')([])

module.exports = nextTranslate(
  withTM({
    // any other general next.js settings
  })
)

module.exports = {
  crossOrigin: 'anonymous',
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: [
      'localhost',
      'api.staging.cloud.vinixtech.net',
      'apiquality.snapcrack.com',
    ],
  },
}
