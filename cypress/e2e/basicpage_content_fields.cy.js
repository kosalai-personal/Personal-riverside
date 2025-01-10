import BasicPageContentFieldPage from "../pageobjects/BasicPageContentFieldPage";

describe("Verification of Basic Page Content Field Accessibility", { tags: "all" }, () => {
  const basicPageContentFieldPage = new BasicPageContentFieldPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the user can fill in basic page content fields", () => {
    basicPageContentFieldPage.validateBasicPageContentField();
  });
});
