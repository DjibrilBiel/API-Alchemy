// Importa la función signOut del módulo firebase-auth.js para cerrar sesión
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from '../showMessage.js'; // Importa la función 'showMessage' desde el archivo showMessage.js

// Obtiene el formulario de inicio de sesión del DOM
const changePassForm = document.querySelector('#change-pass-form');

// Agrega un evento de escucha para el envío del formulario de inicio de sesión
changePassForm.addEventListener('submit', async e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const user = auth.currentUser; 

    // Obtiene los valores del formulario
    const actualP = changePassForm['actual-pass'];
    const newP = changePassForm['new-pass'];
    const repitP = changePassForm['repit-pass'];

    // Reautenticar al usuario con su contraseña actual
    const credential = EmailAuthProvider.credential(user.email, actualP.value);
    reauthenticateWithCredential(user, credential)
        .then(() => {
            // La reautenticación fue exitosa, ahora podemos cambiar la contraseña
            if (newP.value == repitP.value) {
                updatePassword(user, newP.value)
                    .then(() => {
                        // Muestra un mensaje de éxito
                        showMessage("¡Cambios realizados con éxito!", true);
                    })
                    .catch((error) => {
                        showMessage("Error: " + error.message, false);
                    });
            } else {
                showMessage("Las contraseñas nuevas no coinciden", false);
            }
        })
        .catch((error) => {
            showMessage("Error al reautenticar: " + error.message, false);
        })
    
    actualP.value = ""
    newP.value = ""
    repitP.value = ""
});