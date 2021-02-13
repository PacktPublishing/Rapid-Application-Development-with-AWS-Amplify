import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const url = 'http://localhost:3000'

Given('Adrian has a story to share', () => {
  cy.visit(url)
})

When('he shares a story called {string} about {string}', (title, content) => {
  cy.get('input[placeholder="Title"]').type(title)
  cy.get('textarea[placeholder="Content"]').type(content)
  cy.get('.create-button').click()
})

Then('people can see a story called {string} about {string}', (title, content) => {
  cy.get('.post-title').contains(title)
  cy.get('.post-content').contains(content)
})