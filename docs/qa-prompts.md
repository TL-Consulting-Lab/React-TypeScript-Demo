# 🚀 QA Demo Prompts for Task Management Application

<div align="center">

![QA Prompts](https://img.shields.io/badge/QA-Demo_Prompts-FF6B35?style=for-the-badge&logo=chat&logoColor=white)
![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-Ready-7C3AED?style=for-the-badge&logo=github&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-Interactive-4CAF50?style=for-the-badge&logo=check-circle&logoColor=white)

</div>

This document provides clear instructions and prompts for generating robust unit and integration tests. Use these prompts to guide your test creation and ensure coverage of all important scenarios.

<details>
<summary>📋 <strong>Quick Navigation</strong></summary>

- [🔍 Basic Commands](#-basic-commands)
- [🧪 Backend Unit Tests](#1-backend-unit-test-prompts)
- [🎨 Frontend Component Tests](#2-frontend-component-integration-test-prompts-react-component)
- [📊 Test Coverage Analysis](#3-test-coverage-analysis)
- [🤖 Development Approaches](#development-approaches)
- [⚡ Performance Testing](#performance-test)
- [🔗 Integration Tests](#integration-tests)
- [🛠️ Error Handling](#add-error-handling)
- [📚 Documentation](#documentation)

</details>

---

## 🔍 Basic Commands

<div style="background: #2D3748; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #667eea;">

#### 💬 **Code Understanding:**
```
Please explain this codebase and provide a high-level summary of its structure and purpose
```

</div>

<div style="background: #1A202C; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #38B2AC;">

#### 💬 **Server Health Check:**
```
check if both servers are running correctly
```

</div>

<div style="background: #2D1B69; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #9F7AEA;">

#### 💬 **Quick Launch:**
```
run the app locally
```

</div> 

---

## 🧪 1. Backend Unit Test Prompts

<div style="background: #2A4365; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3182CE;">

#### 💬 **Comprehensive Backend Testing:**
```
Write unit tests using Jest for the Add Task feature in the backend, targeting a range of inputs and conditions including covering all edge cases.
```

**📋 Test Categories:**
- ✅ **Successful Task Creation**
- ❌ **Invalid Input Validation**
- 🔧 **Malformed Request Handling**
- 📝 **Extra Fields Handling**
- 🚀 **Stress Testing**
- 📊 **Response Structure Validation**
- 🎯 **Edge Cases Covered**

</div>

---

## 🎨 2. Frontend Component Integration Test Prompts (React Component)

### 📝 Add Task Form

<div style="background: #1A365D; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #2B6CB0;">

#### 💬 **Frontend Component Integration:**
```
Create integration tests for the frontend component for API endpoint, testing with both valid and invalid inputs
```

</div>

<div style="background: #2C5530; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #38A169;">

#### 💬 **React Component Testing:**
```
Generate integration tests for a React component that accepts user input and triggers a callback. Cover:
- Rendering of input fields and buttons
- Valid input submission and callback invocation
- Prevention of empty or invalid submissions
- Error handling when the callback fails
- Accessibility and keyboard navigation
```

</div>

### 📋 Task List Component

<div style="background: #553C9A; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #805AD5;">

#### 💬 **Task List Validation:**
```
Write tests to validate rendering and interactions:
- Rendering with empty and non-empty data
- User interactions (toggle, delete)
- Callback invocation with correct arguments
```

</div>

---

## 📊 3. Test Coverage Analysis

### 🔍 Coverage Gap Analysis

<div style="background: #2D3748; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4FD1C7;">

#### 💬 **Code Coverage Assessment:**
```
Analyze the code and suggest which branches or cases are missing from the current tests.
```

</div>

### 📈 Automated Coverage Analysis

<div style="background: #1A365D; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3182CE;">

#### 💬 **Comprehensive Coverage Review:**
```
Include automated or manual analysis to:
• Detect untested branches, logic paths, or conditions
• Recommend test cases to improve coverage score
• Validate that both happy paths and failure modes are exercised
```

</div>
 
## 🧪 Mock Testing

<div style="background: #553C9A; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #805AD5;">

#### 💬 **API Integration Mock Test:**
```
Create a API integration test (mocked) for frontend components
```

</div>

---

## 🎯 Test-Driven Development (TDD)

<div style="background: #8B2635; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #E53E3E;">

#### 💬 **TDD Implementation Prompt:**
```
Perform Test-Driven Development to implement a 'Add Task' feature in a React + TypeScript application. Start by writing unit tests using Jest and React Testing Library. The feature should include a title input, validate that the input is not empty, and call an onCreate callback with the task title on successful submission. Follow the red-green-refactor cycle and explain each step
```

</div>

---

## 🎭 Behavior-Driven Development (BDD)

<div style="background: #2C5530; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #38A169;">

#### 💬 **BDD Testing Prompt:**
```
Write BDD-style tests and implementation for a 'Create Task' feature in a React + TypeScript application using Jest and React Testing Library. Use the Given-When-Then format to define user scenarios such as:

• Given the task input is empty, When the user submits the form, Then an error message should appear.
• Given a valid task title is entered, When the user submits the form, Then the onCreate callback should be triggered with the task title.
• Given the task is created successfully, When the form is submitted, Then the input field should be cleared.

Structure the tests using nested describe and it blocks to reflect behavior. Emphasize clarity, user intent, and test readability. Then implement the component behavior to satisfy the tests.
```

</div>

---

## ⚡ Performance Testing

<div style="background: #B7791F; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #F6AD55;">

#### 💬 **JMeter Performance Test:**
```
Help me write performance tests for the task API using JMeter
```

</div>

---

## 🔧 4. App Component Integration Test Prompts

<div style="background: #1A365D; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #2B6CB0;">

#### 💬 **Network Request Mocking:**
```
Mocks network requests using native fetch mocking (avoid MSW for this demo)
Covers:
• Initial loading state
• Empty list state  
• Error state from failed fetch
```

</div>

<div style="background: #2C5530; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #38A169;">

#### 💬 **Form Submission & API Flow:**
```
Submits form and validates:
• POST and GET request flows
• Correct API endpoints hit
• UI updates accordingly (new task appears, loader hides, etc.)
• Handles API errors gracefully and displays messages to users
```

</div>

---

## 🌐 5. Backend API Integration Test Prompts

<div style="background: #8B2635; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #E53E3E;">

#### 💬 **REST API Endpoint Testing:**
```
Generate integration tests for a REST API endpoint (e.g., POST /api/tasks) that:
• Resets state before each test
• Tests valid input and successful creation
• Tests invalid input (missing, null, empty, non-string)
• Tests edge cases (long strings, special characters)
• Verifies persistence and correct default values
• Handles malformed JSON and wrong content type
• Tests concurrent and rapid requests
```

</div>

---

## ⚠️ Error Handling

<div style="background: #B7791F; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #F6AD55;">

#### 💬 **Error Handling Features:**
```
Add error handling features:
• Ensure the application handles errors gracefully, both on the frontend and backend
• Implement user-friendly error messages
• Ensure the application does not crash on errors and provides feedback to users
```

</div>

---

## 📚 Documentation

<div style="background: #553C9A; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #805AD5;">

#### 💬 **Inline Documentation:**
```
Generate inline documentation for this functionality
```

</div>

<div style="background: #1A202C; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4A5568;">

#### 💬 **Comprehensive Documentation:**
```
Generate comprehensive documentation for the following:
• API endpoints
• Component props and usage
• Error handling strategies
```

</div>

---

<div align="center">

## 🎉 Ready to Build Robust Tests?

<div style="background: #1A202C; color: white; padding: 30px; border-radius: 15px; margin: 20px 0; border: 2px solid #4FD1C7;">

### 🧪 **Start Testing Now!**

**Copy any prompt above and paste it into GitHub Copilot Chat**

🎯 **Pro Tip:** Combine multiple prompts for comprehensive test coverage!

</div>

---

### 📞 **Support & Community**

Got questions about testing? Need help with QA strategies? The GitHub Copilot community is here for you!

![GitHub Copilot](https://img.shields.io/badge/Powered_by-GitHub_Copilot-7C3AED?style=for-the-badge&logo=github&logoColor=white)
![Testing](https://img.shields.io/badge/QA-Ready-4CAF50?style=for-the-badge&logo=check-circle&logoColor=white)

</div> 