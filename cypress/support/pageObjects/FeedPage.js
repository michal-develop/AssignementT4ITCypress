const TEN_SECONDS_IN_MILLIS = 10000;

class FeedPage {
  verifyPage() {
    cy.get("#downshift-0-input", {
      timeout: TEN_SECONDS_IN_MILLIS,
    }).should("exist");
    return this;
  }

  checkUrlIncludesFeed() {
    cy.url({ timeout: TEN_SECONDS_IN_MILLIS }) // Use prolonged timeout due to long loading sign in
      .should("include", "/feed");
    return this;
  }

  clickOnCreatePost() {
    cy.get("#item_start-conversation").click();
    return this;
  }

  enterPostText(text) {
    // CKEditor doesn't handle programmatic typing in the same way as standard input fields. Rich text editors
    // like CKEditor often have complex event handling and may not respond correctly to Cypress's .type() command.
    // Get the CKEditor Instance to type the text into the editor.
    cy.get(
      'div[contenteditable="true"][aria-label="Editor editing area: main"]'
    ).then(($el) => {
      // Access the editor instance
      const editor = $el[0].ckeditorInstance;

      // Set the data
      editor.setData(text);
    });
    return this;
  }

  selectCommunityNameFromPicker(name) {
    cy.get(".ant-select-selector").click();
    cy.get(".ant-select-item-option-content").contains(name).click();
    return this;
  }

  savePost() {
    cy.get('button[type="submit"]').click();
    return this;
  }

  verifyPostExists(text, communityName, userName) {
    cy.contains(".ant-card-body", text).within(() => {
      cy.contains("p", text).should("exist");
      cy.contains("span.ant-typography", communityName).should("exist");
      cy.contains("h5", userName).should("exist");
    });
    return this;
  }

  clickOnMenuButton(postText) {
    // Click on menu button in form of SVG
    cy.contains(".ant-card-body", postText).within(() => {
      cy.get("svg")
        .find(
          'path[d="M12 16.5C12.8284 16.5 13.5 17.1716 13.5 18C13.5 18.8284 12.8284 19.5 12 19.5C11.1716 19.5 10.5 18.8284 10.5 18C10.5 17.1716 11.1716 16.5 12 16.5ZM12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5ZM12 4.5C12.8284 4.5 13.5 5.17157 13.5 6C13.5 6.82843 12.8284 7.5 12 7.5C11.1716 7.5 10.5 6.82843 10.5 6C10.5 5.17157 11.1716 4.5 12 4.5Z"]'
        )
        .click();
    });
    return this;
  }

  clickOnMenuDeleteButton() {
    cy.contains("span.ant-dropdown-menu-title-content", "Delete").click();
    return this;
  }

  checkPostDoesNotExist(postText) {
    cy.contains(".ant-card-body", postText).should("not.exist");
    return this;
  }
}

export default FeedPage;
