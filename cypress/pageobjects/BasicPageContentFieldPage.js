import testData from "../fixtures/testData.json";

class BasicPageContentFieldPage {
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

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  getAddMediaImage() {
    return cy.get("#edit-field-media-images-open-button");
  }

  getAddMediaFile() {
    return cy.get("[id*='edit-field-media-files-open-button']");
  }

  getMapInput() {
    return cy.get("input[id*='edit-field-maps']");
  }

  getFirstImage() {
    return cy.get(".media-library-wrapper .field__item>img");
  }

  getSelectedImage() {
    return cy.get(
      "[id*='edit-field-media-images-selection-'] .field__item>img"
    );
  }

  getSelectedFile() {
    return cy.get("[id*='edit-field-media-files-selection-'] .field__item>img");
  }

  getInsertBtn() {
    return cy.get(".ui-dialog-buttonset>button.ui-button");
  }

  mediaTypeAuthContainer() {
    cy.wait(3000);
    cy.document().then((doc) => {
      const element = doc.querySelector("#acquia-dam-user-authorization-skip");
      if (element) {
        cy.wrap(element).click({ force: true });
        assert.ok("Media Authorization found and clicked");
      } else {
        assert.ok("Media Authorization not found on the page");
      }
    });
  }

  mediaTypeSelectContainer() {
    cy.wait(3000);

    cy.document().then((doc) => {
      const mediaSelect = doc.querySelector(
        "#acquia-dam-source-menu-wrapper select.form-select > option:not(selected)"
      );
      if (mediaSelect) {
        cy.get("#acquia-dam-source-menu-wrapper select.form-select").select(
          "core",
          { force: true }
        );
        assert.ok("Media Select found and selected");
      } else {
        assert.ok("Media Select already selected on the page");
      }
    });
  }

  mediaEmptyContainer(alias, locator) {
    cy.wait(3000);
    cy.document().then((doc) => {
      const element = doc.querySelector(
        ".media-library-wrapper .field__item>img"
      );
      if (element) {
        // Set to true if this step is successful
        this.getFirstImage().should("exist").invoke("attr", "src").as(alias);
        this.getFirstImage().should("exist").first().click({ force: true });
        this.getInsertBtn()
          .should("exist")
          .should("be.enabled")
          .click({ force: true });

        assert.ok("Media Image found and clicked");
        locator()
          .should("exist")
          .invoke("attr", "src")
          .then((selectedSrc) => {
            cy.get("@" + alias).should("equal", selectedSrc);
          });
      } else {
        assert.ok("Media Image not found on the page");

        cy.get("button.ui-dialog-titlebar-close")
          .should("be.enabled")
          .click({ force: true });
      }
    });
  }

  validateBasicPageContentField() {
    cy.visit("/node/add/page");

    this.getContentTitle()
      .contains("Basic page", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);
    this.getMapInput().should("exist").type(testData.map);

    this.getAddMediaImage().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer("initialSrc", this.getSelectedImage.bind(this));

    this.getAddMediaFile().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer("initialFileSrc", this.getSelectedFile.bind(this));

    cy.wait(2000);

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertions
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);
    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default BasicPageContentFieldPage;
