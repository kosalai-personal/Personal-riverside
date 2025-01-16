import RFPContentFieldPage from "../pageobjects/RFPContentFieldPage";

describe("Verification of RFP Content Field Accessibility", { tags: "all" }, () => {
  const rfpContentFieldPage = new RFPContentFieldPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the user can fill in rfp content fields", () => {
    rfpContentFieldPage.validateRFPContentField();
  });
});
