import './commands'
import "cypress-real-events";
import registerCypressGrep from '@cypress/grep/src/support'
registerCypressGrep()
require('@cypress/xpath');

const sites = require('../fixtures/sites.json');

Cypress.on('test:before:run', (attributes, test) => {
  const siteName = Cypress.env('site');
  const environment = Cypress.env('env') || 'dev';

  if (siteName && sites[siteName]) {
    const baseUrl = sites[siteName][environment];
    Cypress.config('baseUrl', baseUrl);
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  return false;
});

import addContext from "mochawesome/addContext";

const titleToFileName = (title) =>
  title.replace(/[:\/]/g, '')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let parent = runnable.parent
    let filename = ''
    while (parent && parent.title) {
      filename = `${titleToFileName(
        parent.title,
      )} -- ${filename}`
      parent = parent.parent
    }
    filename += `${titleToFileName(
      test.title,
    )} (failed).png`
    addContext(
      { test },
      `../screenshots/${Cypress.spec.name}/${filename}`,
    )
  }
  // always add the video
  addContext({ test }, `../videos/${Cypress.spec.name}.mp4`)
})