import express from 'express';
import cors from 'cors';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for tasks
let tasks: Task[] = [];
let nextId = 1;

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    console.log('Received request body:', req.body);
    const { title } = req.body;
    if (!title) {
        console.log('Title is missing');
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask: Task = {
        id: nextId++,
        title,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);
    console.log('Created new task:', newTask);
    res.status(201).json(newTask);
});

// Toggle task completion
app.patch('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    res.json(tasks[taskIndex]);
});

// Update task (PUT method for full update)
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, completed } = req.body;
    
    if (title !== undefined) {
        tasks[taskIndex].title = title;
    }
    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }
    
    res.json(tasks[taskIndex]);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks = tasks.filter(task => task.id !== id);
    res.status(200).json({ message: 'Task deleted successfully' });
});

// Clear all tasks (for testing purposes)
app.delete('/api/tasks', (req, res) => {
    tasks = [];
    nextId = 1;
    res.status(200).json({ message: 'All tasks cleared' });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Only start the server if this file is run directly
if (require.main === module) {
    const host = process.env.HOST || '0.0.0.0';
    app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    }).on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Error: Port ${port} is already in use. Please stop the other process or use a different port.`);
        } else if (error.code === 'EACCES') {
            console.error(`Error: Permission denied to bind to port ${port}. Try using a port number above 1024.`);
        } else {
            console.error('Error starting server:', error.message);
        }
        process.exit(1);
    });
}
