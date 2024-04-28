// Importa la función signOut del módulo firebase-auth.js para cerrar sesión
import { signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from '../showMessage.js'; // Importa la función 'showMessage' desde el archivo showMessage.js

// Obtiene el elemento del DOM correspondiente al botón de cierre de sesión
const logOut = document.querySelector('#log-out');

// Agrega un evento de escucha al botón de cierre de sesión
logOut.addEventListener('click', async () => {
    // Cierra la sesión del usuario actual
    await signOut(auth);

    // Muestra un mensaje al usuario confirmando el cierre de sesión exitoso
    showMessage("¡Vuelve pronto!", true);
});
