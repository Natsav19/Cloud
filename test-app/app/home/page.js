'use client'
import init from '../common/init';
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './home.css'; // Importer le fichier CSS

export default function ToDoList() {
  const { auth } = init();
  const user = auth.currentUser;
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:3000/users')
        .then(response => {
          const users = response.data;
          const currentUser = users.find(u => u.email === user.email);
          if (currentUser) {
            setTasks(currentUser.tasks);
          } else {
            setError('No tasks found for the current user');
          }
          console.log(currentUser);
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [user]);

  if (!user) {
    return <p className="error-message">Anonymous users can't access this page</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <p><Link href="/logout">Logout</Link></p>
        <p>Welcome {user.email}</p>
        <h2>Task</h2>
      </div>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.taskId} className={`todo-item ${task.completed ? 'completed' : 'pending'}`}>
            <Link href={`/tasks/edit/${task.taskId}`}>
              <p>
                {task.title} - {task.completed ? 'Completed' : 'Pending'}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/tasks/create">
        <button className="create-button">Create</button>
      </Link>
    </div>
  );
}
