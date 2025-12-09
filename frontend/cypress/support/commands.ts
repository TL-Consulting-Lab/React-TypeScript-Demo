// ***********************************************
// This file contains custom commands and overwrites existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to add a task through the UI
 */
Cypress.Commands.add('addTask', (title: string) => {
  cy.get('.task-input__field', { timeout: 15000 }).should('be.visible').clear().type(title);
  cy.get('.task-input__button').should('be.visible').click();
  // Wait for network to settle
  cy.wait(500);
  // Verify task appears
  cy.contains('.task-item__title', title, { timeout: 15000 }).should('be.visible');
});
