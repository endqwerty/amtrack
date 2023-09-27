const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'wrhdxi',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    userAgent:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36',
    viewportHeight: 900,
    viewportWidth: 1440,
    modifyObstructiveCode: true,
    experimentalModifyObstructiveThirdPartyCode: true,
  },
})
