# Task Management Application Workflow

## Architecture Overview

```mermaid
graph TB
    subgraph Frontend
        UI[User Interface]
        ReactApp[React Application]
        subgraph Components
            TaskInput[TaskInput Component]
            TaskList[TaskList Component]
        end
    end

    subgraph Backend
        Express[Express Server]
        subgraph API
            GET[GET /api/tasks]
            POST[POST /api/tasks]
            PATCH[PATCH /api/tasks/:id]
            DELETE[DELETE /api/tasks/:id]
        end
        Memory[In-Memory Storage]
    end

    UI --> ReactApp
    ReactApp --> TaskInput
    ReactApp --> TaskList
    TaskInput --> |Add Task| POST
    TaskList --> |Fetch Tasks| GET
    TaskList --> |Toggle Task| PATCH
    TaskList --> |Delete Task| DELETE
    
    POST --> Memory
    GET --> Memory
    PATCH --> Memory
    DELETE --> Memory
```

## Component Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant TaskInput
    participant TaskList
    participant Backend
    participant Storage

    User->>TaskInput: Enter task title
    TaskInput->>Backend: POST /api/tasks
    Backend->>Storage: Store new task
    Backend->>TaskInput: Return created task
    TaskInput->>TaskList: Update task list

    User->>TaskList: Toggle task completion
    TaskList->>Backend: PATCH /api/tasks/:id
    Backend->>Storage: Update task status
    Backend->>TaskList: Return updated task

    User->>TaskList: Delete task
    TaskList->>Backend: DELETE /api/tasks/:id
    Backend->>Storage: Remove task
    Backend->>TaskList: Confirm deletion
```

## Error Handling Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant ErrorHandler

    User->>Frontend: Perform action
    Frontend->>Backend: API request
    
    alt Success
        Backend->>Frontend: Return success response
        Frontend->>User: Show success state
    else Network Error
        Backend->>ErrorHandler: Capture error
        ErrorHandler->>Frontend: Return error details
        Frontend->>User: Display error message
    else Validation Error
        Backend->>ErrorHandler: Validate input
        ErrorHandler->>Frontend: Return validation error
        Frontend->>User: Show validation message
    end
```

## State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: API Request
    Loading --> Success: Response OK
    Loading --> Error: Response Error
    Success --> Idle: Reset
    Error --> Idle: Retry
    
    state Success {
        [*] --> TasksLoaded
        TasksLoaded --> TaskAdded
        TaskAdded --> TasksUpdated
        TasksUpdated --> TasksLoaded
    }
    
    state Error {
        [*] --> NetworkError
        [*] --> ValidationError
        NetworkError --> RetryPrompt
        ValidationError --> UserCorrection
    }
```

## Development Workflow

```mermaid
gitGraph
    commit id: "initial"
    branch feature/setup
    checkout feature/setup
    commit id: "project-structure"
    commit id: "dependencies"
    checkout main
    merge feature/setup
    branch feature/task-management
    checkout feature/task-management
    commit id: "task-interface"
    commit id: "backend-api"
    commit id: "frontend-components"
    checkout main
    merge feature/task-management
    branch feature/testing
    checkout feature/testing
    commit id: "unit-tests"
    commit id: "api-tests"
    checkout main
    merge feature/testing
```

## Testing Architecture

```mermaid
graph TB
    subgraph Frontend Tests
        ComponentTests[Component Tests]
        IntegrationTests[Integration Tests]
        UITests[UI Tests]
    end

    subgraph Backend Tests
        APITests[API Tests]
        ValidationTests[Validation Tests]
        ErrorTests[Error Handling Tests]
    end

    ComponentTests --> |Jest + RTL| TestRunner[Test Runner]
    IntegrationTests --> |Jest| TestRunner
    UITests --> |React Testing Library| TestRunner
    APITests --> |Supertest| TestRunner
    ValidationTests --> |Jest| TestRunner
    ErrorTests --> |Jest| TestRunner

    TestRunner --> |Generate| Reports[Test Reports]
```

## Directory Structure

```mermaid
graph TD
    Root[React_demo] --> Frontend[frontend/]
    Root --> Backend[backend/]
    Root --> Docs[Documentation Files]

    Frontend --> FeSrc[src/]
    Frontend --> FePublic[public/]
    Frontend --> FeConfig[Configuration Files]

    FeSrc --> Components[components/]
    FeSrc --> Tests[__tests__/]
    FeSrc --> Types[types.ts]

    Backend --> BeSrc[src/]
    Backend --> BeConfig[Configuration Files]
    Backend --> BeTests[__tests__/]

    Components --> TaskInput[TaskInput.tsx]
    Components --> TaskList[TaskList.tsx]
```
