"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5000;
// Enable CORS and JSON body parsing
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// In-memory storage for tasks
let tasks = [];
let nextId = 1;
// GET all tasks
exports.app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});
// GET single task
exports.app.get('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});
// POST create task
exports.app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = { id: nextId++, title, completed: false, createdAt: new Date() };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
// PUT update completion
exports.app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid completed value' });
    }
    task.completed = completed;
    res.json(task);
});
// PATCH toggle task completion
exports.app.patch('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = !task.completed;
    res.json(task);
});
// DELETE single task
exports.app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
});
// Health check endpoint
exports.app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Only start the server if this file is run directly
if (require.main === module) {
    const host = process.env.HOST || '0.0.0.0';
    exports.app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    }).on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Error: Port ${port} is already in use. Please stop the other process or use a different port.`);
        }
        else if (error.code === 'EACCES') {
            console.error(`Error: Permission denied to bind to port ${port}. Try using a port number above 1024.`);
        }
        else {
            console.error('Error starting server:', error.message);
        }
        process.exit(1);
    });
}
