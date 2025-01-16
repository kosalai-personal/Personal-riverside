class MediaTypesPage {
  getTitle() {
    return cy.get("h1.page-title");
  }

  getMediaTypesBlock() {
    return cy.get("#block-claro-content");
  }

  getMediaTypes() {
    return cy.get(".menu-label");
  }

  verifyMediaTypes() {
    const expectedTexts = [
      "Audio",
      "Document",
      "Documents (DAM)",
      "Image",
      "Image (DAM)",
      "PDF (DAM)",
      "Remote video",
      "Spinset (DAM)",
      "Video",
      "Video (DAM)",
    ];

    cy.visit("/admin/structure/media");
    this.getTitle()
      .contains("Media types", { matchCase: false })
      .should("be.visible");
    this.getMediaTypesBlock().should("exist").should("be.visible");
    this.getMediaTypes()
      .should("have.length", expectedTexts.length)
      .each((element, index) => {
        cy.wrap(element).should("have.text", expectedTexts[index]);
      });
  }
}

export default MediaTypesPage;
