describe("Admin Categories", () => {
  beforeEach(() => {
    const admin = {
      email: "testAdmin@test.com",
      password: "password",
    };
    cy.login(admin.email, admin.password);
    cy.wait(1000);
  });
  it("successfully loads", () => {
    cy.visit("/admin/categories");
  });

  it("contains all categories", () => {
    cy.visit("/admin/categories");
    cy.get("[data-cy=categories]").find("li").should("have.length", 7);
  });

  it("no name error", () => {
    cy.visit("/admin/categories");
    cy.get("[data-cy=add-category]").click();
    cy.get("[data-cy=error]").should("contain", "name is required");
  });

  it("not allowed character", () => {
    cy.visit("/admin/categories");
    cy.get("[data-cy=category-name]").type("1".repeat(3));
    cy.get("[data-cy=add-category]").click();
    cy.get("[data-cy=error]").should(
      "contain",
      "name must only contain letters",
    );
  });

  it("creates new category", () => {
    cy.visit("/admin/categories");
    cy.get("[data-cy=category-name]").type("Test Category");
    cy.get("[data-cy=add-category]").click();

    cy.get("[data-cy=categories]").find("li").should("have.length", 8);
    cy.get("[data-cy=categories]")
      .find("li")
      .last()
      .should("contain", "Test Category");
  });

  it("Delete Category", () => {
    cy.visit("/admin/categories");
    cy.get("[data-cy=categories]")
      .find("li")
      .last()
      .get("[data-cy=remove-7]")
      .click();
    cy.get("[data-cy=delete]").click();

    cy.get("[data-cy=categories]").find("li").should("have.length", 7);
  });
});
