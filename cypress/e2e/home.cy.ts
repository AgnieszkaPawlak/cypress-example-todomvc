context("Home page", () => {
    describe("Main page", () => {
        beforeEach(() => {
            cy.visit("http://localhost:8888")
        })

        context("Initial view", () => {
            it("should contains elements", ()=> {
                cy.get('input[placeholder="What needs to be done?"]').focused()
            })
            it("should contains text in h1", ()=> {
                cy.get("header > h1 ").contains("todos")
            })
            it("should contains footer", () => {
                cy.get("footer").find("p").eq(0).contains("Double-click to edit a todo")
                cy.get("footer").find("p").eq(1).contains("Created by ")
                cy.get("footer").find("p").eq(2).contains("Part of ")
            })
            it("testing petehunt link after clicking", ()=>{
                cy.get("footer").find("p").eq(1).find("a").contains("petehunt").click()
                cy.visit("https://todomvc.com")
            })

            it("testing TodoMVS link after clicking", ()=>{
                cy.get("footer").find("p").eq(2).find("a").contains("TodoMVC").click()
                cy.visit("https://github.com/petehunt/")
                cy.origin("https://todomvc.com", () => {
                })
                //@TODO
                cy.on("uncaught:exception", (e) => {
                    if (e.message.includes("Things went bad")) {
                        // we expected this error, so let's ignore it
                        // and let the test continue
                        return false
                    }
                })
            })
        })

        context("Todo list don't exist", () => {
            it("should not display the list", () => {
            cy.get("todo-list li").should("not.exist")
            cy.get("[data-reactid='.0.2']").should("not.exist")
            })
        })

        context("Todo list exist", () => {
            it("should be h1 in document", () => {
            cy.get("[data-reactid='.0.0.0']").contains("todos")
            })
            it("should add new todo list", () => {
            cy.get("input[placeholder='What needs to be done?']").type("Buy bread{enter}" ,)
            cy.get("li").eq(0).contains("Buy bread")
            cy.get(".todo-list li").should("have.length", 1)
            cy.get("input[placeholder='What needs to be done?']").type("Finish the book I'm currently reading{enter}")
            cy.get("li").eq(1).contains("Finish the book I'm currently reading")
            cy.get(".todo-list li").should("have.length", 2)
            cy.get("[data-reactid='.0.2']").should("exist")
            cy.get("li").eq(0).find("[type='checkbox']").first().check()
            cy.get("li").eq(1).find("[type='checkbox']").check();
            cy.get("li > div").eq(0).find("button").click({force:true})
            cy.get("li > div").eq(0).find("button").click({force:true})
            })
        })

    })
})
