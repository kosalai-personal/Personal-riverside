import WebformContentFieldPage from "../pageobjects/WebformContentFieldPage";

describe("Verification of Webform Content Field Accessibility", { tags: "all" }, () => {
  const webformContentFieldPage = new WebformContentFieldPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the user can fill in webform content fields", () => {
    webformContentFieldPage.validateWebformContentField();
  });
});
