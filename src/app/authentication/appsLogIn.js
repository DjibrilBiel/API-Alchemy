// Importa proveedores de autenticación y funciones relacionadas con Firebase
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from "../showMessage.js"; // Importa la función 'showMessage' desde el archivo showMessage.js

// Asigna eventos a los botones de inicio de sesión y registro para Google y GitHub
document.querySelector('#google-in').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    sign(provider); // Llama a la función 'sign' con el proveedor correspondiente
});
document.querySelector('#google-up').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    sign(provider); // Llama a la función 'sign' con el proveedor correspondiente
});

document.querySelector('#github-in').addEventListener('click', () => {
    const provider = new GithubAuthProvider();
    sign(provider); // Llama a la función 'sign' con el proveedor correspondiente
});
document.querySelector('#github-up').addEventListener('click', () => {
    const provider = new GithubAuthProvider();
    sign(provider); // Llama a la función 'sign' con el proveedor correspondiente
});

// Función para realizar el proceso de autenticación con el proveedor recibido
async function sign(provider) {
    try {
        // Inicia sesión con el proveedor y espera la respuesta
        const user = await signInWithPopup(auth, provider);

        // Actualiza el contenido del body con un mensaje de carga
        document.querySelector('body').innerHTML = `
            <h1 id="cargando">CARGANDO...</h1>
            <style>h1#cargando { color: white; font-size: 7vh }</style>
        `;

        // Muestra un mensaje de bienvenida con el nombre o correo electrónico del usuario autenticado
        if (user.user.displayName != null) {
            showMessage("Bienvenid@ " + user.user.displayName, true);
        } else {
            showMessage("Bienvenid@ " + user.user.email, true);
        }

        // Redirige a otra página después de un cierto tiempo (1.2 segundos)
        setTimeout(function(){ location.href = "./editor.html" }, 1200);
    } catch (error) {
        // Muestra un mensaje de error si falla la autenticación
        showMessage(error.message, false);
    }
}
