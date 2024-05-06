// Importa la función signOut del módulo firebase-auth.js para cerrar sesión
import { updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from '../showMessage.js'; // Importa la función 'showMessage' desde el archivo showMessage.js

// Obtiene el formulario de inicio de sesión del DOM
const confForm = document.querySelector('#conf-form');

// Agrega un evento de escucha para el envío del formulario de inicio de sesión
confForm.addEventListener('submit', async e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const user = auth.currentUser;

    // Obtiene los valores de correo electrónico y contraseña del formulario
    const name = confForm['conf-name'];
    const img = confForm['conf-img'];

    if (name.value == "") {
        name.value = user.displayName;
    } 
    if (img.value == "") {
        img.value = user.photoURL;
    }

    updateProfile(user, { 
        displayName: name.value, 
        photoURL: img.value 
    }).then(() => {
        // Muestra un mensaje de bienvenida al usuario autenticado
        showMessage("¡Cambios realizados con éxito!", true);

        //reinicia la página
        location.href = "./cuenta.html"
    }).catch((error) => {
        showMessage("Error: " + error.message, false);
    });
});
