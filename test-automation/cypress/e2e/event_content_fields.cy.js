import EventContentFieldPage from "../pageobjects/EventContentFieldPage";

describe("Verification of Event Content Field Accessibility", { tags: "all" }, () => {
  const eventContentFieldPage = new EventContentFieldPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the user can fill in event content fields", () => {
    eventContentFieldPage.validateEventContentField();
  });
});
