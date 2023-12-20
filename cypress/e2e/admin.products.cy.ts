describe("Admin Products", () => {
  beforeEach(() => {
    const admin = {
      email: "testAdmin@test.com",
      password: "password",
    };
    cy.login(admin.email, admin.password);
    cy.wait(1000);
  });
  it("successfully loads", () => {
    cy.visit("/admin/products");
  });

  it("contains all products", () => {
    cy.visit("/admin/products");
    cy.get("[data-cy=products]").find("li").should("have.length", 7);
  });

  it("no correct data error", () => {
    cy.visit("/admin/products");
    cy.get("[data-cy=add-product]").click();
    cy.get("[data-cy=error]").should("contain", "name is required");
  });

  it("creates new product", () => {
    cy.visit("/admin/products");
    cy.get("[data-cy=product-name]").type("Test product");
    cy.get("[data-cy=add-product]").click();

    cy.get("[data-cy=products]").find("li").should("have.length", 8);
    cy.get("[data-cy=products]")
      .find("li")
      .last()
      .should("contain", "Test product");
  });
});
