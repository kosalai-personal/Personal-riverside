import testData from "../fixtures/testData.json";
const env = Cypress.env("env");
let form_id, form_url;

class WebformPage {
  getWebform() {
    return cy.get(".webform-submission-form");
  }

  getFirstNameInput() {
    return cy.get("input[id*='-name-first']");
  }

  getLastNameInput() {
    return cy.get("input[id*='-name-last']");
  }

  getEmailInput() {
    return cy.get("input[type='email']");
  }

  getCityInput() {
    return cy.get("input[id*='city']");
  }

  getPhoneInput() {
    return cy.get("input#edit-phone");
  }

  getCommentsInput() {
    return cy.get("input#edit-comments");
  }

  getNameInput() {
    return cy.get("input#edit-name");
  }

  getSubjectInput() {
    return cy.get("input[id*='-subject']");
  }

  getMessageInput() {
    return cy.get("#edit-message");
  }

  getSubmitButton() {
    return cy.get(".webform-submission-form .form-submit");
  }

  getQuestionDropdown() {
    return cy.get("select#edit-my-question-is-about");
  }

  getDeleteButton() {
    return cy.get("#edit-submit");
  }

  getWebformConfirmation() {
    return cy.get(".webform-confirmation");
  }

  getMessageStatus() {
    return cy.get(".messages--status");
  }

  getSubmittedDate(email) {
    return cy.xpath(
      `(//a[@href='mailto:${email}']/preceding::a[@class='webform-ajax-link']/parent::td/following-sibling::td)[1]`
    );
  }

  getContactUs0SubmittedDate(email) {
    return cy.xpath(
      `(//a[@href='mailto:${email}']/preceding::td[@class='priority-medium'])[1]`
    );
  }

  getSubmittedForm(email) {
    return cy.xpath(
      `(//a[@href='mailto:${email}']/preceding::td/a[@title])[1]`
    );
  }

  getSubmittedEmail() {
    return cy.get("div[id*='email']>a");
  }

  getSubmittedPhone() {
    return cy.get("div[id*='phone']>a");
  }

  getSubmittedName() {
    return cy.get("div[id*='name']");
  }

  getSubmittedCity() {
    return cy.get("div[id*='city']");
  }

  getSubmittedSubject() {
    return cy.get("div[id*='subject']");
  }

  getSubmittedMessage() {
    return cy.get("div[id*='message']");
  }

  getSubmittedComments() {
    return cy.get("div[id*='comments']");
  }

  getAlertMessage() {
    return cy.get(".messages__content>em");
  }

  verifyCommonWebform() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    cy.visit("/contact");
    this.getWebform().should("exist").should("be.visible");
    this.getEmailInput().should("exist").type(testData.email).wait(2000);
    this.getNameInput().should("exist").type(testData.name).wait(2000);
    this.getSubjectInput().should("exist").type(testData.subject).wait(2000);
    this.getMessageInput().should("exist").type(testData.message).wait(2000);

    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getSubmitButton().should("exist").click({ force: true });
      this.getWebformConfirmation().should("exist").should("be.visible");
      cy.visit("/admin/structure/webform/manage/contact/results/submissions");
      this.getSubmittedForm(testData.email)
        .invoke("text")
        .then((id) => {
          form_id = id;
          cy.log(form_id);
          this.getSubmittedForm(testData.email)
            .invoke("attr", "href")
            .then((url) => {
              form_url = url;
              cy.log(form_url);
              this.getSubmittedDate(testData.email)
                .should("be.visible")
                .should("have.text", formattedDate);
              this.getSubmittedForm(testData.email)
                .should("exist")
                .click({ force: true });
              this.getSubmittedEmail()
                .contains(testData.email, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.name, { matchCase: false })
                .should("be.visible");
              this.getSubmittedSubject()
                .contains(testData.subject, { matchCase: false })
                .should("be.visible");
              this.getSubmittedMessage()
                .contains(testData.message, { matchCase: false })
                .should("be.visible");
            });
        });
    }
  }

  verifyCapriversideWebform() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    cy.visit("/contact");
    this.getWebform().should("exist").should("be.visible");
    this.getNameInput().should("exist").type(testData.name).wait(2000);
    this.getEmailInput().should("exist").type(testData.email).wait(2000);
    this.getMessageInput().should("exist").type(testData.message).wait(2000);

    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getSubmitButton().should("exist").click({ force: true });
      this.getMessageStatus().should("exist").should("be.visible");
      cy.visit("/admin/structure/webform/manage/contact/results/submissions");
      this.getSubmittedForm(testData.email)
        .invoke("text")
        .then((id) => {
          form_id = id;
          cy.log(form_id);
          this.getSubmittedForm(testData.email)
            .invoke("attr", "href")
            .then((url) => {
              form_url = url;
              cy.log(form_url);
              this.getSubmittedDate(testData.email)
                .should("be.visible")
                .should("have.text", formattedDate);
              this.getSubmittedForm(testData.email)
                .should("exist")
                .click({ force: true });
              this.getSubmittedEmail()
                .contains(testData.email, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.name, { matchCase: false })
                .should("be.visible");
              this.getSubmittedMessage()
                .contains(testData.message, { matchCase: false })
                .should("be.visible");
            });
        });
    }
  }

  verifyRivcoemdWebform() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    cy.visit("/contact-us");
    this.getWebform().should("exist").should("be.visible");
    this.getFirstNameInput()
      .should("exist")
      .type(testData.firstname)
      .wait(2000);
    this.getLastNameInput().should("exist").type(testData.lastname).wait(2000);
    this.getEmailInput().should("exist").type(testData.email).wait(2000);
    this.getCommentsInput().should("exist").type(testData.comments).wait(2000);

    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getSubmitButton().should("exist").click({ force: true });
      this.getWebformConfirmation().should("exist").should("be.visible");
      cy.visit(
        "/admin/structure/webform/manage/contact_us/results/submissions"
      );
      this.getSubmittedForm(testData.email)
        .invoke("text")
        .then((id) => {
          form_id = id;
          cy.log(form_id);
          this.getSubmittedForm(testData.email)
            .invoke("attr", "href")
            .then((url) => {
              form_url = url;
              cy.log(form_url);
              this.getSubmittedDate(testData.email)
                .should("be.visible")
                .should("have.text", formattedDate);
              this.getSubmittedForm(testData.email)
                .should("exist")
                .click({ force: true });
              this.getSubmittedEmail()
                .contains(testData.email, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.firstname, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.lastname, { matchCase: false })
                .should("be.visible");
              this.getSubmittedComments()
                .contains(testData.comments, { matchCase: false })
                .should("be.visible");
            });
        });
    }
  }

  verifyRivcoworkforceWebform() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    cy.visit("/form/contact-form");
    this.getWebform().should("exist").should("be.visible");
    this.getNameInput().should("exist").type(testData.name).wait(2000);
    this.getEmailInput().should("exist").type(testData.email).wait(2000);
    this.getMessageInput().should("exist").type(testData.message).wait(2000);

    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getSubmitButton().should("exist").click({ force: true });
      this.getMessageStatus().should("exist").should("be.visible");
      cy.visit(
        "/admin/structure/webform/manage/contact_form/results/submissions"
      );
      this.getSubmittedForm(testData.email)
        .invoke("text")
        .then((id) => {
          form_id = id;
          cy.log(form_id);
          this.getSubmittedForm(testData.email)
            .invoke("attr", "href")
            .then((url) => {
              form_url = url;
              cy.log(form_url);
              this.getSubmittedDate(testData.email)
                .should("be.visible")
                .should("have.text", formattedDate);
              this.getSubmittedForm(testData.email)
                .should("exist")
                .click({ force: true });
              this.getSubmittedEmail()
                .contains(testData.email, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.name, { matchCase: false })
                .should("be.visible");
              this.getSubmittedMessage()
                .contains(testData.message, { matchCase: false })
                .should("be.visible");
            });
        });
    }
  }

  verifySupervisorchuckwashingtonWebform() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    const generateRandomPhoneNumber = () => {
      let phoneNumber =
        "9" +
        Math.floor(Math.random() * 1000000000)
          .toString()
          .padStart(9, "0");
      return phoneNumber;
    };
    const randomPhoneNumber = generateRandomPhoneNumber();

    cy.visit("/contact-us-0");
    this.getWebform().should("exist").should("be.visible");
    this.getFirstNameInput()
      .should("exist")
      .type(testData.firstname)
      .wait(2000);
    this.getLastNameInput().should("exist").type(testData.lastname).wait(2000);
    this.getEmailInput().should("exist").type(testData.email).wait(2000);
    this.getPhoneInput().should("exist").type(randomPhoneNumber).wait(2000);
    this.getSubjectInput().should("exist").type(testData.subject).wait(2000);
    this.getMessageInput().should("exist").type(testData.message).wait(2000);

    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getSubmitButton().should("exist").click({ force: true });
      this.getMessageStatus().should("exist").should("be.visible");
      cy.visit(
        "/admin/structure/webform/manage/contact_district_3/results/submissions"
      );
      this.getSubmittedForm(testData.email)
        .invoke("text")
        .then((id) => {
          form_id = id;
          cy.log(form_id);
          this.getSubmittedForm(testData.email)
            .invoke("attr", "href")
            .then((url) => {
              form_url = url;
              cy.log(form_url);
              this.getContactUs0SubmittedDate(testData.email)
                .should("be.visible")
                .should("have.text", formattedDate);
              this.getSubmittedForm(testData.email)
                .should("exist")
                .click({ force: true });
              this.getSubmittedEmail()
                .contains(testData.email, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.firstname, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.lastname, { matchCase: false })
                .should("be.visible");
              this.getSubmittedPhone()
                .contains(randomPhoneNumber, { matchCase: false })
                .should("be.visible");
              this.getSubmittedSubject()
                .contains(testData.subject, { matchCase: false })
                .should("be.visible");
              this.getSubmittedMessage()
                .contains(testData.message, { matchCase: false })
                .should("be.visible");
            });
        });
    }
  }

  verifyQualitystartrcWebform() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    cy.visit("/contact");
    this.getWebform().should("exist").should("be.visible");
    this.getFirstNameInput()
      .should("exist")
      .type(testData.firstname)
      .wait(2000);
    this.getLastNameInput().should("exist").type(testData.lastname).wait(2000);
    this.getCityInput().should("exist").type(testData.city).wait(2000);
    this.getEmailInput().should("exist").type(testData.email).wait(2000);
    this.getQuestionDropdown()
      .should("exist")
      .select(1, { force: true })
      .wait(2000);
    this.getMessageInput().should("exist").type(testData.message).wait(2000);

    if (env == "dev") {
      assert.ok("Testing in dev");
      this.getSubmitButton().should("exist").click({ force: true });
      this.getWebformConfirmation().should("exist").should("be.visible");
      cy.visit("/admin/structure/webform/manage/contact/results/submissions");
      this.getSubmittedForm(testData.email)
        .invoke("text")
        .then((id) => {
          form_id = id;
          cy.log(form_id);
          this.getSubmittedForm(testData.email)
            .invoke("attr", "href")
            .then((url) => {
              form_url = url;
              cy.log(form_url);
              this.getSubmittedDate(testData.email)
                .should("be.visible")
                .should("have.text", formattedDate);
              this.getSubmittedForm(testData.email)
                .should("exist")
                .click({ force: true });
              this.getSubmittedEmail()
                .contains(testData.email, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.firstname, { matchCase: false })
                .should("be.visible");
              this.getSubmittedName()
                .contains(testData.lastname, { matchCase: false })
                .should("be.visible");
              this.getSubmittedCity()
                .contains(testData.city, { matchCase: false })
                .should("be.visible");
              this.getSubmittedMessage()
                .contains(testData.message, { matchCase: false })
                .should("be.visible");
            });
        });
    }
  }

  deleteSubmittedFormRecord() {
    if (env == "dev") {
      assert.ok("Testing in dev");
      cy.visit(form_url + "/delete");
      this.getAlertMessage()
        .contains(form_id, { matchCase: false })
        .should("be.visible");
      this.getDeleteButton()
        .contains("Delete", { matchCase: false })
        .should("be.visible")
        .click({ force: true });
      this.getAlertMessage()
        .contains(form_id, { matchCase: false })
        .should("be.visible");
      cy.request({
        url: form_url,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.status).to.not.equal(200);
      });
    } else {
      assert.ok("Testing in prod, no need to delete submission");
    }
  }
}

export default WebformPage;
