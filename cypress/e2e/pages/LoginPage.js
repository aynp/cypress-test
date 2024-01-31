export class LoginPage {

    pageElements = {
        emailInput : () => cy.get('[data-testid="email-input"]'),
        passwordInput : () => cy.get('[data-testid="password-input"]'),
        loginButton : () => cy.get('[data-testid="login-button"]')
    }

}

export const loginPage = new LoginPage()