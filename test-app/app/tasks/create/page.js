'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import init from '../../common/init'

export default function CreateTask() {
  const { auth } = init()
  const user = auth.currentUser
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  function handleSubmit(e) {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in to create a task')
      return
    }

    const newTask = {
      taskId: Date.now().toString(), // A unique ID for the task
      title,
      completed: false
    }

    /*const userId = user.id
    console.log('userId:', userId) // This should match the ID format in your db.json*/
    const email = user.email;
    // Fetch the current user data
    axios.get(`http://localhost:3000/users`)
      .then(response => {
        const users = response.data; // access the user data directly
        console.log('users:', users)
        const userData = users.find(user => user.email === email)
        console.log('userData:', userData);
        console.log('id:', userData.id);

        if (!userData || !Array.isArray(userData.tasks)) {
          throw new Error('Invalid user data or tasks array')
        }

        // Append the new task to the user's existing tasks
        const updatedTasks = [...userData.tasks, newTask]

        // Update the user with the new task list
        axios.put(`http://localhost:3000/users/${userData.id}`, { ...userData, tasks: updatedTasks })
          .then(() => {
            console.log('Task created')
            router.push('/home') // Redirect to the tasks page
          })
          .catch(error => {
            setError(`Error updating tasks: ${error.message}`)
          })
      })
      .catch(error => {
        console.error('Error fetching user data:', error) // Debugging line
        setError(`Error fetching user data: ${error.message}`)
      })
  }

  return (
    <div>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <button type="submit">Create Task</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}