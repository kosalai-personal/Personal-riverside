import TaxonomyPage from "../pageobjects/taxonomyPage";

describe("Verification of Taxonomy Existence", { tags: "all" }, () => {
  const taxonomyPage = new TaxonomyPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should check the existence of taxonomy", () => {
    taxonomyPage.verifyTaxonomy();
  });
});
