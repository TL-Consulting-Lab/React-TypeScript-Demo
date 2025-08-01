# GitHub Copilot Challenges

This document contains a series of challenges designed to help you explore and master GitHub Copilot's capabilities while working with the React-TypeScript Task Manager application.

## Getting Started

Before beginning these challenges, ensure you have:
- GitHub Copilot extension installed in VS Code
- The Task Manager application running locally
- Basic understanding of React, TypeScript, and Node.js

## Challenge Categories

### 🚀 Beginner Challenges

#### Challenge 1: Add Due Date Functionality
**Scenario**: The product owner notices users often forget to complete tasks on time. To solve this, you’ve been asked to add Due Date support to the application.

**Requirements:**
- Each task should have an optional due date (DD-MM-YYYY format).
- Existing tasks should not break.
- Update both the backend and frontend as needed.

**Challenge**:
How will you update the system to support due dates throughout the app? What changes are needed on the data model, API, and UI?

---

#### Challenge 2: Write Unit Tests for Due Date Logic
**Scenario**: To ensure the new due date feature works reliably, create automated tests to validate its behavior.

**Requirements:**
- Cover both typical and edge cases (e.g., missing/invalid dates).
- Test both the backend and, if possible, front-end logic.

**Challenge**:
What must be tested? How would you design robust unit tests for this feature?

---

#### Challenge 3: Add Task Categories
**Scenario**: Users want to organize their tasks into categories such as "Work", "Personal", etc.

**Requirements:**
- Extend the data model to support categories.
- Update APIs and UI to allow users to specify and view task categories.

**Challenge**:
How will you migrate existing data? What validation might be necessary for categories?

---

#### Challenge 4:  Documentation Improvements
**Scenario**: Team productivity suffers from a lack of clear documentation.

**Requirements:**
- Improve project setup guides.
- Add explanatory comments to key functions.
- Document API endpoints (requests/responses).
- Write developer guidelines for contributing.

**Challenge**:
Which parts of the codebase lack clarity? How would you approach creating or improving documentation to help future developers?

---

#### Challenge 5:  Explain Code
**Scenario**: A new developer joined your team and is struggling to understand one of your core modules.

**Challenge**:
Choose an appropriate workflow diagram style (e.g., mermaid, flowchart).

- What are the key steps and data flows?
- Sketch out (even in markdown or ASCII) a simple diagram.

---

#### Challenge 6:  Generate a Workflow Diagram
**Scenario**: A developer from another project wants to contribute but is unsure how to run the app locally.

**Challenge**:
Which parts of the codebase lack clarity? How would you approach creating or improving documentation to help future developers?

---

#### Challenge 7:  Running the Application
**Scenario**:The team lead requests a diagram to explain the app’s high-level flow, from task creation to UI display.

**Challenge**:
- What steps must be taken to set up, configure, and run both the backend and frontend?
- How would you help them resolve common setup problems?

---

#### Challenge 8: Create a Pull Request
**Scenario**: You’ve finished the above features and are ready to contribute them.

**Challenge**:
Demonstrate best practices for:

- Creating a well-documented PR
- Writing a clear, helpful description
- Keeping your branch up-to-date
- Pushing code and addressing feedback

---

### 🔧 Advanced Challenges

#### Challenge 9: Implement Task Search and Filtering
**Scenario**: 
The team wants users to quickly find and filter tasks in the UI.

**Requirements:**
- Support searching by title, description, and category.
- Add advanced filters (due date, status).
- Enable sorting options.

**Challenge**:
How would you structure your backend and frontend to support these features efficiently? Are there performance considerations, and how do you handle them?

---

#### Challenge 10: Task Dependencies and Subtasks
**Scenario**: 
Users need to break big tasks into smaller ones and set dependencies.

**Requirements:**

- Implement support for subtasks within a task.
- Allow the definition of dependency relationships (a task can’t be completed until dependencies are done).
- Prevent circular dependencies.

**Challenge**:
What changes are required in the data model/API/UI?
How will you validate and enforce dependency rules?

---

#### Challenge 11: The project is growing, and stability is critical.

**Requirements:**
- Add integration tests spanning backend and frontend.
- Benchmark performance.
- Implement end-to-end (E2E) and load testing.

Challenge:
Which user journeys are business-critical and should be tested end-to-end?
How would you structure your tests for maximum coverage?

---

#### Challenge 12: Error Handling and Validation
**Scenario**: Handling errors gracefully is essential for a good user experience.

**Requirements:**
- Implement comprehensive input validation on all endpoints.
- Improve error messages for users and logs for developers.
- Add centralized error handling in the backend.

**Challenge**:
What design patterns or libraries would you use for error handling and monitoring?

---

#### Challenge 13: CI/CD and Automation
**Scenario**: Frequent releases are introducing bugs. Automation is needed.

**Requirements:**
- Set up a CI process for testing and linting.
- Automate deployments to the dev environment.
- Implement release management.

**Challenge**:
What is your CI/CD workflow? Outline or diagram the process you would implement.

---

### 🧪 Testing Challenges

#### Challenge: E2E Testing
**Objective**: Create end-to-end tests using Playwright with Copilot assistance.

**Tasks**:
- Write user journey tests
- Create page object models
- Implement visual regression tests

---

#### Challenge : API Testing
**Objective**: Comprehensive API testing with various scenarios.

**Tasks**:
- Test all CRUD operations
- Validate error responses
- Test edge cases and boundary conditions

---

## Tips for Success

1. **Be Specific**: The more specific your prompts, the better Copilot's suggestions
2. **Iterate**: Refine prompts based on the generated code
3. **Review**: Always review and understand the generated code
4. **Context**: Provide context in comments before asking for code generation
5. **Experiment**: Try different phrasings for the same request

## Evaluation Criteria

For each challenge, consider:
- **Functionality**: Does the code work as expected?
- **Quality**: Is the code clean, readable, and maintainable?
- **Best Practices**: Does it follow TypeScript/React best practices?
- **Testing**: Is the code properly tested?
- **Documentation**: Is the code well-documented?

## Conclusion

These challenges are designed to progressively build your skills with GitHub Copilot while creating real, functional code. Remember that Copilot is a tool to enhance your productivity, not replace your understanding of code. Always review, test, and understand the generated code.

Happy coding! 🎉
