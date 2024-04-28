// Importaciones necesarias
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from './app/firebase.js'; 
import { logInCheck } from './app/authentication/logInCheck.js';

// Observa cambios en el estado de autenticación
onAuthStateChanged(auth, async (user) => {
    // Verifica el estado de inicio de sesión del usuario
    logInCheck(user);
});
