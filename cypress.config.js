const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://darling-cheesecake-c962f9.netlify.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
