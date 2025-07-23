# QA Demo Prompts for React TypeScript Integration Testing

This document provides clear instructions and prompts for generating robust unit and integration tests. Use these prompts to guide your test creation and ensure coverage of all important scenarios.

## Explain Code
- Please explain this codebase and provide a high-level summary of its structure and purpose

## Check if servers are running
- check if both servers are running correctly

# perform an action
- run the app locally 

## 1. Backend Unit Test Prompts: 

Write unit tests using Jest for the Add Task feature in the backend, targeting a range of inputs and conditions including covering all edge cases.

- Test Categories:
  - Successful Task Creation 
  - Invalid Input Validation
  - Malformed Request Handling
  - Extra Fields Handling 
  - Stress Testing
  - Response Structure Validation
  - Edge Cases Covered

## 2. Frontend Component Integration Test Prompts (React Component)

### Add Task Form
Create integration tests for the frontend componebt for API endpoint, testing with both valid and invalid inputs

Generate integration tests for a React component that accepts user input and triggers a callback. Cover:
  - Rendering of input fields and buttons
  - Valid input submission and callback invocation
  - Prevention of empty or invalid submissions
  - Error handling when the callback fails
  - Accessibility and keyboard navigation

### Task List Component
Write tests to validate rendering and interactions:

  - Rendering with empty and non-empty data
  - User interactions (toggle, delete)
  - Callback invocation with correct arguments

## 3. Test Coverage Analysis
- Analyze the code and suggest which branches or cases are missing from the current tests.

- Include automated or manual analysis to:

  - Detect untested branches, logic paths, or conditions
  - Recommend test cases to improve coverage score
  - Validate that both happy paths and failure modes are exercised
 
## Mock Test 
- Create a API integration test (mocked) for frontend componenets

## Test-Driven Development(TDD)
Perform Test-Driven Development to implement a 'Add Task' feature in a React + TypeScript application. Start by writing unit tests using Jest and React Testing Library. The feature should include a title input, validate that the input is not empty, and call an onCreate callback with the task title on successful submission. Follow the red-green-refactor cycle and explain each step

## Behavior-Driven Development (BDD)
Write BDD-style tests and implementation for a 'Create Task' feature in a React + TypeScript application using Jest and React Testing Library. Use the Given-When-Then format to define user scenarios such as:
Given the task input is empty, When the user submits the form, Then an error message should appear.
Given a valid task title is entered, When the user submits the form, Then the onCreate callback should be triggered with the task title.
Given the task is created successfully, When the form is submitted, Then the input field should be cleared.

Structure the tests using nested describe and it blocks to reflect behavior. Emphasize clarity, user intent, and test readability. Then implement the component behavior to satisfy the tests."

## Perfromance Test
Help me write performance tests for the task API using Jmeter

## 4. App Component Integration Test Prompts

Mocks network requests using native fetch mocking (avoid MSW for this demo)
Covers:
 - Initial loading state
 - Empty list state
 - Error state from failed fetch
 
Submits form and validates:
 - POST and GET request flows
 - Correct API endpoints hit
 - UI updates accordingly (new task appears, loader hides, etc.)
 - Handles API errors gracefully and displays messages to users

## 5. Backend API Integration Test Prompts

- Generate integration tests for a REST API endpoint (e.g., POST /api/tasks) that:
  - Resets state before each test
  - Tests valid input and successful creation
  - Tests invalid input (missing, null, empty, non-string)
  - Tests edge cases (long strings, special characters)
  - Verifies persistence and correct default values
  - Handles malformed JSON and wrong content type
  - Tests concurrent and rapid requests

## Add Error Handling 

- Add error handling features:
    - Ensure the application handles errors gracefully, both on the frontend and backend.
    - Implement user-friendly error messages
    - Ensure the application does not crash on errors and provides feedback to users.

## Documentation
- Generate inline documentation for this functionality

- Generate comprehensive documentation for the following:
    - API endpoints
    - Component props and usage
    - Error handling strategies 
