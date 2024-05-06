// Importa las funciones createUserWithEmailAndPassword y updateProfile del módulo firebase-auth.js para registrar nuevos usuarios
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from '../showMessage.js'; // Importa la función 'showMessage' desde el archivo showMessage.js

// Obtiene el formulario de registro del DOM
const signUpForm = document.querySelector('#sign-up-form');

// Agrega un evento de escucha para el envío del formulario de registro
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Obtiene los valores de nombre, correo electrónico y contraseña del formulario
    const name = signUpForm['sign-up-name'];
    const email = signUpForm['sign-up-email'];
    const password = signUpForm['sign-up-password'];

    try {
        // Crea un nuevo usuario con el correo electrónico y la contraseña proporcionados
        await createUserWithEmailAndPassword(auth, email.value, password.value);

        // Actualiza el perfil del usuario con el nombre proporcionado
        updateProfile(auth.currentUser, { displayName: name.value });

        // Actualiza el contenido del body con un mensaje de carga
        document.querySelector('body').innerHTML = `
            <h1 id="cargando">CARGANDO...</h1>
            <style>h1#cargando { color: white; font-size: 7vh; font-family: 'Helvetica Now Bold'; }</style>
        `; 

        // Muestra un mensaje de bienvenida con el nombre del usuario registrado
        showMessage("Bienvenid@ " + name.value, true);

        // Redirige a otra página después de un cierto tiempo (1.2 segundos)
        setTimeout(function(){ location.href = "./editor.html" }, 1200);
    } catch (error) {
        // Maneja los diferentes errores de registro y muestra mensajes de error específicos
        switch (error.code) {
            case 'auth/email-already-in-use':
                showMessage("El correo ya está en uso", false);
                break;
            case 'auth/invalid-email':
                showMessage("Correo incorrecto", false);
                break;
            case 'auth/weak-password':
                showMessage(`Contraseña demasiado corta`, false);
                break;
            default:
                showMessage(error.message, false);
                break;
        }
    }

    // Limpia los campos del formulario después del intento de registro
    name.value = "";
    email.value = "";
    password.value = "";
});