# Test Automation for Multi-Site Functionality 🚀

This project provides test automation to execute functionality testing across all 48 sites in both development and production environments.

## Overview 🎯

This automation suite is designed to validate core backend features across each of the 48 sites. Tests can be configured to run in either the development or production environment, ensuring functionality works smoothly in both.

## File Structure 📂

- Config file - `cypress.config.js`
- Dependency file - `package.json`
- Test files - `(.cypress/e2e/)`
- Page object files - `(.cypress/pageobjects)`
- Support files - `(.cypress/support)`
- Test data files - `(.cypress/fixtures)`
- Screenshots - `(.cypress/screenshots)`
- Videos - `(.cypress/videos)`
- Reports - `(.cypress/results)`

## Usage in Local ⏳

1. **Clone the repository:**

   `git clone url.git` (_*replace `url` with azure git*_)

2. **Install the required dependencies:**

   `cd test-automation && npm i` (_*The test project is under test-automation directory*_)

3. **Run the script:**

   The project is divided into separate modules for functional testing on dev and prod environments. Each module can be used independently by running the following commands:

   - `npm run harivco:dev` (_*To run harivco tests on dev env*_)

   - `npm run harivco:prod` (_*To run harivco tests on prod env*_)

   For more details about custom scripts, please refer to the package.json file. `It has all 48 sites configured scripts.`

## Reporting 📊

   **Run the script:** 
    
  - `npm run generate-report` (_*To generate a HTML report*_)

  Check for `results` directory, inside that open `index.html`. To share the report with client, just compress the `results` directory and share it.
