describe("The Register Page", () => {
  it("successfully loads", () => {
    cy.visit("/register");
  });

  it("invalid email", () => {
    const user = {
      name: "test",
      email: "test",
      password: "password",
      passwordConfirm: "password",
    };
    cy.register(user.name, user.email, user.password, user.passwordConfirm);

    cy.url().should("include", "/register");
    cy.get("[data-cy=error]").should("be.visible");
    cy.get("[data-cy=error]").should("have.text", "Email is invalid");
  });

  it("invalid password", () => {
    const user = {
      name: "test",
      email: "test@test.com",
      password: "pass",
      passwordConfirm: "password",
    };
    cy.register(user.name, user.email, user.password, user.passwordConfirm);

    cy.url().should("include", "/register");
    cy.get("[data-cy=error]").should("be.visible");
    cy.get("[data-cy=error]").should(
      "have.text",
      "Password must be at least 8 characters",
    );
  });

  it("passwords dont match", () => {
    const user = {
      name: "test",
      email: "test@email.com",
      password: "password",
      passwordConfirm: "passwordwrong",
    };
    cy.register(user.name, user.email, user.password, user.passwordConfirm);

    cy.url().should("include", "/register");
    cy.get("[data-cy=error]").should("be.visible");
    cy.get("[data-cy=error]").should("have.text", "Passwords dont match");
  });

  it("Email exists", () => {
    const user = {
      name: "test",
      email: "test@test.com",
      password: "password",
      passwordConfirm: "password",
    };
    cy.register(user.name, user.email, user.password, user.passwordConfirm);

    cy.url().should("include", "/register");
    cy.get("[data-cy=error]").should("be.visible");
    cy.get("[data-cy=error]").should("have.text", "Email already exists");
  });

  //register test werkt maar heb ik weggedaan omdat ik geen manier heb om de user te verwijderen
  /* it("registers", () => {
    const user = {
      name: "test",
      email: "test@new.com",
      password: "password",
      passwordConfirm: "password",
    };
    cy.register(user.name, user.email, user.password, user.passwordConfirm);
    cy.url().should("not.include", "register");
  }); */
});
