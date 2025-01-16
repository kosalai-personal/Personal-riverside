import NewsContentFieldPage from "../pageobjects/NewsContentFieldPage";

describe(
  "Verification of News Content Field Accessibility",
  { tags: "all" },
  () => {
    const newsContentFieldPage = new NewsContentFieldPage();

    beforeEach(() => {
      cy.login();
    });

    it("Should check the user can fill in news content fields", () => {
      newsContentFieldPage.validateNewsContentField();
    });
  }
);
