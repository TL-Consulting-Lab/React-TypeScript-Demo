import { test, expect } from '@playwright/test';

test.describe('Task Management App', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
  });

  test('should load the main page', async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/React App/);
    
    // Check for main elements
    await expect(page.locator('.task-input')).toBeVisible();
    await expect(page.locator('input[placeholder="Add a new task..."]')).toBeVisible();
    await expect(page.locator('button:has-text("Add Task")')).toBeVisible();
  });

  test('should add a new task', async ({ page }) => {
    const taskTitle = 'Test Task from Playwright';
    
    // Find the input field and add button using specific class names
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');
    
    // Add a new task
    await taskInput.fill(taskTitle);
    await addButton.click();
    
    // Wait for the task list to update
    await page.waitForTimeout(1000);
    
    // Verify the task appears in the list with the correct class
    await expect(page.locator('.task-item__title', { hasText: taskTitle })).toBeVisible();
  });

  test('should toggle task completion', async ({ page }) => {
    const taskTitle = 'Task to Toggle';
    
    // Add a task first
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');
    
    await taskInput.fill(taskTitle);
    await addButton.click();
    
    // Wait for the task to appear
    await page.waitForTimeout(1000);
    await expect(page.locator('.task-item__title', { hasText: taskTitle })).toBeVisible();
    
    // Find the task item and its checkbox
    const taskItem = page.locator('.task-item').filter({ hasText: taskTitle });
    const checkbox = taskItem.locator('.task-item__checkbox');
    
    // Initially, the task should not be completed
    await expect(checkbox).not.toBeChecked();
    await expect(taskItem).not.toHaveClass(/completed/);
    
    // Click the checkbox to toggle completion
    await checkbox.click();
    
    // Wait for the state to update
    await page.waitForTimeout(500);
    
    // Verify the task is marked as completed
    await expect(checkbox).toBeChecked();
    await expect(taskItem).toHaveClass(/completed/);
  });

  test('should delete a task', async ({ page }) => {
    const taskTitle = 'Task to Delete';
    
    // Add a task first
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');
    
    await taskInput.fill(taskTitle);
    await addButton.click();
    
    // Wait for the task to appear
    await page.waitForTimeout(1000);
    await expect(page.locator('.task-item__title', { hasText: taskTitle })).toBeVisible();
    
    // Find the task item and its delete button
    const taskItem = page.locator('.task-item').filter({ hasText: taskTitle });
    const deleteButton = taskItem.locator('.task-item__delete');
    
    await deleteButton.click();
    
    // Wait for the deletion to complete
    await page.waitForTimeout(500);
    
    // Verify the task is removed
    await expect(page.locator('.task-item__title', { hasText: taskTitle })).not.toBeVisible();
  });

  test('should not add empty task', async ({ page }) => {
    // Try to add an empty task by clicking the button without entering text
    const addButton = page.locator('.task-input__button');
    
    // Count existing tasks
    const initialTaskCount = await page.locator('.task-item').count();
    
    // Click add button without entering text
    await addButton.click();
    
    // Wait a bit for any potential action
    await page.waitForTimeout(500);
    
    // Verify no new task was added
    const finalTaskCount = await page.locator('.task-item').count();
    expect(finalTaskCount).toBe(initialTaskCount);
  });

  test('should clear input after adding task', async ({ page }) => {
    const taskTitle = 'Task that clears input';
    
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');
    
    // Add a task
    await taskInput.fill(taskTitle);
    await addButton.click();
    
    // Wait for the task to be added
    await page.waitForTimeout(1000);
    
    // Verify the input field is cleared
    await expect(taskInput).toHaveValue('');
  });

  test('should handle multiple tasks', async ({ page }) => {
    const tasks = ['First task', 'Second task', 'Third task'];
    
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');
    
    // Add multiple tasks
    for (const task of tasks) {
      await taskInput.fill(task);
      await addButton.click();
      await page.waitForTimeout(500);
    }
    
    // Verify all tasks are present
    for (const task of tasks) {
      await expect(page.locator('.task-item__title', { hasText: task })).toBeVisible();
    }
    
    // Verify the total count
    await expect(page.locator('.task-item')).toHaveCount(tasks.length);
  });

  test('should maintain task state after toggle and refresh', async ({ page }) => {
    const taskTitle = 'Persistent task';
    
    // Add a task
    const taskInput = page.locator('.task-input__field');
    const addButton = page.locator('.task-input__button');
    
    await taskInput.fill(taskTitle);
    await addButton.click();
    await page.waitForTimeout(1000);
    
    // Toggle the task completion
    const taskItem = page.locator('.task-item').filter({ hasText: taskTitle });
    const checkbox = taskItem.locator('.task-item__checkbox');
    await checkbox.click();
    await page.waitForTimeout(500);
    
    // Refresh the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify the task still exists and maintains its completed state
    const reloadedTaskItem = page.locator('.task-item').filter({ hasText: taskTitle });
    const reloadedCheckbox = reloadedTaskItem.locator('.task-item__checkbox');
    
    await expect(page.locator('.task-item__title', { hasText: taskTitle })).toBeVisible();
    await expect(reloadedCheckbox).toBeChecked();
    await expect(reloadedTaskItem).toHaveClass(/completed/);
  });
});
