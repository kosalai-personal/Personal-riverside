import testData from "../fixtures/testData.json";
class RFPContentFieldPage {
  constructor() {
    this.mediaContainerSuccess = false;
  }

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
    return cy.get("#edit-body-wrapper .ck-content[contenteditable=true]");
  }

  getPreviewButton() {
    return cy.get("#edit-preview");
  }

  getPreviewBackLink() {
    return cy.get("#edit-backlink");
  }

  getStartDateInput() {
    return cy.get("input[id*='start-date'][id*='value-date']");
  }

  getEndDateInput() {
    return cy.get("input[id*='end-date'][id*='value-date']");
  }

  getSelectedAddendumsName() {
    return cy.get(
      "[id*='edit-field-media-addendums-selection'] div.media-library-item__name"
    );
  }

  getSelectedResultsName() {
    return cy.get(
      "[id*='edit-field-media-results-selection'] div.media-library-item__name"
    );
  }

  getActualPDFs() {
    return cy.get("a[type='application/pdf']");
  }

  getStartTimeInput() {
    return cy.get("input[id*='start-date'][id*='value-time']");
  }

  getEndTimeInput() {
    return cy.get("input[id*='end-date'][id*='value-time']");
  }

  getAddMediaAddendums() {
    return cy.get("#edit-field-media-addendums-open-button");
  }

  getAddMediaResults() {
    return cy.get("input[id*='edit-field-media-results-open-button']");
  }

  getFirstImage() {
    return cy.get(".media-library-wrapper .field__item>img");
  }

  getSelectedAddendumsImage() {
    return cy.get(
      "[id*='edit-field-media-addendums-selection-'] .field__item>img"
    );
  }

  getSelectedResultsImage() {
    return cy.get(
      "[id*='edit-field-media-results-selection-'] .field__item>img"
    );
  }

  getInsertBtn() {
    return cy.get(".ui-dialog-buttonset>button.ui-button");
  }

  getSelectedStartDate() {
    return cy.xpath(
      "//*[contains(text(),'Start')]/following-sibling::div/time"
    );
  }

  getSelectedEndDate() {
    return cy.xpath(
      "  //*[contains(text(),'End')]/following-sibling::div/time"
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

  validateRFPContentField() {
    cy.visit("/node/add/rfp");

    this.getContentTitle()
      .contains("RFP", { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);

    this.getBodyInput()
      .should("exist")
      .click({ force: true })
      .realType(testData.body);

    this.getAddMediaAddendums().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer(
      "initialAddendumsSrc",
      this.getSelectedAddendumsImage.bind(this)
    );

    cy.wait(2000);
    this.getAddMediaResults().should("exist").click({ force: true });
    this.mediaTypeAuthContainer();
    this.mediaTypeSelectContainer();
    this.mediaEmptyContainer(
      "initialResultsSrc",
      this.getSelectedResultsImage.bind(this)
    );

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

    cy.then(() => {
      if (this.mediaContainerSuccess) {
        assert.ok("Media container success is true");
        this.getSelectedAddendumsName()
          .should("exist")
          .invoke("text")
          .as("addendumsText");
        this.getSelectedResultsName()
          .should("exist")
          .invoke("text")
          .as("resultsText");
      } else {
        assert.ok("Media container success is false");
      }
    });

    cy.wait(2000);

    this.getPreviewButton().click({ force: true });

    // Assertions
    // Helper function to convert dd/mm/yyyy to yyyy-mm-dd
    const convertToISOFormat = (dateStr) => {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month}-${day}`;
    };

    const convertedStartDate = convertToISOFormat(startDate);
    const convertedEndDate = convertToISOFormat(endDate);

    const formattedSelectedStartDate = new Date(
      convertedStartDate
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedSelectedEndDate = new Date(
      convertedEndDate
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    this.getTitle().should("be.visible").should("contain.text", testData.title);
    this.getBody().should("be.visible").should("contain.text", testData.body);

    cy.log("Start Date: " + formattedSelectedStartDate);
    cy.log("End Date: " + formattedSelectedEndDate);
    this.getSelectedStartDate()
      .should("be.visible")
      .should("contain.text", formattedSelectedStartDate);
    this.getSelectedEndDate()
      .should("be.visible")
      .should("contain.text", formattedSelectedEndDate);

    cy.then(() => {
      if (this.mediaContainerSuccess) {
        assert.ok("Media container success is true");

        this.getActualPDFs()
          .should("be.visible")
          .invoke("attr", "href")
          .then((actualHref) => {
            cy.get("@addendumsText").then((addendumsText) => {
              const decodedHref = decodeURIComponent(actualHref);
              const expectedText = addendumsText.trim();
              const actualFilename = decodedHref.split("/").pop().split("?")[0]; // Get the filename from the URL

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

        this.getActualPDFs()
          .should("be.visible")
          .invoke("attr", "href")
          .then((actualHref) => {
            cy.get("@resultsText").then((resultsText) => {
              const decodedHref = decodeURIComponent(actualHref);
              const expectedText = resultsText.trim();
              const actualFilename = decodedHref.split("/").pop().split("?")[0]; // Get the filename from the URL

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
        assert.ok("Media container success is false");
      }
    });

    this.getPreviewBackLink().should("exist").click({ force: true });
  }
}

export default RFPContentFieldPage;
