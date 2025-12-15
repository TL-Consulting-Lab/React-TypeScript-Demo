// ***********************************************
// This file contains custom commands and overwrites existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to add a task through the UI
 * Uses proper Cypress auto-waiting instead of arbitrary timeouts
 */
Cypress.Commands.add('addTask', (title: string) => {
  cy.get('.task-input__field', { timeout: 15000 }).should('be.visible').clear().type(title);
  cy.get('.task-input__button').should('be.visible').click();
  // Wait for the API call to complete and task to appear
  // Using intercept for more reliable waiting
  cy.contains('.task-item__title', title, { timeout: 15000 }).should('be.visible');
});
