// Importa los archivos relacionados con los formularios de registro e inicio de sesión
import './app/authentication/signUpForm.js';
import './app/authentication/signInForm.js';

// Importa el archivo de lógica para iniciar sesión en aplicaciones
import './app/authentication/appsLogIn.js';

// Importa el archivo para cerrar sesión
import './app/authentication/logOut.js';

// Importa el archivo para actualizar la contraseña
import './app/authentication/updatePassword.js';

// Importa la lógica principal desde index.js
import './index.js';

// Obtención de referencias a elementos del DOM
const registerBtn = document.getElementById('register');
const container = document.getElementById('container');
const loginBtn = document.getElementById('login');

// Agrega un listener para mostrar el formulario de registro al hacer clic en el botón "register"
registerBtn.addEventListener('click', () =>{
    container.classList.add("active");
});

// Agrega un listener para mostrar el formulario de inicio de sesión al hacer clic en el botón "login"
loginBtn.addEventListener('click', () =>{
    container.classList.remove("active");
});
