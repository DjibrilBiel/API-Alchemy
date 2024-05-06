// Importa la función signOut del módulo firebase-auth.js para cerrar sesión
import { signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from '../showMessage.js'; // Importa la función 'showMessage' desde el archivo showMessage.js

// Obtiene el elemento del DOM correspondiente al botón de cierre de sesión
const logOut = document.querySelector('#log-out');

// Agrega un evento de escucha al botón de cierre de sesión
logOut.addEventListener('click', async () => {
    // Cierra la sesión del usuario actual
    await signOut(auth);

    // Actualiza el contenido del body con un mensaje de carga
    document.querySelector('body').innerHTML = `
        <h1 id="cargando">CARGANDO...</h1>
        <style>h1#cargando { color: white; font-size: 7vh; font-family: 'Helvetica Now Bold'; }</style>
    `;

    // Muestra un mensaje al usuario confirmando el cierre de sesión exitoso
    showMessage("¡Hasta pronto!", true);

    // Redirige a otra página después de un cierto tiempo (1.2 segundos)
    setTimeout(function(){ location.href = "./" }, 1200);
});
