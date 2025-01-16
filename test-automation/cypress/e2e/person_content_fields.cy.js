import PersonContentFieldPage from "../pageobjects/PersonContentFieldPage";

describe("Verification of Person Content Field Accessibility", { tags: "all" }, () => {
  const personContentFieldPage = new PersonContentFieldPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the user can fill in person content fields", () => {
    personContentFieldPage.validatePersonContentField();
  });
});
