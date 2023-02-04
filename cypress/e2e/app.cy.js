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

        cy.viewport(1200,800)

        cy.visit('/')
    })

    it('renders',()=>{
        cy.findByText('Youtube').should('exist')
    })

    it('shows popular video first', ()=>{
        cy.findByText('Popular Video').should('exist')
    })

    it('searches by keyword',()=>{
        cy.findByPlaceholderText('Search...').type('bts')
        cy.get('.absolute').click()
        cy.findByText('Search Result1').should('exist')

    })

    it('goes to detail page', ()=>{
        cy.get('.pb-5 > :nth-child(1) > .grid > :nth-child(1)').click()
        cy.findByTitle('Popular Video').should('exist')
        cy.findByText('Popular Video').should('exist')
        cy.findByText('Search Result1').should('exist')

    })
})