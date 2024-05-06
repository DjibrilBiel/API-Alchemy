// Importa las funciones necesarias de los SDK que se van a utilizar
// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// Firestore Database
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Configuración de Firebase para la aplicación web
const firebaseConfig = {
  // Agrega las credenciales específicas de tu proyecto Firebase
  
};

// Inicializa Firebase con la configuración proporcionada
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Inicializa la autenticación de Firebase y asigna el objeto 'auth'
export const auth = getAuth(app);

// Inicializa la Firestore Database de Firebase y asigna el objeto 'db'
export const db = getFirestore(app);