import ContentCRUDPage from "../pageobjects/ContentCRUDPage";

const datas = [
  // { content: "Basic Page", endpoint: "/node/add/page" },
  // { content: "Event", endpoint: "/node/add/event" },
  // { content: "Landing Page", endpoint: "/node/add/landing_page" },
  // { content: "News", endpoint: "/node/add/news" },
  // { content: "Person", endpoint: "/node/add/person" },
  // { content: "RFP", endpoint: "/node/add/rfp" },
  { content: "Site Alert", endpoint: "/node/add/bootstrap_site_alert" },
  // { content: "Video", endpoint: "/node/add/content_type_video" },
  // { content: "Webform", endpoint: "/node/add/webform" },
];

datas.forEach(({ content, endpoint }) => {
  describe(
    `Verification of ${content} Content CRUD Operation`,
    { tags: "all" },
    () => {
      const contentCRUDPage = new ContentCRUDPage();

      beforeEach(() => {
        cy.login();
      });

      it(`Should able to do CRUD operation and verification of ${content} content`, () => {
        contentCRUDPage.validateContentCRUD(endpoint, content);
      });

      afterEach(() => {
        contentCRUDPage.deleteContent();
      });
    }
  );

  describe(
    `Verification of ${content} Content Empty Submission`,
    { tags: "all" },
    () => {
      const contentCRUDPage = new ContentCRUDPage();

      beforeEach(() => {
        cy.login();
      });

      it(`Should throw alert message on empty form submission on ${content} content`, () => {
        contentCRUDPage.verifyEmptySubmission(endpoint, content);
      });
    }
  );
});
