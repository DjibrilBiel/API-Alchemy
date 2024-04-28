const toggleBtn = document.querySelector('.toggle_btn'); // Selecciona el botón de alternancia
const toggleBtnIcon = document.querySelector('.toggle_btn i'); // Selecciona el icono dentro del botón
const dropDownMenu = document.querySelector('.dropdown_menu'); // Selecciona el menú desplegable

toggleBtn.onclick = function () {
    // Alterna la clase 'open' del menú desplegable para mostrar u ocultar el menú
    dropDownMenu.classList.toggle('open');

    // Cambia el ícono del botón de alternancia dependiendo del estado del menú
    toggleBtnIcon.classList = dropDownMenu.classList.contains('open')
        ? 'fa-solid fa-xmark' // Cambia el ícono a 'X' si el menú está abierto
        : 'fa-solid fa-bars'; // Cambia el ícono a barras si el menú está cerrado
};