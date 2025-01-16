import testData from "../fixtures/testData.json";

class PersonContentFieldPage {
  constructor() {
    this.mediaContainerSuccess = false;
  }

  getContentTitle() {
    return cy.get("h1.page-title");
  }

  getTitle() {
    return cy.get("h1.coh-heading");
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

  getFirstNameInput() {
    return cy.get("input[id*='edit-field-person-fname']");
  }

  getLastNameInput() {
    return cy.get("input[id*='edit-field-person-lname']");
  }

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  getAddMediaImage() {
    return cy.get("#edit-field-media-image-open-button");
  }

  getFirstImage() {
    return cy.get(".media-library-wrapper .field__item>img");
  }

  getSelectedImage() {
    return cy.get("[id*='edit-field-media-image-selection-'] .field__item>img");
  }

  getInsertBtn() {
    return cy.get(".ui-dialog-buttonset>button.ui-button");
  }

  getTitlesWrapperInput() {
    return cy.get("#edit-field-person-titles-wrapper .form-textarea-wrapper");
  }

  getPhoneInput() {
    return cy.get("input[id*='edit-field-person-phone']");
  }

  getEmailInput() {
    return cy.get("input[id*='edit-field-person-email']");
  }

  getTitlesWrapper() {
    return cy.get("h1+div>div");
  }

  getPhone() {
    return cy.get("h3+div");
  }

  getActualImage() {
    return cy.get("#block-rivco-theme-content img");
  }

  getSelectedImageName() {
    return cy.get(".media-library-item__name");
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
        this.mediaContainerSuccess = true;
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

  validatePersonContentField() {
    const generateRandomPhoneNumber = () => {
      let phoneNumber =
        "9" +
        Math.floor(Math.random() * 1000000000)
          .toString()
          .padStart(9, "0");
      return phoneNumber;
    };
    const randomPhoneNumber = generateRandomPhoneNumber();

    cy.visit("/node/add/person");

    this.getContentTitle()
      .contains("Person", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);
    this.getFirstNameInput().should("exist").type(testData.firstname);
    this.getLastNameInput().should("exist").type(testData.lastname);

    this.getAddMediaImage().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer("initialSrc", this.getSelectedImage.bind(this));
    this.getTitlesWrapperInput()
      .should("exist")
      .type(testData.title)
      .wait(1000);
    this.getPhoneInput().should("exist").type(randomPhoneNumber).wait(1000);
    this.getEmailInput().should("exist").type(testData.email).wait(1000);
    cy.then(() => {
      if (this.mediaContainerSuccess) {
        assert.ok("Media available is true");
        this.getSelectedImageName()
          .should("exist")
          .invoke("text")
          .as("imageText");
      } else {
        assert.ok("Media available is false");
      }
    });
    cy.get("@imageText").then((text) => {
      cy.log("Selected Image Text: " + text);
    });

    cy.wait(2000);

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertions
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);
    this.getTitlesWrapper()
      .should("be.visible")
      .should("contain.text", testData.title);
    this.getPhone()
      .should("be.visible")
      .should("contain.text", randomPhoneNumber);

    cy.then(() => {
      if (this.mediaContainerSuccess) {
        assert.ok("Media available is true");
        this.getActualImage()
          .should("be.visible")
          .and("have.prop", "naturalWidth")
          .should("be.greaterThan", 0);

        this.getActualImage()
          .should("be.visible")
          .invoke("attr", "src")
          .then((actualSrc) => {
            cy.get("@imageText").then((imageText) => {
              const decodedSrc = decodeURIComponent(actualSrc); // Decode URL encoding
              const expectedText = imageText.trim(); // Trim any whitespace from the expected text
              const actualFilename = decodedSrc.split("/").pop().split("?")[0]; // Get the filename from the URL

              // Remove the file extension from the actual filename
              const actualBaseName = actualFilename
                .split(".")
                .slice(0, -1)
                .join("."); // Get the base name without extension

              // Clean the actual base name by removing any suffixes (e.g., _1)
              const cleanedActualBaseName = actualBaseName.replace(
                /(_\d+)?$/,
                ""
              ); // Remove suffixes like _1

              // Get the expected base name (without the file extension)
              const expectedBaseName = expectedText
                .split(".")
                .slice(0, -1)
                .join("."); // Get the expected base name without extension

              // Assert that the cleaned actual base name includes the expected base name
              expect(expectedBaseName).to.include(cleanedActualBaseName);
            });
          });
      } else {
        assert.ok("Media available is false");
      }
    });
    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default PersonContentFieldPage;
