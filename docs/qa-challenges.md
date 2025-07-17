## QA Challenges

1. Codebase Orientation Prompts
- "Summarize the core functionality of this project, highlighting the interplay between backend and frontend."
- "Describe the main modules of the Express backend and their responsibilities."
- "Outline the major React components/pages and their roles."

2. App Component Integration Test Prompts

- Mocks network requests using native fetch mocking (avoid MSW for this demo)
    Covers:
 - Initial loading state
 - Empty list state
 - Error state from failed fetch
 
- Submits form and validates:
 - POST and GET request flows
 - Correct API endpoints hit
 - UI updates accordingly (new task appears, loader hides, etc.)

- Handles API errors gracefully and displays messages to users

3. Backend API Integration Test Prompts

- Generate integration tests for a REST API endpoint (e.g., POST /api/tasks) that:
  - Resets state before each test
  - Tests valid input and successful creation
  - Tests invalid input (missing, null, empty, non-string)
  - Tests edge cases (long strings, special characters)
  - Verifies persistence and correct default values
  - Handles malformed JSON and wrong content type
  - Tests concurrent and rapid requests

4. Add Error Handling 

- Add error handling features:
    - Ensure the application handles errors gracefully, both on the frontend and backend.
    - Implement user-friendly error messages
    - Ensure the application does not crash on errors and provides feedback to users.

5. Improve Test Coverage
   - "Analyze test coverage and suggest improvements"
   - "Add missing tests for task validation logic"

6. End-to-End Testing
   - "Set up end-to-end tests for the task management workflow"
   - "Integrate Cypress for UI testing"

7. Performance Testing
   - "Help me write performance tests for the task API"
   - "Analyze response times and suggest optimizations"

8. Continuous Testing
   - "Set up a testing pipeline with GitHub Actions"
   - "Integrate automated testing into the CI/CD workflow"

9. Test-Driven Development (TDD)
   - "Guide me through TDD for the task creation feature"
   - "Help me refactor code to improve testability"

10. Code Review and Feedback
   - "Provide feedback on my test implementation"
   - "Suggest improvements for my test organization"

These QA challenges will help you enhance the quality and reliability of your codebase while leveraging GitHub Copilot's capabilities.