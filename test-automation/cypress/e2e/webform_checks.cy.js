import WebformPage from "../pageobjects/WebformPage";

describe("Verification of Webform", () => {
  const webformPage = new WebformPage();

  beforeEach(() => {
    cy.login();
  });

  it("Should submit a form and verify the results", { tags: "common" }, () => {
    webformPage.verifyCommonWebform();
  });

  it(
    "Should submit a form and verify the results",
    { tags: "capriverside" },
    () => {
      webformPage.verifyCapriversideWebform();
    }
  );

  it(
    "Should submit a form and verify the results",
    { tags: "rivcoemd" },
    () => {
      webformPage.verifyRivcoemdWebform();
    }
  );

  it(
    "Should submit a form and verify the results",
    { tags: "rivcoworkforce" },
    () => {
      webformPage.verifyRivcoworkforceWebform();
    }
  );

  it(
    "Should submit a form and verify the results",
    { tags: "supervisorchuckwashington" },
    () => {
      webformPage.verifySupervisorchuckwashingtonWebform();
    }
  );

  it(
    "Should submit a form and verify the results",
    { tags: "qualitystartrc" },
    () => {
      webformPage.verifyQualitystartrcWebform();
    }
  );

  afterEach(() => {
    webformPage.deleteSubmittedFormRecord();
  });
});
