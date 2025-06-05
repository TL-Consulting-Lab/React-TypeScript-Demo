# Full Stack TypeScript Application

This is a full-stack application with a TypeScript Express backend and React TypeScript frontend.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/) for version control

Required knowledge:
- Basic understanding of TypeScript
- Familiarity with React
- Understanding of Express.js
- Knowledge of RESTful APIs

IDE Requirements:
- VS Code (recommended) with the following extensions:
  - ESLint
  - Prettier (for code formatting)
  - TypeScript support

## Project Structure

- `backend/` - Express TypeScript backend
- `frontend/` - React TypeScript frontend

## Getting Started

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:5000

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on http://localhost:3000

## Development

- Backend: The TypeScript Express server is configured with hot-reloading using ts-node.
- Frontend: Create React App with TypeScript template provides hot-reloading out of the box.

## Available Scripts

### Backend
- `npm run dev` - Start the development server
- `npm run build` - Build the TypeScript code
- `npm start` - Run the built code
- `npm run watch` - Run TypeScript compiler in watch mode

### Frontend
- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## Development Progress

Here's a chronological list of development steps and issues addressed:

1. Initial Setup
   - Created a full-stack TypeScript application with React frontend and Express backend
   - Set up basic project structure and dependencies
   - Implemented basic API endpoint communication

2. Task Management Implementation
   - Added Task interface and API endpoints for CRUD operations
   - Implemented frontend components (TaskInput and TaskList)
   - Set up proper TypeScript types

3. Troubleshooting & Fixes
   - Fixed TypeScript module issues with types.ts
   - Resolved backend server startup issues
   - Added proper error handling and loading states
   - Fixed task creation functionality

4. Features Implemented
   - Add new tasks
   - Display list of tasks
   - Toggle task completion status
   - Delete tasks
   - Real-time error feedback
   - Loading states for better UX

## API Documentation

### Endpoints

#### GET /api/tasks
- Description: Retrieve all tasks
- Response: Array of Task objects
```typescript
[
  {
    id: number,
    title: string,
    completed: boolean,
    createdAt: Date
  }
]
```

#### POST /api/tasks
- Description: Create a new task
- Request Body:
```typescript
{
  title: string
}
```
- Response: Created Task object

#### PATCH /api/tasks/:id
- Description: Toggle task completion status
- Parameters: 
  - id: Task ID (number)
- Response: Updated Task object

#### DELETE /api/tasks/:id
- Description: Delete a task
- Parameters:
  - id: Task ID (number)
- Response: 204 No Content

## Component Documentation

### TaskInput
- Location: `frontend/src/components/TaskInput.tsx`
- Props:
```typescript
interface TaskInputProps {
    onAddTask: (title: string) => Promise<void>;
}
```
- Description: A form component that allows users to add new tasks
- Features:
  - Input validation (non-empty title)
  - Clears input after successful submission
  - Error handling for failed submissions

### TaskList
- Location: `frontend/src/components/TaskList.tsx`
- Props:
```typescript
interface TaskListProps {
    tasks: Task[];
    onToggleTask: (id: number) => Promise<void>;
    onDeleteTask: (id: number) => Promise<void>;
}
```
- Description: Displays the list of tasks with toggle and delete functionality
- Features:
  - Checkbox for task completion
  - Delete button for task removal
  - Visual indication of completed tasks

## Error Handling

The application implements comprehensive error handling:

### Frontend
- Loading states during API calls
- User-friendly error messages
- Network error handling
- Form validation feedback

### Backend
- Input validation
- Error status codes
- Error response messages
- CORS error handling

## TypeScript Types

### Task Interface
Location: `frontend/src/types.ts` and `backend/src/index.ts`
```typescript
interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}
```

## Code Style and Best Practices

- TypeScript strict mode enabled
- React functional components with hooks
- Async/await for API calls
- Error boundaries for React components
- Proper TypeScript type definitions
- Consistent file and component naming
- CSS BEM naming convention for styles

## Testing

To run tests:

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
npm test
```

## Deployment

### Frontend Deployment
1. Build the production bundle:
```bash
cd frontend
npm run build
```
2. The build folder will contain optimized static files ready for deployment

### Backend Deployment
1. Build the TypeScript code:
```bash
cd backend
npm run build
```
2. The dist folder will contain compiled JavaScript ready for deployment

## License

This project is licensed under the MIT License - see the LICENSE file for details
