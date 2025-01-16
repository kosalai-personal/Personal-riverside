import testData from "../fixtures/testData.json";
const env = Cypress.env("env");
let editUrl;

class ContentCRUDPage {
  getContentTitle() {
    return cy.get("h1.page-title");
  }

  getTitleInput() {
    return cy.get("input[id*='edit-title-']");
  }

  getStartDateInput() {
    return cy.get("input[id*='start-date']");
  }

  getStartTimeInput() {
    return cy.get("input[id*='start-time']");
  }

  getEndTimeInput() {
    return cy.get("input[id*='end-time']");
  }

  getEndDateInput() {
    return cy.get("input[id*='end-date']");
  }

  getFirstNameInput() {
    return cy.get("input[id*='edit-field-person-fname']");
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

  getTitle() {
    return cy.get("h1");
  }

  getBody() {
    return cy.get("#block-rivco-theme-content div>p");
  }

  getSaveButton() {
    return cy.get("#edit-submit");
  }

  getMessage() {
    return cy.get(".messages--status a");
  }

  getDeleteMessage() {
    return cy.get(".messages--status em");
  }

  getContentEditTitle() {
    return cy.get("#edit-title");
  }

  getFilterButton() {
    return cy.get("#edit-submit-content");
  }

  getEditButton() {
    return cy.xpath("//nav[@class='tabs notranslate']//a[text()='Edit']");
  }

  getDeleteButton() {
    return cy.xpath("//nav[@class='tabs notranslate']//a[text()='Delete']");
  }

  getDeleteTitle() {
    return cy.get("h1.page-title>em");
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

  validateContentCRUD(endpoint, content) {
    cy.visit(endpoint);
    this.getContentTitle()
      .contains(content, { matchCase: false })
      .should("be.visible");

    this.getTitleInput().should("exist").type(testData.title);

    if (content == "Event") {
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
    } else if (content == "Person") {
      this.getFirstNameInput().should("exist").type(testData.firstname);
    } else if (content == "Site Alert") {
      this.getSeverityDropdown().should("exist").select(1, { force: true });
      this.getBodyInput()
        .should("exist")
        .click({ force: true })
        .realType(testData.body);
    }

    this.getPreviewButton().should("exist").click({ force: true });

    // Assertion
    this.getTitle().should("be.visible").should("contain.text", testData.title);

    this.getPreviewBackLink().should("exist").click({ force: true });

    // For lower environment click save and validate
    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getSaveButton().should("exist").click({ force: true });
      this.getMessage()
        .should("be.visible")
        .should("contain.text", testData.title);

      this.getTitle()
        .should("be.visible")
        .should("contain.text", testData.title);

      if (content == "Site Alert") {
        this.getBody()
          .should("be.visible")
          .should("contain.text", testData.body);
      }

      this.getEditButton()
        .should("exist")
        .invoke("attr", "href")
        .then((edit_url) => {
          editUrl = edit_url;
          cy.visit(editUrl);
          this.getTitleInput().should("contain.value", testData.title);

          this.getTitleInput().clear().type(testData.titleUpdated);

          this.getSaveButton().should("exist").click({ force: true });
          this.getMessage()
            .should("be.visible")
            .should("contain.text", testData.titleUpdated);

          this.getTitle()
            .should("be.visible")
            .should("contain.text", testData.titleUpdated);
          if (content == "Site Alert") {
            this.getBody()
              .should("be.visible")
              .should("contain.text", testData.body);
          }
        });
    }
  }

  deleteContent() {
    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getDeleteButton()
        .should("exist")
        .invoke("attr", "href")
        .then((delete_url) => {
          cy.visit(delete_url);
          this.getDeleteTitle().should("contain.text", testData.titleUpdated);
          this.getSaveButton().should("exist").click({ force: true });
          this.getDeleteMessage().should("contain.text", testData.titleUpdated);
          cy.request({
            url: editUrl,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.status).to.not.equal(200);
          });
        });
    } else {
      assert.ok("Testing in prod, no need to delete content");
    }
  }

  verifyEmptySubmission(endpoint, content) {
    cy.visit(endpoint);
    this.getContentTitle()
      .contains(content, { matchCase: false })
      .should("be.visible");
    this.getTitleInput().should("exist");
    this.getSaveButton().should("exist").click({ force: true });
    cy.get("input[id*='edit-title-']:invalid")
      .invoke("prop", "validationMessage")
      .should("contain", "Please fill");
  }
}

export default ContentCRUDPage;
