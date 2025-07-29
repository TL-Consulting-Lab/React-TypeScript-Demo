import { test, expect } from '@playwright/test';
import { TaskPage, ApiHelper, TestData, Utils } from './helpers/page-objects';

test.describe('Task Management with Page Objects', () => {
  let taskPage: TaskPage;
  let apiHelper: ApiHelper;

  test.beforeEach(async ({ page }) => {
    taskPage = new TaskPage(page);
    apiHelper = new ApiHelper(page);
    
    // Clear any existing tasks
    await Utils.clearAllTasks(page);
    
    // Navigate to the app
    await taskPage.navigateToApp();
  });

  test('should add and verify task using page objects', async () => {
    const taskTitle = TestData.randomTaskTitle();
    
    // Add task through UI
    await taskPage.addTask(taskTitle);
    
    // Verify in UI
    await taskPage.expectTaskVisible(taskTitle);
    await taskPage.expectTaskNotCompleted(taskTitle);
    await taskPage.expectInputCleared();
    
    // Verify in API
    await apiHelper.expectTaskExists(taskTitle);
  });

  test('should handle multiple tasks efficiently', async ({ page }) => {
    const taskTitles = TestData.taskTitles.slice(0, 3);
    
    // Add multiple tasks
    for (const title of taskTitles) {
      await taskPage.addTask(title);
    }
    
    // Verify all tasks appear
    for (const title of taskTitles) {
      await taskPage.expectTaskVisible(title);
    }
    
    await taskPage.expectTaskCount(taskTitles.length);
    
    // Toggle middle task
    await taskPage.toggleTask(taskTitles[1]);
    await taskPage.expectTaskCompleted(taskTitles[1]);
    
    // Verify other tasks remain unchanged
    await taskPage.expectTaskNotCompleted(taskTitles[0]);
    await taskPage.expectTaskNotCompleted(taskTitles[2]);
  });

  test('should handle special characters in task titles', async () => {
    const specialTitle = TestData.specialCharacterTitles[0];
    
    await taskPage.addTask(specialTitle);
    await taskPage.expectTaskVisible(specialTitle);
    
    const task = await apiHelper.expectTaskExists(specialTitle);
    expect(task.title).toBe(specialTitle);
  });

  test('should handle long task titles', async () => {
    const longTitle = TestData.longTaskTitle();
    
    await taskPage.addTask(longTitle);
    await taskPage.expectTaskVisible(longTitle);
    
    // Verify task item doesn't break the layout
    const taskItem = taskPage.taskItem(longTitle);
    await expect(taskItem).toBeVisible();
  });

  test('should sync UI and API state correctly', async () => {
    const taskTitle = TestData.randomTaskTitle();
    
    // Create task via API
    const createdTask = await apiHelper.createTask(taskTitle);
    
    // Refresh page to see API-created task
    await taskPage.navigateToApp();
    await taskPage.expectTaskVisible(taskTitle);
    
    // Toggle via UI
    await taskPage.toggleTask(taskTitle);
    
    // Verify API reflects the change
    await apiHelper.expectTaskCompleted(createdTask.id, true);
    
    // Delete via UI
    await taskPage.deleteTask(taskTitle);
    
    // Verify API reflects the deletion
    await apiHelper.expectTaskNotExists(createdTask.id);
  });

  test('should handle concurrent operations gracefully', async ({ page, context }) => {
    const page2 = await context.newPage();
    const taskPage2 = new TaskPage(page2);
    const apiHelper2 = new ApiHelper(page2);
    
    await taskPage2.navigateToApp();
    
    const task1Title = 'Task from Page 1';
    const task2Title = 'Task from Page 2';
    
    // Add tasks from both pages simultaneously
    await Promise.all([
      taskPage.addTask(task1Title),
      taskPage2.addTask(task2Title)
    ]);
    
    // Refresh both pages
    await taskPage.navigateToApp();
    await taskPage2.navigateToApp();
    
    // Both tasks should be visible on both pages
    await taskPage.expectTaskVisible(task1Title);
    await taskPage.expectTaskVisible(task2Title);
    await taskPage2.expectTaskVisible(task1Title);
    await taskPage2.expectTaskVisible(task2Title);
    
    await page2.close();
  });

  test.describe('Error scenarios', () => {
    test('should handle API errors gracefully', async ({ page }) => {
      // Intercept API calls to simulate server error
      await page.route('**/api/tasks', route => {
        if (route.request().method() === 'POST') {
          route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Server Error' })
          });
        } else {
          route.continue();
        }
      });
      
      const taskTitle = TestData.randomTaskTitle();
      
      // Try to add a task
      await taskPage.addTask(taskTitle);
      
      // Task should not appear due to API error
      await taskPage.expectTaskNotVisible(taskTitle);
      
      // Remove route interception
      await page.unroute('**/api/tasks');
    });

    test('should handle network timeouts', async ({ page }) => {
      // Intercept and delay API calls
      await page.route('**/api/tasks', async route => {
        if (route.request().method() === 'POST') {
          await new Promise(resolve => setTimeout(resolve, 5000));
          route.continue();
        } else {
          route.continue();
        }
      });
      
      const taskTitle = TestData.randomTaskTitle();
      
      // This test depends on your timeout handling implementation
      await taskPage.addTask(taskTitle);
      
      // Clean up
      await page.unroute('**/api/tasks');
    });
  });

  test.describe('Performance tests', () => {
    test('should handle large number of tasks', async ({ page }) => {
      const numberOfTasks = 20;
      const taskTitles = Array.from({ length: numberOfTasks }, (_, i) => `Task ${i + 1}`);
      
      // Pre-create tasks via API for speed
      await Utils.setupTestData(page, taskTitles);
      
      // Refresh to load all tasks
      await taskPage.navigateToApp();
      
      // Verify all tasks are loaded
      await taskPage.expectTaskCount(numberOfTasks);
      
      // Verify UI remains responsive
      await taskPage.addTask('New Task');
      await taskPage.expectTaskCount(numberOfTasks + 1);
    });

    test('should perform operations within acceptable time limits', async ({ page }) => {
      const taskTitle = TestData.randomTaskTitle();
      
      // Measure task addition time
      const startTime = Date.now();
      await taskPage.addTask(taskTitle);
      const addTime = Date.now() - startTime;
      
      expect(addTime).toBeLessThan(3000); // Should complete within 3 seconds
      
      // Measure toggle time
      const toggleStartTime = Date.now();
      await taskPage.toggleTask(taskTitle);
      const toggleTime = Date.now() - toggleStartTime;
      
      expect(toggleTime).toBeLessThan(2000); // Should complete within 2 seconds
    });
  });
});
