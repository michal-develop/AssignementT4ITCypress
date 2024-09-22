import LoginPage from "../support/pageObjects/LoginPage";
import FeedPage from "../support/pageObjects/FeedPage";

describe("Technical assignment for the interview.", () => {
  it("Open login page, login, create, check and delete post.", () => {
    const URL = "https://qa.bigheartapp.org/login";
    const EMAIL = "kandidat@example.com";
    const PASSWORD = "RandomPassword123*!";
    const TEXT = "Test Post with unique number: ";
    const COMMUNITY_NAME = "BigHeart Philanthropy";
    const USER_NAME = "Pohovor Kandidat";
    const loginPage = new LoginPage();
    const feedPage = new FeedPage();
    var textWithUniqueNumber = TEXT + Math.floor(10000 + Math.random() * 90000); // Use unique text in each test to avoid collisions with previous tests.

    cy.visit(URL);

    loginPage
      .verifyPage()
      .clickOnUsePasswordButton()
      .checkUrlIncludesPassword()
      .signInUser(EMAIL, PASSWORD);

    feedPage
      .verifyPage()
      .checkUrlIncludesFeed()
      .clickOnCreatePost()
      .enterPostText(textWithUniqueNumber)
      .selectCommunityNameFromPicker(COMMUNITY_NAME)
      .savePost()
      .verifyPostExists(textWithUniqueNumber, COMMUNITY_NAME, USER_NAME)
      .clickOnMenuButton(textWithUniqueNumber)
      .clickOnMenuDeleteButton()
      .checkPostDoesNotExist(textWithUniqueNumber);
  });
});
