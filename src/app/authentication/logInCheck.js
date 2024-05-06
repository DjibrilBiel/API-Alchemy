// Obtención de elementos del DOM para enlaces cuando el usuario está desconectado, conectado y bloqueado
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedInLinksWithBlock = document.querySelectorAll('.logged-in_block');

// Función para verificar el estado de inicio de sesión del usuario y modificar elementos del DOM en consecuencia
export const logInCheck = user => {
    if (user) {
        // Si el usuario está conectado:
        loggedOutLinks.forEach(link => link.style.display = 'none'); // Oculta enlaces para usuarios desconectados
        loggedInLinks.forEach(link => link.style.display = 'flex'); // Muestra enlaces para usuarios conectados
        loggedInLinksWithBlock.forEach(link => link.style.display = 'block'); // Muestra enlaces bloqueados para usuarios conectados

        let nombreUsuario;
        const accountLinks = document.querySelectorAll('.nAccount');
        if (user.displayName != null) {
            // Si el usuario tiene un nombre de visualización, lo asigna y muestra enlaces de cuenta
            nombreUsuario = user.displayName;
            accountLinks.forEach(link => link.style.display = 'block');
        } else {
            // Si el usuario no tiene un nombre de visualización, asigna cadena vacía y oculta enlaces de cuenta
            nombreUsuario = "";
            accountLinks.forEach(link => link.style.display = 'none');
        }

        let fotoUsuario;
        if (user.photoURL != null) {
            // Si el usuario tiene una URL de foto de perfil, la asigna
            fotoUsuario = user.photoURL;
        } else {
            // Si el usuario no tiene URL de foto de perfil, asigna una imagen predeterminada
            fotoUsuario = './css/img/foto_perfil.png';
        }

        // Inserta el nombre de usuario y la foto de perfil en elementos del DOM
        const insertarNombre = `${nombreUsuario}`;
        const insertarImg = `<img src="${fotoUsuario}" class="d-inline-block align-text-top" id="logo-cuenta">`;
        document.querySelector('#nAccountNav').innerHTML += insertarNombre;
        document.querySelector('#iAccountNav').innerHTML += insertarImg;
        document.querySelector('#nAccountMenu').innerHTML += insertarNombre;
        document.querySelector('#iAccountMenu').innerHTML += insertarImg;
    } else {
        // Si el usuario está desconectado, muestra enlaces para usuarios desconectados y oculta enlaces para usuarios conectados
        loggedOutLinks.forEach(link => link.style.display = 'flex');
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedInLinksWithBlock.forEach(link => link.style.display = 'none');
    }
};