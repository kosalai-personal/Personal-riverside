class TaxonomyPage {
  getTitle() {
    return cy.get("h1.page-title");
  }

  getTaxonomy() {
    return cy.get("#taxonomy");
  }

  getAudienceTaxonomy() {
    return cy.get(
      "[data-drupal-selector='edit-vocabularies-audience'] div.tabledrag-cell-content__item"
    );
  }

  getCategoryTaxonomy() {
    return cy.get(
      "[data-drupal-selector='edit-vocabularies-category'] div.tabledrag-cell-content__item"
    );
  }

  getEventsCategoryTaxonomy() {
    return cy.get(
      "[data-drupal-selector='edit-vocabularies-events-category'] div.tabledrag-cell-content__item"
    );
  }

  getNewsCategoryTaxonomy() {
    return cy.get(
      "[data-drupal-selector='edit-vocabularies-news-category'] div.tabledrag-cell-content__item"
    );
  }

  getVideoTopicTaxonomy() {
    return cy.get(
      "[data-drupal-selector='edit-vocabularies-video-topic'] div.tabledrag-cell-content__item"
    );
  }

  verifyTaxonomy() {
    cy.visit("/admin/structure/taxonomy");
    this.getTitle()
      .contains("Taxonomy", { matchCase: false })
      .should("be.visible");
    this.getTaxonomy().should("exist").should("be.visible");
    this.getAudienceTaxonomy()
      .should("exist")
      .contains("Audience", { matchCase: false })
      .should("be.visible");
    this.getCategoryTaxonomy()
      .should("exist")
      .contains("Category", { matchCase: false })
      .should("be.visible");
    this.getEventsCategoryTaxonomy()
      .should("exist")
      .contains("Events Category", { matchCase: false })
      .should("be.visible");
    this.getNewsCategoryTaxonomy()
      .should("exist")
      .contains("News Category", { matchCase: false })
      .should("be.visible");
    this.getVideoTopicTaxonomy()
      .should("exist")
      .contains("Video Topic", { matchCase: false })
      .should("be.visible");
  }
}

export default TaxonomyPage;
