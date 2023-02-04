/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'

describe('Yotube App', ()=>{
    beforeEach(()=>{
        cy.intercept('GET', /(mostPopular)/g, {
            fixture: 'popular.json'
        })

        cy.intercept('GET', /(search)/g, {
            fixture: 'search.json'
        })

        cy.visit('/')
    })

    it('renders',()=>{
        cy.findByText('Youtube').should('exist')
    })

    it('shows popular video first', ()=>{
        cy.findByText('Popular Video').should('exist')
    })
})