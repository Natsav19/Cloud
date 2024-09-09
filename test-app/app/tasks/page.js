'use client'
import init from '../common/init'
import { useRouter } from 'next/navigation'

export default function TaskPage() {
  const { auth } = init()
  const user = auth.currentUser
  const router = useRouter()
  const id = router.query.id
  console.log(id);
  const task = getTaskById(id)

  if (!task) {
    return <div>Task not found</div>
  }

  const handleDelete = async () => {
    // Supprimer la tâche
    await deleteTask(id)
    router.push('/tasks')
  }

  const handleUpdate = async () => {
    // Mettre à jour la tâche
    await updateTask(id, { title: 'Nouveau titre' })
    router.push('/tasks')
  }

  return (
    <div>
      <h2>Task {task.title}</h2>
      <p>Completed : {task.completed ? 'Yes' : 'No'}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

function getTaskById(id) {
  // Récupérer la tâche correspondante à l'ID
  return fetch(`http://localhost:3000/tasks/${id}`)
    .then(response => response.json())
}

function deleteTask(id) {
  // Supprimer la tâche
  return fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
}

function updateTask(id, data) {
  // Mettre à jour la tâche
  return fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}