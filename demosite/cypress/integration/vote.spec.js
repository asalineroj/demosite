/// <reference types="cypress" />
describe("Authenticated sections", () => {
    before(() => {
      cy.fixture("users.json").then((mockedUsers) => {
  
        cy.visit("http://localhost:8000/accounts/login/");
        cy.get("[name=csrfmiddlewaretoken]")
            .should("exist")
            .should("have.attr", "value")
            .as("csrfToken");
  
        cy.get("@csrfToken").then((token) => {
            cy.request({
            method: "POST",
            url: "http://localhost:8000/accounts/login/", 
            form: true,
            body: {
                username: mockedUsers[0].username,
                password: mockedUsers[0].password,
            },
            headers: {
                "X-CSRFTOKEN": token,
            },
            });
        });
      });
  
      cy.getCookie("sessionid").should("exist");
      cy.getCookie("csrftoken").should("exist");
    });
  
    beforeEach(() => {
      Cypress.Cookies.preserveOnce("sessionid", "csrftoken");
    });

    it("Can visit List view through the UI", function () {
        cy.visit("http://localhost:8000/polls/1/");
        cy.get('#choice1').should("be.visible")
        cy.percySnapshot("Poll 1")
        cy.get('#choice1').click()
    });

    it("Can visit List view through the UI", function () {
        cy.visit("http://localhost:8000/polls/2/");
        cy.get('#choice1').should("be.visible")
        cy.percySnapshot("Poll 2")
        cy.get('#choice1').click()
    });

})