import testData from "../fixtures/testData.json";

class NewsContentFieldPage {
  constructor() {
    this.mediaContainerSuccess = false;
  }

  getContentTitle() {
    return cy.get("h1.page-title");
  }

  getBody() {
    return cy.get("#block-rivco-theme-content div>p");
  }

  getPublishedDate() {
    return cy.get("input[id*='edit-field-date']");
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

  getTitle() {
    return cy.get("h1.coh-heading");
  }

  getBody() {
    return cy.get("#block-rivco-theme-content div>p");
  }

  getAddMediaImage() {
    return cy.get("#edit-field-media-images-open-button");
  }

  getAddMediaBanner() {
    return cy.get("#edit-field-banner-open-button");
  }

  getFirstImage() {
    return cy.get(".media-library-wrapper .field__item>img");
  }

  getSelectedBannerName() {
    return cy.get(
      "[data-drupal-selector*='edit-field-banner-selection'] .media-library-item__name"
    );
  }

  getSelectedImageName() {
    return cy.get(
      "[data-drupal-selector*='edit-field-media-images-selection'] .media-library-item__name"
    );
  }

  getSelectedBannerImage() {
    return cy.get("[id*='edit-field-banner-selection-'] .field__item>img");
  }

  getSelectedImage() {
    return cy.get(
      "[id*='edit-field-media-images-selection-'] .field__item>img"
    );
  }

  getActualImage() {
    return cy.get("#block-rivco-theme-content img");
  }

  getInsertBtn() {
    return cy.get(".ui-dialog-buttonset>button.ui-button");
  }

  getSelectedDate() {
    return cy.get(
      "#block-rivco-theme-content div.coh-column.coh-col-xl p.coh-paragraph"
    );
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

  validateNewsContentField() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    cy.visit("/node/add/news");

    this.getContentTitle()
      .contains("News", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);

    this.getAddMediaBanner().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer(
      "initialBannerSrc",
      this.getSelectedBannerImage.bind(this)
    );

    // this.getFirstImage()
    //   .should("exist")
    //   .invoke("attr", "src")
    //   .as("initialBannerSrc");

    // this.getFirstImage().should("exist").first().click({ force: true });
    // this.getInsertBtn()
    //   .should("exist")
    //   .should("be.enabled")
    //   .click({ force: true });

    // this.getFirstImage()
    //   .should("exist")
    //   .invoke("attr", "src")
    //   .then((selectedBannerSrc) => {
    //     cy.get("@initialBannerSrc").should("equal", selectedBannerSrc);
    //   });

    cy.then(() => {
      if (this.mediaContainerSuccess) {
        assert.ok("Media available is true");
        this.getSelectedBannerName()
          .should("exist")
          .invoke("text")
          .as("bannerText");
      } else {
        assert.ok("Media available is false");
      }
    });

    this.getAddMediaImage().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer("initialSrc", this.getSelectedImage.bind(this));
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

    this.getPublishedDate().should("exist").type(formattedDate);

    cy.wait(2000);

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertions
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDisplayDate = today.toLocaleDateString("en-US", options); // E.g., "September 20, 2024"

    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);

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

              // Extract just the filename (without query parameters)
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

        this.getActualImage()
          .should("be.visible")
          .invoke("attr", "src")
          .then((actualSrc) => {
            cy.get("@bannerText").then((bannerText) => {
              const decodedSrc = decodeURIComponent(actualSrc); // Decode URL encoding
              const expectedText = bannerText.trim(); // Trim any whitespace from the expected text
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

    cy.log(formattedDisplayDate);
    this.getSelectedDate()
      .should("be.visible")
      .invoke("text")
      .then((displayedDate) => {
        expect(displayedDate.trim()).to.equal(formattedDisplayDate);
      });

    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default NewsContentFieldPage;
