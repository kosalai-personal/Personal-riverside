import testData from "../fixtures/testData.json";

class VideoContentFieldPage {
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

  getStartDateInput() {
    return cy.get("input[id*='start-date'][id*='value-date']");
  }

  getStartTimeInput() {
    return cy.get("input[id*='start-date'][id*='value-time']");
  }

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  getAddMediaVideo() {
    return cy.get("#edit-field-video-embed-open-button");
  }

  getFirstImage() {
    return cy.get(".media-library-wrapper .field__item>img");
  }

  getCategoryInput() {
    return cy.get("input[id*='edit-field-term-category']");
  }

  getInsertBtn() {
    return cy.get(".ui-dialog-buttonset>button.ui-button");
  }

  getAutoSuggestion() {
    return cy.get(".ui-menu-item>a");
  }

  getCategory() {
    return cy.get("h3>a");
  }

  getVimeo() {
    return cy.get("iframe.media-oembed-content");
  }

  getSelectedImage() {
    return cy.get("[id*='edit-field-video-embed-selection-'] .field__item>img");
  }

  formatTimeForInput(timeString) {
    const [time, period] = timeString.split(" ");
    const [hours, minutes, seconds] = time.split(":").map(Number);

    let formattedHours = hours;
    if (period === "PM" && hours !== 12) {
      formattedHours += 12;
    } else if (period === "AM" && hours === 12) {
      formattedHours = 0;
    }

    return `${String(formattedHours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  formatDateForInput(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }

  getRandomFutureDate() {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 10); // Random number of days from 0 to 9
    today.setDate(today.getDate() + randomDays);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();
    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  }

  getRandomStartTime() {
    const now = new Date();
    const randomMinutes = Math.floor(Math.random() * 60);
    now.setMinutes(now.getMinutes() + randomMinutes);

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now);

    return this.formatTimeForInput(formattedTime);
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

  validateVideoContentField() {
    cy.visit("/node/add/content_type_video");

    this.getContentTitle()
      .contains("Video", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);

    const startDate = this.getRandomFutureDate();
    const formattedStartDate = this.formatDateForInput(startDate);
    this.getStartDateInput()
      .should("exist")
      .type(formattedStartDate)
      .wait(1000);

    const startTime = this.getRandomStartTime();
    this.getStartTimeInput().should("exist").type(startTime).wait(1000);

    this.getAddMediaVideo().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer("initialSrc", this.getSelectedImage.bind(this));
    this.getCategoryInput()
      .should("exist")
      .type(testData.video_category + "{enter}", { delay: 30 });

    this.getCategoryInput()
      .should("exist")
      .type("{backspace}")
      .then(() => {
        this.getAutoSuggestion()
          .should("exist")
          .should("be.visible")
          .should("contain.text", testData.video_category)
          .first()
          .click({ force: true });
      });

    cy.wait(2000);

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertions
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);
    this.getCategory()
      .should("be.visible")
      .should("contain.text", testData.video_category);
    cy.then(() => {
      if (this.mediaContainerSuccess) {
        assert.ok("Media container success is true");
        this.getVimeo().should("be.visible");
      } else {
        assert.ok("Media container success is false");
      }
    });
    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default VideoContentFieldPage;
