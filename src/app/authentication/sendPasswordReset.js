// Importa la función sendPasswordResetEmail del módulo firebase-auth.js para restablecer la contraseña del usuario
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../firebase.js'; // Importa el objeto 'auth' desde el archivo firebase.js
import { showMessage } from '../showMessage.js'; // Importa la función 'showMessage' desde el archivo showMessage.js

// Agrega un evento de escucha al botón de actualización de contraseña
document.querySelector('#update-password').addEventListener('click', e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del evento

    // Abre una ventana emergente para el restablecimiento de contraseña
    const resetPassword = window.open("", "Cambiar contraseña", "width=500,height=274,scrollbars=NO");
    resetPassword.document.body.innerHTML = `
        <!-- Contenido HTML de la ventana emergente para restablecer contraseña -->
        <h1>RECUPERAR CONTRASEÑA</h1>
        <div class="container">
            <h2>Ingrese su correo con el que se ha registrado</h2>
            <form action="" class="form">
                <div class="form__correo">
                    <input type="email" placeholder="Ingrese su correo" class="correo">
                </div>
                <div class="form__button">
                    <a class="salir" href="#" onclick="window.close()">Salir</a>
                    <button class="enviar">Enviar link</button>
                </div>
            </form>
        </div>
        <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body{
            background: rgb(233, 235, 238) ;
            font-family: 'Open Sans', sans-serif;
        }
        h1{
            text-align: center;
            padding: 20px;
            color: rgb(15, 41, 53);
        }
        .container{
            width: 500px;
            padding: 20px;
            margin: auto;
            background: white;
        }
        h2{
            font-size: 14px;
            text-align: center;
            padding: 20px 10px;
        }
        
        .correo{
            width: 100%;
            border: none;
            background: none;
            border-bottom: solid rgb(160, 156, 156) 2px;
            padding: 15px;
            outline: none;
            margin-bottom: 20px;
        }
        
        .correo:focus{
            border-bottom: solid rgb(0, 89, 253) 2px;
        }
        .form__button{
            display: flex;
            justify-content: space-between;
        }
        
        .salir{
            text-decoration: none;
            background: red;
            padding: 8px 20px;
            color: white;
            font-size: 14px;
        }
        
        .salir:hover{
            background: rgb(172, 2, 2);
        }
        .enviar{
            background: green;
            padding: 8px 15px;
            color: white;
            font-size: 14px;
            border: none;
            cursor: pointer;
        }
        .enviar:hover{
            background: rgb(19, 116, 56);
        }
        </style>
    `;


    // Agrega un evento de escucha al botón de envío en la ventana emergente
    resetPassword.document.querySelector('.enviar').addEventListener('click', () => {
        // Obtiene el valor del correo electrónico ingresado en la ventana emergente
        const email = resetPassword.document.querySelector('.correo').value;

        // Envía un correo electrónico para restablecer la contraseña del usuario
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Muestra un mensaje de confirmación si el correo se envía correctamente y cierra la ventana emergente
            showMessage("Correo enviado correctamente", true);
            resetPassword.close();
        })
        .catch((error) => {
            // Maneja diferentes errores que puedan ocurrir al enviar el correo de restablecimiento de contraseña
            switch (error.code) {
                case 'auth/missing-email':
                    showMessage("Debes introducir el correo", false);
                    break;
                case 'auth/invalid-email':
                    showMessage("Correo incorrecto", false);
                    break;
                default:
                    showMessage(error.message, false);
                    break;
            }
        });
    });
});