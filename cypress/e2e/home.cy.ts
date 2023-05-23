context("Home page", () => {
    describe("Main page", () => {
        beforeEach(() => {
            cy.visit("http://localhost:8888")
        })

        context("Todo list don't exist", () => {
            it("should not display the list", () => {
            cy.get("todo-list li").should("not.exist")
            cy.get('[data-reactid=".0.2"]').should("not.exist")
            })
        })

        context("Todo list exist", () => {
            it("should be h1 in document", () => {
            cy.get("[data-reactid='.0.0.0']").contains("todos")
            })
            it("should add new todo list", () => {
            cy.get('input[placeholder="What needs to be done?"]').type("Buy bread{enter}" ,)
            cy.get('li').eq(0).contains("Buy bread")
            cy.get(".todo-list li").should("have.length", 1)
            cy.get('input[placeholder="What needs to be done?"]').type("Finish the book I'm currently reading{enter}")
            cy.get('li').eq(1).contains("Finish the book I'm currently reading")
            cy.get(".todo-list li").should("have.length", 2)
            cy.get('[data-reactid=".0.2"]').should("exist")
            })
        })
    })
})