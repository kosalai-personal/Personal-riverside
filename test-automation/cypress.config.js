const { defineConfig } = require("cypress");
const { exec } = require("child_process");

module.exports = defineConfig({
  pageLoadTimeout: 600000,
  defaultCommandTimeout: 60000,
  execTimeout: 10000,
  requestTimeout: 90000,
  responseTimeout: 90000,
  reporter: "mochawesome",
  reporterOptions: {
    useInlineDiffs: true,
    embeddedScreenshots: true,
    reportFilename: "[name].html",
    overwrite: true,
    html: true,
    json: true,
    charts: true,
  },
  video: true,
  env: {
    grepOmitFiltered: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', (details) => {
        exec('npm run pretest');
      })
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
  },
});
