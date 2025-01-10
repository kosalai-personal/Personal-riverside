import LandingPageContentFieldPage from "../pageobjects/LandingPageContentFieldPage";

describe("Verification of Landing Page Content Field Accessibility", { tags: "all" }, () => {
  const landingPageContentFieldPage = new LandingPageContentFieldPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the user can fill in landing  page content fields", () => {
    landingPageContentFieldPage.validateLandingPageContentField();
  });
});
