import VideoContentFieldPage from "../pageobjects/VideoContentFieldPage";

describe("Verification of Video Content Field Accessibility", { tags: "all" }, () => {
  const videoContentFieldPage = new VideoContentFieldPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the user can fill in video content fields", () => {
    videoContentFieldPage.validateVideoContentField();
  });
});
