'use client'
import init from '../common/init'
import { useRouter } from 'next/navigation';
import {  createUserWithEmailAndPassword } from "firebase/auth"
import '../Main.css';
import '../login/Login.css';

export default function() {
  const {auth} = init()
  const router = useRouter();

  //Appelé lorsqu'on envoie le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()

    //Récupération des champs du formulaire

    const user = {
      email: e.target.email.value,
      password: e.target.password.value, 
      tasks: [] //Table Todo
    };

    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      if (!res.ok) {
        throw new Error('Failed to add user');
      }

      const result = await res.json();
      alert('User added successfully');
      router.push('./home');
    } catch (err) {
      setError(err.message);
    }

    //Ajout de l'utilisateur (courriel + mot de passe)
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCred) => {
        console.log(userCred.user)
        router.push('./');
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='Title d-flex justify-content-center'>Signup</h3>
      <input type="email" name="email" placeholder='Email' required />
      <input type="password" name="password" placeholder='Password' required />
      <input type="submit" />
    </form>
  )
}

