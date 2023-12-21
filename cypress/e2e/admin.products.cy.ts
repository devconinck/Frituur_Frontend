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
    cy.get("[data-cy=products]")
      .get("[data-cy=adminProduct]")
      .should("have.length", 40);
  });

  it("no correct data error", () => {
    cy.visit("/admin/products");
    cy.get("[data-cy=addProduct]").click();
    cy.get("[data-cy=error]").should("be.visible");
  });

  it("creates new product", () => {
    cy.visit("/admin/products");
    cy.get("[data-cy=name]").type("Ice Tea Zero");
    cy.get("[data-cy=price]").type("2.2");
    cy.get("[data-cy=url]").type("ice_tea_zero.png");
    cy.get("[data-cy=categorySelect]").select("Drinks");
    cy.get("[data-cy=addProduct]").click();

    cy.get("[data-cy=products]")
      .get("[data-cy=adminProduct]")
      .should("have.length", 41);
    cy.get("[data-cy=products]")
      .get("[data-cy=adminProduct]")
      .last()
      .should("contain", "Ice Tea Zero");
  });

  it("deletes created product", () => {
    cy.visit("/admin/products");
    cy.get("[data-cy=products]")
      .get("[data-cy=adminProduct]")
      .last()
      .get("[data-cy=delete-41]")
      .click()
      .get("[data-cy=confirm]")
      .click();

    cy.get("[data-cy=products]")
      .get("[data-cy=adminProduct]")
      .should("have.length", 40);
  });
});
