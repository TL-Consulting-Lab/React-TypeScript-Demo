"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 5000;
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// In-memory storage for tasks
let tasks = [];
let nextId = 1;
// Get all tasks
exports.app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});
// Add a new task
exports.app.post('/api/tasks', (req, res) => {
    console.log('Received request body:', req.body);
    const { title } = req.body;
    if (!title) {
        console.log('Title is missing');
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = {
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
exports.app.patch('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    res.json(tasks[taskIndex]);
});
// Delete a task
exports.app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).send();
});
// Only start the server if this file is run directly
if (require.main === module) {
    exports.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
