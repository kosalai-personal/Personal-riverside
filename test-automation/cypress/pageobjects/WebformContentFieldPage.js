import testData from "../fixtures/testData.json";

class WebformContentFieldPage {
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

  getWebformDropdown() {
    return cy.get("select[id*='edit-webform']");
  }

  getWebformSettings() {
    return cy.get("[id*='edit-webform'] summary.claro-details__summary");
  }

  getWebformOpen() {
    return cy.get("[id*='status-open']:checked");
  }

  getForm() {
    return cy.get("form.webform-submission-form");
  }

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  validateWebformContentField() {
    cy.visit("/node/add/webform");

    this.getContentTitle()
      .contains("Webform", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getWebformDropdown().should("exist").select(1, { force: true });
    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);

    this.getWebformSettings().should("exist").click({ force: true });
    this.getWebformOpen().should("exist");

    cy.wait(2000);

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertions
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);
    this.getForm().should("be.visible");
    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default WebformContentFieldPage;
