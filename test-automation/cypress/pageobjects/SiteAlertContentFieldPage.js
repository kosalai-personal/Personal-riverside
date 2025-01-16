import testData from "../fixtures/testData.json";

class SiteAlertContentFieldPage {
  getContentTitle() {
    return cy.get("h1.page-title");
  }

  getTitle() {
    return cy.get("h1>span");
  }

  getBody() {
    return cy.get("#block-rivco-theme-content div>p");
  }

  getTitleInput() {
    return cy.get("input[id*='edit-title-']");
  }

  getBodyInput() {
    return cy.get(".ck-content[contenteditable=true]");
  }

  getSeverityDropdown() {
    return cy.get("select#edit-field-bs-alert-severity");
  }

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  validateSiteAlertContentField() {
    cy.visit("/node/add/bootstrap_site_alert");

    this.getContentTitle()
      .contains("Site Alert", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getSeverityDropdown().should("exist").select(1, { force: true });
    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);

    cy.wait(2000);

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertions
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);
    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default SiteAlertContentFieldPage;
