import { test, expect, request } from '@playwright/test';

const API_BASE_URL = 'http://localhost:5000/api';

test.describe('Task API Tests', () => {
  let apiContext: any;

  test.beforeAll(async ({ playwright }) => {
    // Create a new API request context
    apiContext = await playwright.request.newContext({
      baseURL: API_BASE_URL,
    });
  });

  test.afterAll(async () => {
    // Dispose the API request context
    await apiContext.dispose();
  });

  test('GET /tasks - should retrieve all tasks', async () => {
    const response = await apiContext.get('/tasks');
    
    expect(response.status()).toBe(200);
    
    const tasks = await response.json();
    expect(Array.isArray(tasks)).toBe(true);
    
    // Each task should have the expected structure
    if (tasks.length > 0) {
      tasks.forEach((task: any) => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('completed');
        expect(typeof task.id).toBe('number');
        expect(typeof task.title).toBe('string');
        expect(typeof task.completed).toBe('boolean');
      });
    }
  });

  test('POST /tasks - should create a new task', async () => {
    const newTask = {
      title: 'Test Task from API Test'
    };

    const response = await apiContext.post('/tasks', {
      data: newTask
    });

    expect(response.status()).toBe(201);
    
    const createdTask = await response.json();
    expect(createdTask).toHaveProperty('id');
    expect(createdTask.title).toBe(newTask.title);
    expect(createdTask.completed).toBe(false);
    expect(typeof createdTask.id).toBe('number');
  });

  test('POST /tasks - should validate required fields', async () => {
    // Try to create a task without title
    const invalidTask = {};

    const response = await apiContext.post('/tasks', {
      data: invalidTask
    });

    expect(response.status()).toBe(400);
    
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
  });

  test('POST /tasks - should handle empty title', async () => {
    const invalidTask = {
      title: ''
    };

    const response = await apiContext.post('/tasks', {
      data: invalidTask
    });

    expect(response.status()).toBe(400);
    
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
  });

  test('PUT /tasks/:id - should update task completion status', async () => {
    // First, create a task
    const newTask = { title: 'Task to Update' };
    const createResponse = await apiContext.post('/tasks', { data: newTask });
    const createdTask = await createResponse.json();

    // Update the task
    const updateData = { completed: true };
    const updateResponse = await apiContext.put(`/tasks/${createdTask.id}`, {
      data: updateData
    });

    expect(updateResponse.status()).toBe(200);
    
    const updatedTask = await updateResponse.json();
    expect(updatedTask.id).toBe(createdTask.id);
    expect(updatedTask.title).toBe(createdTask.title);
    expect(updatedTask.completed).toBe(true);
  });

  test('PUT /tasks/:id - should update task title', async () => {
    // First, create a task
    const newTask = { title: 'Original Title' };
    const createResponse = await apiContext.post('/tasks', { data: newTask });
    const createdTask = await createResponse.json();

    // Update the task title
    const updateData = { title: 'Updated Title' };
    const updateResponse = await apiContext.put(`/tasks/${createdTask.id}`, {
      data: updateData
    });

    expect(updateResponse.status()).toBe(200);
    
    const updatedTask = await updateResponse.json();
    expect(updatedTask.id).toBe(createdTask.id);
    expect(updatedTask.title).toBe('Updated Title');
    expect(updatedTask.completed).toBe(createdTask.completed);
  });

  test('PUT /tasks/:id - should handle non-existent task', async () => {
    const nonExistentId = 99999;
    const updateData = { completed: true };

    const response = await apiContext.put(`/tasks/${nonExistentId}`, {
      data: updateData
    });

    expect(response.status()).toBe(404);
    
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
  });

  test('DELETE /tasks/:id - should delete a task', async () => {
    // First, create a task
    const newTask = { title: 'Task to Delete' };
    const createResponse = await apiContext.post('/tasks', { data: newTask });
    const createdTask = await createResponse.json();

    // Delete the task
    const deleteResponse = await apiContext.delete(`/tasks/${createdTask.id}`);
    expect(deleteResponse.status()).toBe(200);

    // Verify the task is deleted by trying to fetch all tasks
    const getResponse = await apiContext.get('/tasks');
    const allTasks = await getResponse.json();
    
    const deletedTask = allTasks.find((task: any) => task.id === createdTask.id);
    expect(deletedTask).toBeUndefined();
  });

  test('DELETE /tasks/:id - should handle non-existent task', async () => {
    const nonExistentId = 99999;

    const response = await apiContext.delete(`/tasks/${nonExistentId}`);
    expect(response.status()).toBe(404);
    
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
  });

  test('should handle CORS headers', async () => {
    const response = await apiContext.get('/tasks');
    
    // Check for CORS headers (adjust based on your backend configuration)
    const headers = response.headers();
    expect(headers).toHaveProperty('access-control-allow-origin');
  });

  test('API workflow - complete task lifecycle', async () => {
    // 1. Create a new task
    const newTask = { title: 'Workflow Test Task' };
    const createResponse = await apiContext.post('/tasks', { data: newTask });
    expect(createResponse.status()).toBe(201);
    const createdTask = await createResponse.json();

    // 2. Verify task appears in the list
    const getResponse = await apiContext.get('/tasks');
    const allTasks = await getResponse.json();
    const foundTask = allTasks.find((task: any) => task.id === createdTask.id);
    expect(foundTask).toBeDefined();
    expect(foundTask.title).toBe(newTask.title);
    expect(foundTask.completed).toBe(false);

    // 3. Update task to completed
    const updateResponse = await apiContext.put(`/tasks/${createdTask.id}`, {
      data: { completed: true }
    });
    expect(updateResponse.status()).toBe(200);
    const updatedTask = await updateResponse.json();
    expect(updatedTask.completed).toBe(true);

    // 4. Delete the task
    const deleteResponse = await apiContext.delete(`/tasks/${createdTask.id}`);
    expect(deleteResponse.status()).toBe(200);

    // 5. Verify task is deleted
    const finalGetResponse = await apiContext.get('/tasks');
    const finalTasks = await finalGetResponse.json();
    const deletedTask = finalTasks.find((task: any) => task.id === createdTask.id);
    expect(deletedTask).toBeUndefined();
  });
});
