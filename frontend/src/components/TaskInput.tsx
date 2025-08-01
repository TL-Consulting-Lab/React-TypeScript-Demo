import React, { useState } from 'react';
import { TaskCategory } from '../types';

interface TaskInputProps {
    onAddTask: (title: string, category: TaskCategory) => Promise<void>;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<TaskCategory>('personal');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            await onAddTask(title, category);
            setTitle('');
            setCategory('personal');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-input">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
                className="task-input__field"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="task-input__category"
            >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="urgent">Urgent</option>
            </select>
            <button type="submit" className="task-input__button">
                Add Task
            </button>
        </form>
    );
};

export default TaskInput;