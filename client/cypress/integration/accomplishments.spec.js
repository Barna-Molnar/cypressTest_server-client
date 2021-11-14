/// <reference types="cypress" />

describe('Accomplishments dashboard',  ()=> {

    beforeEach(()=> {
        cy.visit('/accomplishments')
    });

    it('should diplay error if any of the inputs includes the word giraffe', ()=> {
        cy.get("[placeholder='Title']").type("Barni's accomplishment")
        cy.get("[placeholder='My accomplishment...']").type("This is a bad a word giraffe")
        cy.get("[type=checkbox]").check()
        cy.get('button').contains("Submit Accomplishment").click()
        cy.contains("Your content is not appropriate")

    });


    it('should diplay error if any of the inputs includes the word giraffe with mock', ()=> {

        cy.intercept('POST', 'http://localhost:4000', (req)=> {
            req.reply((res)=> {
                res.send({
                    msg: 'Your content is not appropriate'
                })
            })
        })

        cy.get("[placeholder='Title']").type("Barni's accomplishment")
        cy.get("[placeholder='My accomplishment...']").type("This is a bad a word giraffe")
        cy.get("[type=checkbox]").check()
        cy.get('button').contains("Submit Accomplishment").click()
        cy.contains("Your content is not appropriate")

    })

})