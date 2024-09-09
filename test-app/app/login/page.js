'use client'
import { useRouter } from 'next/navigation';
import init from '../common/init'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Link from 'next/link';
import './Login.css'; 

export default function() {
  const {auth} = init()
  const router = useRouter();
  
  //Appelé lorsqu'on envoie le formulaire
  function submitForm(e){
    e.preventDefault()

    //Récupération des champs du formulaire
    const email = e.target.email.value
    const password = e.target.password.value

    //Connexion (courriel + mot de passe)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred.user)
        router.push('./home');
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <>
    <form onSubmit={submitForm}>
      <h3 className='Title d-flex justify-content-center'>Login</h3>
      <input type="email" name="email" placeholder='Email' required/>
      <input type="password" name="password" placeholder='Password' required />
      <input type="submit" />
    </form>
    <p><Link href="/signup">Signup</Link></p>
    </>
  )
}
