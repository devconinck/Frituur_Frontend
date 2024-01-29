describe("The Order Page", () => {
  const user = {
    email: "test@test.com",
    password: "password",
  };
  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.wait(1000);
  });
  it("successfully loads", () => {
    cy.visit("/order");
  });
  it("filters by category", () => {
    cy.visit("/order");

    cy.get("[data-cy=category-Fries]").click();
    cy.get("[data-cy=products]").find("li").should("have.length", 4);

    cy.get("[data-cy=category-Preperations]").click();
    cy.get("[data-cy=products]").find("li").should("have.length", 4);

    cy.get("[data-cy=category-Drinks]").click();
    cy.get("[data-cy=products]").find("li").should("have.length", 8);
  });

  it("adds products to cart", () => {
    cy.visit("/order");

    cy.get("[data-cy=products]")
      .find("li")
      .first()
      .find("button")
      .click()
      .click();

    cy.get("[data-cy=products]").find("li").last().find("button").click();

    cy.get("[data-cy=cart]").find("li").should("have.length", 2);
    cy.get("[data-cy=price]").should("contain", "6.70");
  });

  it("removes products from cart", () => {
    cy.visit("/order");

    cy.get("[data-cy=products]")
      .find("li")
      .first()
      .find("button")
      .click()
      .click();
    cy.get("[data-cy=products]").find("li").last().find("button").click();

    cy.get("[data-cy=cart]").find("li").should("have.length", 2);
    cy.get("[data-cy=price]").should("contain", "6.70");

    cy.get("[data-cy=remove-1]").click();

    cy.get("[data-cy=cart]").find("li").should("have.length", 1);
    cy.get("[data-cy=price]").should("contain", "4");
  });

  it("creates order", () => {
    cy.visit("/order");

    cy.get("[data-cy=products]")
      .find("li")
      .first()
      .find("button")
      .click()
      .click();
    cy.get("[data-cy=products]")
      .find("li")
      .last()
      .find("button")
      .click()
      .click();

    cy.get("[data-cy=cart]").find("li").should("have.length", 2);
    cy.get("[data-cy=price]").should("contain", "9.40");

    cy.get("[data-cy=order]").click();

    cy.url().should("include", "/checkout");
  });
});
