describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("My First Test", () => {
  it("doesnt do much", () => {
    expect(true).to.equal(true);
  });
});
