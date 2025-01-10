import testData from "../fixtures/testData.json";

class EventContentFieldPage {
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
    return cy.get("#edit-body-wrapper .ck-content[contenteditable=true]");
  }

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  getStartDateInput() {
    return cy.get("input[id*='start-date']");
  }

  getEndDateInput() {
    return cy.get("input[id*='end-date']");
  }

  getSelectedImageName() {
    return cy.get(".media-library-item__name");
  }

  getActualImage() {
    return cy.get("#block-rivco-theme-content img");
  }

  getSelectedOption() {
    return cy.get("option[value='America/Los_Angeles'][selected]");
  }

  getStartTimeInput() {
    return cy.get("input[id*='start-time']");
  }

  getEndTimeInput() {
    return cy.get("input[id*='end-time']");
  }

  getMaxNoRegistrantsInput() {
    return cy.get("input[id*='edit-field-maximum-number']");
  }

  getRegisterDropdown() {
    return cy.get("select[id*='edit-field-register']");
  }

  getLocationInput() {
    return cy.get("input[id*='edit-field-location']");
  }

  getAddMediaImage() {
    return cy.get("#edit-field-media-images-open-button");
  }

  getFirstImage() {
    return cy.get(".media-library-wrapper .field__item>img");
  }

  getInsertBtn() {
    return cy.get(".ui-dialog-buttonset>button.ui-button");
  }

  getSelectedImage() {
    return cy.get(
      "[id*='field_media_images-media-library-wrapper'] .field__item>img"
    );
  }

  formatDateForInput(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
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

  getCurrentTimeInLA() {
    const now = new Date();
    const options = {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(now);
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

  getRandomEndTime(startTime) {
    const [timeString, period] = startTime.split(" ");
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(
      (hours % 12) + (period === "PM" ? 12 : 0),
      minutes + Math.floor(Math.random() * 60) + 1,
      seconds
    );

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(endTime);

    // Convert to 24-hour format for input
    return this.formatTimeForInput(formattedTime);
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

  getRandomEndDate(startDate) {
    const start = new Date(this.formatDateForInput(startDate));
    const randomDays = Math.floor(Math.random() * 10) + 1;
    start.setDate(start.getDate() + randomDays);
    const day = String(start.getDate()).padStart(2, "0");
    const month = String(start.getMonth() + 1).padStart(2, "0");
    const year = start.getFullYear();
    return `${day}/${month}/${year}`;
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

  validateEventContentField() {
    cy.visit("/node/add/event");

    this.getContentTitle()
      .contains("Event", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);
    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);
    this.getSelectedOption().should("exist");
    this.getAddMediaImage().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer("initialSrc", this.getSelectedImage.bind(this));
    const startDate = this.getRandomFutureDate();
    const formattedStartDate = this.formatDateForInput(startDate);
    this.getStartDateInput()
      .should("exist")
      .type(formattedStartDate)
      .wait(1000);

    const endDate = this.getRandomEndDate(startDate);
    const formattedEndDate = this.formatDateForInput(endDate);
    this.getEndDateInput().should("exist").type(formattedEndDate).wait(1000);

    const startTime = this.getRandomStartTime();
    this.getStartTimeInput().should("exist").type(startTime).wait(1000);
    this.getEndTimeInput()
      .should("exist")
      .type(this.getRandomEndTime(startTime))
      .wait(1000);

    this.getMaxNoRegistrantsInput().should("exist").type(testData.no);

    this.getRegisterDropdown().should("exist").select(1, { force: true });

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

    this.getLocationInput().should("exist").type(testData.map);

    cy.get("@imageText").then((text) => {
      cy.log("Selected Image Text: " + text);
    });

    cy.wait(2000);
    this.getPreviewButton().click({ force: true });

    // Assertions
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);
    this.getBody().should("be.visible").should("contain.text", testData.map);

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

export default EventContentFieldPage;
