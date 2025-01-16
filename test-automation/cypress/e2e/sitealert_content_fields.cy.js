import SiteAlertContentFieldPage from "../pageobjects/SiteAlertContentFieldPage";

describe(
  "Verification of Site Alert Content Field Accessibility",
  { tags: "all" },
  () => {
    const siteAlertContentFieldPage = new SiteAlertContentFieldPage();

    beforeEach(() => {
      cy.login();
    });

    it("Should check the user can fill in site alert content fields", () => {
      siteAlertContentFieldPage.validateSiteAlertContentField();
    });
  }
);
