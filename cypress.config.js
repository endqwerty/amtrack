const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.amtrak.com',
    viewportHeight: 900,
    viewportWidth: 1440,
    modifyObstructiveCode: true,
    experimentalModifyObstructiveThirdPartyCode: true,
  },
})
