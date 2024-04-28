// Importa la función signInWithEmailAndPassword del módulo firebase-auth.js para iniciar sesión con correo electrónico y contraseña
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from '../showMessage.js'; // Importa la función 'showMessage' desde el archivo showMessage.js

// Obtiene el formulario de inicio de sesión del DOM
const signInForm = document.querySelector('#log-in-form');

// Agrega un evento de escucha para el envío del formulario de inicio de sesión
signInForm.addEventListener('submit', async e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Obtiene los valores de correo electrónico y contraseña del formulario
    const email = signInForm['log-in-email'];
    const password = signInForm['log-in-password'];

    try {
        // Intenta iniciar sesión con el correo electrónico y la contraseña proporcionados
        const user = await signInWithEmailAndPassword(auth, email.value, password.value);

        // Actualiza el contenido del body con un mensaje de carga
        document.querySelector('body').innerHTML = `
            <h1 id="cargando">CARGANDO...</h1>
            <style>h1#cargando { color: white; font-size: 7vh }</style>
        `;

        // Muestra un mensaje de bienvenida al usuario autenticado
        showMessage("Bienvenid@ de nuevo " + user.user.displayName, true);

        // Redirige a otra página después de un cierto tiempo (1.2 segundos)
        setTimeout(function(){ location.href = "./editor.html" }, 1200);
    } catch (error) {
        // Maneja los diferentes errores de inicio de sesión y muestra mensajes personalizados
        switch (error.code) {
            case 'auth/wrong-password':
                showMessage('Contraseña incorrecta', false);
                break;
            case 'auth/user-not-found':
                showMessage('Usuario no encontrado', false);
                break;
            case 'auth/invalid-login-credentials':
                showMessage('Correo o contraseña incorrectos', false);
                break;
            default:
                showMessage(error.message, false);
                break;
        }
    }

    // Limpia los campos de correo electrónico y contraseña después del intento de inicio de sesión
    email.value = "";
    password.value = "";
});
