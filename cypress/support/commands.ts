/// <reference types="cypress" />

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get("[data-cy=email]").clear().type(email);
  cy.get("[data-cy=password]").clear().type(password);
  cy.get("[data-cy=login]").click();
});

Cypress.Commands.add(
  "register",
  (name: string, email: string, password: string, passwordConfirm: string) => {
    cy.visit("/register");
    cy.get("[data-cy=name]").clear().type(name);
    cy.get("[data-cy=email]").clear().type(email);
    cy.get("[data-cy=password]").clear().type(password);
    cy.get("[data-cy=passwordConfirm]").clear().type(passwordConfirm);
    cy.get("[data-cy=register]").click();
  },
);
