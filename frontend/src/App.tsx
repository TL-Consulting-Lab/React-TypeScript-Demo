import React, { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Task } from './types';
import './App.css';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = '/api';
  console.log('API URL:', API_URL); // Add logging

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string) => {
    setError(null);
    try {
      console.log('Sending request to add task:', { title });
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      
      const responseData = await response.json();
      console.log('Server response:', { status: response.status, data: responseData });
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to add task');
      }
      
      setTasks([...tasks, responseData]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
      console.error('Detailed error:', error);
      setError(errorMessage);
    }
  };

  const toggleTask = async (id: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to toggle task');
      }
      const updatedTask = await response.json();
      setTasks(tasks.map(task =>
        task.id === id ? updatedTask : task
      ));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to toggle task');
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>
      <main className="App-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <TaskInput onAddTask={addTask} />
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
