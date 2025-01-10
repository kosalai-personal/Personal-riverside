const sites = require("../fixtures/sites.json");

// Custom command for login
Cypress.Commands.add("login", function () {
  const siteName = Cypress.env("site");

  if (siteName && sites[siteName]) {
    const password = sites[siteName]["password"];

    cy.visit("/user/login");
    cy.get("#edit-name").should("exist").type("lgupta");
    cy.get("#edit-pass").should("exist").type(password);
    cy.get("#edit-submit").should("exist").click({ force: true });
    cy.visit("/", { failOnStatusCode: false });
    cy.get("a#toolbar-item-user").should("contain.text", "lgupta");
    cy.get("#toolbar-item-administration-tray").should("be.visible");
  } else {
    throw new Error(`Site '${siteName}' not found in sites.json`);
  }
});

Cypress.Commands.add("logout", function () {
  cy.request({
    method: "POST",
    url: "/user/logout",
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("getCssIframeBody", (locator) => {
  return cy
    .get(locator)
    .its("0.contentDocument")
    .should("exist")
    .then((contentDocument) => cy.wrap(contentDocument.body));
});