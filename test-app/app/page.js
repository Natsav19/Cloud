'use client'
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import './Main.css';
import Acceuil from './login/page'


export default function Home() {
  return (
  <>
   <div className="Container">
  <h1>Welcome to Do It List!</h1>
   <Acceuil />
    </div>
  </>
  )
}
