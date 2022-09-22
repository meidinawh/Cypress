/// <reference types = "cypress" />

describe('Make an Appointment', () => {
    beforeEach(() => {
        cy.visit('https://katalon-demo-cura.herokuapp.com/')
    })
    it('Make an appointment with valid data', () => {
        cy.get('#top').should('be.visible')
        cy.get('h1').should('contain.text', 'CURA Healthcare Service')
        cy.get('h3').should('contain.text', 'We Care About Your Health')
        cy.contains('Make Appointment').click()

        cy.url().should('include', 'profile.php#login')
        cy.get('h2').should('be.visible').and('contain', 'Login')
        cy.get('.lead').should('be.visible').and('contain', 'Please login to make appointment.')
        cy.get('.col-sm-offset-3').should('be.visible')
        cy.get('#txt-username').invoke('attr', 'placeholder').should('contain', 'Username')
        cy.get('#txt-password').invoke('attr', 'placeholder').should('contain', 'Password')
        cy.login('John Doe', 'ThisIsNotAPassword')

        cy.url().should('include', '#appointment')
        cy.get('#appointment').should('be.visible')
        cy.get('h2').should('be.visible').and('contain', 'Make Appointment')
        cy.get('#combo_facility').select('Seoul CURA Healthcare Center')
        cy.get('#radio_program_medicare').click()
        cy.get('.input-group-addon').click()
        cy.get(':nth-child(5) > :nth-child(6)').click()
        cy.get('#btn-book-appointment').click()

        cy.url().should('include', 'appointment.php#summary')
        cy.get('#summary > .container > .row').should('be.visible')
        cy.get('h2').should('be.visible').and('have.text', 'Appointment Confirmation')
        cy.get('.lead').should('be.visible')
            .should('contain.text', 'Please be informed that your appointment has been booked as following:')
            
            
    })
})