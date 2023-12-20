declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): Chainable<any>;
  }
  interface Chainable<Subject> {
    login(email: string, password: string): Chainable<any>;
    register(
      name: string,
      email: string,
      password: string,
      passwordConfirm: string,
    ): Chainable<any>;
  }
}
