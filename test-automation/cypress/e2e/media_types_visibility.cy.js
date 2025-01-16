import MediaTypesPage from "../pageobjects/MediaTypesPage";

describe("Verification of Media Types Existence", { tags: "all" }, () => {
  const mediaTypesPage = new MediaTypesPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the existence of media types", () => {
    mediaTypesPage.verifyMediaTypes();
  });
});
