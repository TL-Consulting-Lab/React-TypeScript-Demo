describe('Task Management App - Critical User Flows', () => {
  beforeEach(() => {
    // Navigate to the app before each test
    cy.visit('/');
    
    // Wait for the task input to be visible (app is loaded)
    cy.get('.task-input', { timeout: 15000 }).should('be.visible');
    
    // Verify no error messages are shown (backend is responding)
    // If there's an error, wait a bit and reload
    cy.get('body').then(($body) => {
      if ($body.find('.error-message:visible').length > 0) {
        cy.log('Initial load had error, reloading page...');
        cy.reload();
        cy.get('.task-input', { timeout: 15000 }).should('be.visible');
        // Error should be gone after reload
        cy.get('.error-message').should('not.be.visible');
      }
    });
  });

  it('should complete full task lifecycle (add, toggle, delete)', () => {
    const taskTitle = 'Complete Lifecycle Task';
    
    // Step 1: Verify main UI elements are present
    cy.title().should('include', 'React App');
    cy.get('input[placeholder="Add a new task..."]').should('be.visible');
    cy.contains('button', 'Add Task').should('be.visible');
    
    // Step 2: Add a new task
    cy.get('.task-input__field').should('be.visible').clear().type(taskTitle);
    cy.get('.task-input__button').should('be.visible').click();
    
    // Wait for task to appear
    cy.contains('.task-item__title', taskTitle, { timeout: 15000 }).should('be.visible');
    
    // Verify input is cleared
    cy.get('.task-input__field').should('have.value', '');
    
    // Step 3: Toggle task completion
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      // Click the checkbox
      cy.get('.task-item__checkbox').click();
      // Verify task is marked as completed
      cy.get('.task-item__checkbox').should('be.checked');
      cy.get('.task-item__title').should('have.class', 'completed');
    });
    
    // Step 4: Toggle back to incomplete
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__checkbox').click();
      cy.get('.task-item__checkbox').should('not.be.checked');
      cy.get('.task-item__title').should('not.have.class', 'completed');
    });
    
    // Step 5: Delete the task
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__delete, button[aria-label*="delete"], button:has([data-testid*="Delete"])').click();
    });
    
    // Verify task is removed
    cy.contains('.task-item__title', taskTitle).should('not.exist');
  });

  it('should handle input validation and edge cases', () => {
    const taskInput = cy.get('.task-input__field');
    const addButton = cy.get('.task-input__button');
    
    // Test 1: Cannot add empty task
    taskInput.should('be.visible').clear();
    addButton.click();
    // Task list should still be empty or no new task added
    cy.get('.task-item').should('have.length', 0);
    
    // Test 2: Should handle multiple tasks
    const tasks = ['Task One', 'Task Two', 'Task Three'];
    tasks.forEach((task) => {
      cy.get('.task-input__field').should('be.visible').clear().type(task);
      cy.get('.task-input__button').click();
      cy.contains('.task-item__title', task, { timeout: 15000 }).should('be.visible');
    });
    
    // Verify all tasks are present
    tasks.forEach((task) => {
      cy.contains('.task-item__title', task).should('be.visible');
    });
    
    // Test 3: Should handle special characters
    const specialTask = 'Task with émojis 🚀✨ & symbols!';
    cy.get('.task-input__field').clear().type(specialTask);
    cy.get('.task-input__button').click();
    cy.contains('.task-item__title', specialTask, { timeout: 15000 }).should('be.visible');
  });

  it('should persist task state across page refresh', () => {
    const taskTitle = 'Persistent Task ' + Date.now();
    
    // Add a task
    cy.get('.task-input__field').should('be.visible').clear().type(taskTitle);
    cy.get('.task-input__button').click();
    cy.contains('.task-item__title', taskTitle, { timeout: 15000 }).should('be.visible');
    
    // Toggle completion
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__checkbox').click();
      cy.get('.task-item__checkbox').should('be.checked');
    });
    
    // Refresh the page
    cy.reload();
    cy.get('.task-input', { timeout: 15000 }).should('be.visible');
    
    // Verify task still exists and is completed
    cy.contains('.task-item__title', taskTitle, { timeout: 15000 }).should('be.visible');
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__checkbox').should('be.checked');
    });
  });
});
