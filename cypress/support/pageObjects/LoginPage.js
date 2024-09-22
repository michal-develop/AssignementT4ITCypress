class LoginPage {
  
verifyPage() {
    cy.contains("Log in").should("exist");
    return this;
  }

  clickOnUsePasswordButton() {
    cy.contains("Use password").click();
    return this;
  }

  checkUrlIncludesPassword() {
    cy.url().should("include", "/password");
    return this;
  }

  signInUser(email, password) {
    cy.get('input[type="text"][id="email"]').type(email);
    cy.get('input[type="password"][id="password"]').type(password);
    cy.get('button[type="submit"]').contains("Log in").click();
    return this;
  }
}

export default LoginPage;
