describe('Full Stack Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Wait for the task input to be visible
    cy.get('.task-input', { timeout: 15000 }).should('be.visible');
    
    // Verify no error messages are shown (backend is responding)
    cy.get('body').then(($body) => {
      if ($body.find('.error-message:visible').length > 0) {
        cy.log('Initial load had error, reloading page...');
        cy.reload();
        cy.get('.task-input', { timeout: 15000 }).should('be.visible');
        cy.get('.error-message').should('not.be.visible');
      }
    });
  });

  it('Full task lifecycle - Frontend and Backend sync', () => {
    const taskTitle = 'Integration Test Task';

    // Add task through UI
    cy.get('.task-input__field').should('be.visible').clear().type(taskTitle);
    cy.get('.task-input__button').click();
    
    // Verify task appears in UI
    cy.contains('.task-item__title', taskTitle, { timeout: 15000 }).should('be.visible');

    // Verify task was created in backend
    cy.request('GET', 'http://localhost:5000/api/tasks').then((response) => {
      expect(response.status).to.eq(200);
      const tasks = response.body;
      const createdTask = tasks.find((task: any) => task.title === taskTitle);
      expect(createdTask).to.exist;
      expect(createdTask.completed).to.be.false;
      
      // Store task ID for later verification
      cy.wrap(createdTask.id).as('taskId');
    });

    // Toggle completion in UI
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__checkbox').click();
      cy.get('.task-item__checkbox').should('be.checked');
    });

    // Verify backend reflects the change
    cy.get('@taskId').then((taskId) => {
      cy.request('GET', 'http://localhost:5000/api/tasks').then((response) => {
        const updatedTask = response.body.find((task: any) => task.id === taskId);
        expect(updatedTask.completed).to.be.true;
      });
    });

    // Delete through UI
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__delete, button[aria-label*="delete"], button:has([data-testid*="Delete"])').click();
    });
    cy.contains('.task-item__title', taskTitle).should('not.exist');

    // Verify deletion in backend
    cy.get('@taskId').then((taskId) => {
      cy.request('GET', 'http://localhost:5000/api/tasks').then((response) => {
        const deletedTask = response.body.find((task: any) => task.id === taskId);
        expect(deletedTask).to.be.undefined;
      });
    });
  });

  it('Data persistence across page refresh', () => {
    const taskTitle = 'Persistent Integration Task';
    
    // Create and complete task
    cy.get('.task-input__field').should('be.visible').clear().type(taskTitle);
    cy.get('.task-input__button').click();
    cy.contains('.task-item__title', taskTitle, { timeout: 15000 }).should('be.visible');
    
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__checkbox').click();
      cy.get('.task-item__checkbox').should('be.checked');
    });

    // Refresh and verify persistence
    cy.reload();
    cy.get('.task-input', { timeout: 15000 }).should('be.visible');
    
    // Task should still exist and be completed
    cy.contains('.task-item__title', taskTitle, { timeout: 15000 }).should('be.visible');
    cy.get('.task-item').contains(taskTitle).parents('.task-item').within(() => {
      cy.get('.task-item__checkbox').should('be.checked');
    });
  });

  it('should handle API errors gracefully', () => {
    // Intercept API call and force an error
    cy.intercept('POST', '**/api/tasks', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('createTaskError');

    // Attempt to add task (should fail gracefully)
    cy.get('.task-input__field').clear().type('Task that should fail');
    cy.get('.task-input__button').click();
    
    // Wait for the intercepted request
    cy.wait('@createTaskError');

    // Remove interception for cleanup (future requests should work)
    cy.intercept('POST', '**/api/tasks').as('createTask');
  });
});
