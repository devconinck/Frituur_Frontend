describe("The Login Page", () => {
  it("successfully loads", () => {
    cy.visit("/login");
  });

  it("invalid email", () => {
    const user = {
      email: "test",
      password: "password",
    };
    cy.login(user.email, user.password);

    cy.url().should("include", "/login");
    cy.get("[data-cy=error]").should("be.visible");
    cy.get("[data-cy=error]").should("have.text", "Email is invalid");
  });

  it("invalid password", () => {
    const user = {
      email: "test@test.com",
      password: "pass",
    };
    cy.login(user.email, user.password);

    cy.url().should("include", "/login");
    cy.get("[data-cy=error]").should("be.visible");
    cy.get("[data-cy=error]").should(
      "have.text",
      "Password must be at least 8 characters",
    );
  });

  it("combination doesnt exist", () => {
    const user = {
      email: "test@test.com",
      password: "StrongPassword",
    };
    cy.login(user.email, user.password);

    cy.url().should("include", "/login");
    cy.get("[data-cy=error]").should("be.visible");
    cy.get("[data-cy=error]").should(
      "have.text",
      "Login failed: Your email or password is incorrect",
    );
  });

  it("logs in", () => {
    const user = {
      email: "test@test.com",
      password: "password",
    };
    cy.login(user.email, user.password);
    cy.url().should("include", "/");
  });
});
