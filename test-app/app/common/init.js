import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"


export default function() {
    //TODO: 
  //  1. Installer Firebase: npm install firebase
  //  2. Créer un projet Firebase (dans l'interface Web)
  //  3. Enregistrer une application (dans l'interface Web)
  //  4. Obtenir la configuration à partir de l'application (à partir de l'interface Web):
  const firebaseConfig = {
    apiKey: "AIzaSyD_XHvsJhYNSZ2X0Jf5oNVNNiPOOT8eeo8",
    authDomain: "fir-2c648.firebaseapp.com",
    projectId: "fir-2c648",
    storageBucket: "fir-2c648.appspot.com",
    messagingSenderId: "258790571451",
    appId: "1:258790571451:web:77e088b95e1ed1c7da589e",
    measurementId: "G-S2B85HKVHM"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth()

  return {auth}
}