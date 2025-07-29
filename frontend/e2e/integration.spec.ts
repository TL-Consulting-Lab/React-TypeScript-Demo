import { test, expect } from '@playwright/test';

test.describe('Full Stack Integration Tests', () => {
  test.describe.configure({ mode: 'serial' });

  test('Full task lifecycle - Frontend and Backend Integration', async ({ page }) => {
    // Navigate to the frontend application
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Test 1: Verify the page loads correctly
    await expect(page.locator('.task-input')).toBeVisible();
    await expect(page.locator('.task-input__field')).toBeVisible();
    await expect(page.locator('.task-input__button')).toBeVisible();

    // Test 2: Add a new task through the UI
    const taskTitle = 'Integration Test Task';
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');

    await taskInput.fill(taskTitle);
    await addButton.click();

    // Wait for the API call to complete and the UI to update
    await page.waitForTimeout(1000);

    // Verify the task appears in the UI
    const taskItem = page.locator('.task-item').filter({ hasText: taskTitle });
    await expect(taskItem).toBeVisible();
    await expect(page.locator('.task-item__title', { hasText: taskTitle })).toBeVisible();

    // Test 3: Verify the task was created in the backend
    const apiResponse = await page.request.get('http://localhost:5000/api/tasks');
    expect(apiResponse.status()).toBe(200);
    
    const tasks = await apiResponse.json();
    const createdTask = tasks.find((task: any) => task.title === taskTitle);
    expect(createdTask).toBeDefined();
    expect(createdTask.completed).toBe(false);

    // Test 4: Toggle task completion through the UI
    const checkbox = taskItem.locator('.task-item__checkbox');
    await expect(checkbox).not.toBeChecked();
    
    await checkbox.click();
    await page.waitForTimeout(500);

    // Verify the UI shows the task as completed
    await expect(checkbox).toBeChecked();
    await expect(taskItem).toHaveClass(/completed/);

    // Test 5: Verify the completion status was updated in the backend
    const updatedApiResponse = await page.request.get('http://localhost:5000/api/tasks');
    const updatedTasks = await updatedApiResponse.json();
    const updatedTask = updatedTasks.find((task: any) => task.id === createdTask.id);
    expect(updatedTask.completed).toBe(true);

    // Test 6: Delete the task through the UI
    const deleteButton = taskItem.locator('.task-item__delete');
    await deleteButton.click();
    await page.waitForTimeout(500);

    // Verify the task is removed from the UI
    await expect(page.locator('.task-item__title', { hasText: taskTitle })).not.toBeVisible();

    // Test 7: Verify the task was deleted from the backend
    const finalApiResponse = await page.request.get('http://localhost:5000/api/tasks');
    const finalTasks = await finalApiResponse.json();
    const deletedTask = finalTasks.find((task: any) => task.id === createdTask.id);
    expect(deletedTask).toBeUndefined();
  });

  test('Multiple tasks management', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const taskTitles = [
      'First Integration Task',
      'Second Integration Task',
      'Third Integration Task'
    ];

    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');

    // Add multiple tasks
    for (const title of taskTitles) {
      await taskInput.fill(title);
      await addButton.click();
      await page.waitForTimeout(500);
    }

    // Verify all tasks appear in the UI
    for (const title of taskTitles) {
      await expect(page.locator('.task-item__title', { hasText: title })).toBeVisible();
    }

    // Verify all tasks exist in the backend
    const apiResponse = await page.request.get('http://localhost:5000/api/tasks');
    const allTasks = await apiResponse.json();
    
    for (const title of taskTitles) {
      const backendTask = allTasks.find((task: any) => task.title === title);
      expect(backendTask).toBeDefined();
    }

    // Toggle completion for the second task
    const secondTaskItem = page.locator('.task-item').filter({ hasText: taskTitles[1] });
    const secondTaskCheckbox = secondTaskItem.locator('.task-item__checkbox');
    
    await secondTaskCheckbox.click();
    await page.waitForTimeout(500);

    // Verify only the second task is completed in the UI
    await expect(secondTaskCheckbox).toBeChecked();
    await expect(secondTaskItem).toHaveClass(/completed/);

    // Verify other tasks are not completed
    const firstTaskCheckbox = page.locator('.task-item').filter({ hasText: taskTitles[0] }).locator('.task-item__checkbox');
    const thirdTaskCheckbox = page.locator('.task-item').filter({ hasText: taskTitles[2] }).locator('.task-item__checkbox');
    
    await expect(firstTaskCheckbox).not.toBeChecked();
    await expect(thirdTaskCheckbox).not.toBeChecked();

    // Clean up - delete all test tasks
    for (const title of taskTitles) {
      const taskItem = page.locator('.task-item').filter({ hasText: title });
      const deleteButton = taskItem.locator('.task-item__delete');
      await deleteButton.click();
      await page.waitForTimeout(300);
    }
  });

  test('Error handling - Backend connection issues', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Intercept API calls and simulate server errors
    await page.route('**/api/tasks', route => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' })
        });
      } else {
        route.continue();
      }
    });

    // Try to add a task
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');

    await taskInput.fill('Task that should fail');
    await addButton.click();
    await page.waitForTimeout(1000);

    // The task should not appear in the UI due to the error
    // Note: This depends on how your frontend handles errors
    // You might need to adjust based on your error handling implementation

    // Remove the route interception
    await page.unroute('**/api/tasks');
  });

  test('Data persistence - Page refresh maintains state', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const taskTitle = 'Persistent Test Task';
    
    // Add a task
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');

    await taskInput.fill(taskTitle);
    await addButton.click();
    await page.waitForTimeout(1000);

    // Mark it as completed
    const taskItem = page.locator('.task-item').filter({ hasText: taskTitle });
    const checkbox = taskItem.locator('.task-item__checkbox');
    await checkbox.click();
    await page.waitForTimeout(500);

    // Refresh the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify the task still exists and maintains its state
    const reloadedTaskItem = page.locator('.task-item').filter({ hasText: taskTitle });
    const reloadedCheckbox = reloadedTaskItem.locator('.task-item__checkbox');

    await expect(page.locator('.task-item__title', { hasText: taskTitle })).toBeVisible();
    await expect(reloadedCheckbox).toBeChecked();
    await expect(reloadedTaskItem).toHaveClass(/completed/);

    // Clean up
    const deleteButton = reloadedTaskItem.locator('.task-item__delete');
    await deleteButton.click();
    await page.waitForTimeout(500);
  });

  test('Concurrent operations', async ({ page, context }) => {
    // Open two pages to simulate concurrent users
    const page2 = await context.newPage();

    await page.goto('http://localhost:3000');
    await page2.goto('http://localhost:3000');
    
    await page.waitForLoadState('networkidle');
    await page2.waitForLoadState('networkidle');

    // Add a task from the first page
    await page.locator('.task-input__field').fill('Task from Page 1');
    await page.locator('.task-input__button').click();
    await page.waitForTimeout(500);

    // Add a task from the second page
    await page2.locator('.task-input__field').fill('Task from Page 2');
    await page2.locator('.task-input__button').click();
    await page2.waitForTimeout(500);

    // Refresh both pages to see if both tasks appear
    await page.reload();
    await page2.reload();
    
    await page.waitForLoadState('networkidle');
    await page2.waitForLoadState('networkidle');

    // Both tasks should be visible on both pages
    await expect(page.locator('.task-item__title', { hasText: 'Task from Page 1' })).toBeVisible();
    await expect(page.locator('.task-item__title', { hasText: 'Task from Page 2' })).toBeVisible();
    
    await expect(page2.locator('.task-item__title', { hasText: 'Task from Page 1' })).toBeVisible();
    await expect(page2.locator('.task-item__title', { hasText: 'Task from Page 2' })).toBeVisible();

    // Clean up - delete tasks from one page
    const task1 = page.locator('.task-item').filter({ hasText: 'Task from Page 1' });
    const task2 = page.locator('.task-item').filter({ hasText: 'Task from Page 2' });
    
    await task1.locator('.task-item__delete').click();
    await page.waitForTimeout(300);
    await task2.locator('.task-item__delete').click();
    await page.waitForTimeout(300);

    await page2.close();
  });
});
