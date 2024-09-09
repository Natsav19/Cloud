"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import init from '../../../common/init';
import React from 'react';
import UserContext from './UserContext';
import { useRouter } from 'next/navigation'

export default function Home() {
  const { auth } = init();
  const user = auth.currentUser;
  const id = React.useContext(UserContext); // ID de la tâche
  const email = user.email; // Email de l'utilisateur
  const [task, setTask] = useState(null);
  const router = useRouter();

  // Récupérer la tâche spécifique de l'utilisateur
  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const users = response.data;
        const userData = users.find(user => user.email === email);
        if (userData) {
          const tasks = userData.tasks;
          const task = tasks.find(task => task.taskId === id);
          setTask(task);
        } else {
          console.log('Utilisateur non trouvé');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [id, email]);

  // Fonction pour supprimer une tâche
  function Supprimer() {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const users = response.data;
        const userData = users.find(user => user.email === email);
        if (userData) {
          // Mise à jour de la liste des tâches sans celle à supprimer
          const updatedTasks = userData.tasks.filter(t => t.taskId !== id);

          // Mise à jour de l'utilisateur avec les nouvelles tâches
          axios.patch(`http://localhost:3000/users/${userData.id}`, { tasks: updatedTasks })
            .then(() => {
              setTask(null); // Met à jour l'état pour retirer la tâche supprimée
              console.log('Tâche supprimée avec succès');
              router.push('/home')
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.log('Utilisateur non trouvé');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Fonction pour terminer une tâche
  function terminer() {
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        const users = response.data;
        const userData = users.find((user) => user.email === email);
        if (userData) {
          // Mise à jour de la tâche en modifiant la valeur de `completed` à `true`
          const updatedTasks = userData.tasks.map((task) =>
            task.taskId === id ? { ...task, completed: true } : task
          );
  
          // Mise à jour de l'utilisateur avec les tâches modifiées
          axios
            .patch(`http://localhost:3000/users/${userData.id}`, { tasks: updatedTasks })
            .then(() => {
              // Met à jour l'état local avec la tâche modifiée
              setTask((prevTask) => ({ ...prevTask, completed: true }));
              console.log('Tâche terminée avec succès');
              router.push('/home')
            })
            .catch((error) => {
              console.error('Erreur lors de la mise à jour de la tâche :', error);

            });
        } else {
          console.log('Utilisateur non trouvé');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  

  return (
    <div>
      {task && <h1>{task.title}</h1>}
      <button onClick={Supprimer}>Supprimer</button>
      <button onClick={terminer}>Terminer</button>
    </div>
  );
}
