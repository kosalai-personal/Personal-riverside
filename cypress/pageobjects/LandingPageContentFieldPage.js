import testData from "../fixtures/testData.json";

class LandingPageContentFieldPage {
  getContentTitle() {
    return cy.get("h1.page-title");
  }

  getTitle() {
    return cy.get("h1>span");
  }

  getTitleInput() {
    return cy.get("input[id*='edit-title-']");
  }

  getAddCanvasButton() {
    return cy.get("[role='menu']>button[id]");
  }

  getFigureButton() {
    return cy.get("[data-ssa-uid='cpt_cta_banner']>figure+button");
  }

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  getAddedCanvas() {
    return cy.get("[data-type='CTA Banner']");
  }

  getAddCTABanner() {
    return cy.get("div[class*='cta_banner']");
  }

  validateLandingPageContentField() {
    cy.visit("/node/add/landing_page");

    this.getContentTitle()
      .contains("Landing page", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getAddCanvasButton()
      .first()
      .should("exist")
      .should("be.enabled")
      .click({ force: true });

    this.getFigureButton()
      .first()
      .should("exist")
      .should("be.enabled")
      .click({ force: true });
    this.getAddedCanvas().should("exist").should("be.visible");

    cy.wait(2000);

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertions
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getAddCTABanner().should("be.visible");
    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default LandingPageContentFieldPage;
