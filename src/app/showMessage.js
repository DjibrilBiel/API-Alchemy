// Función para mostrar un mensaje usando la librería Toastify
export function showMessage(message, type) {
    Toastify({
        text: message, // Mensaje a mostrar
        duration: 3000, // Duración del mensaje en milisegundos
        newWindow: true, // Muestra el mensaje en una nueva ventana
        close: true, // Permite cerrar el mensaje
        gravity: "bottom", // Ubicación del mensaje en la pantalla ('top' o 'bottom')
        position: "right", // Posición del mensaje en la pantalla ('left', 'center' o 'right')
        stopOnFocus: true, // Evita que el mensaje se cierre al enfocarse en él
        style: {
            // Estilo del mensaje basado en el tipo de mensaje recibido (verdadero o falso)
            background: type === true 
                ? "linear-gradient(to right, #00b09b, #96c93d)" // Color de fondo si el tipo es verdadero
                : "linear-gradient(to right, #b0009b, #c9963d)", // Color de fondo si el tipo es falso
        },
        onClick: function(){} // Función de devolución de llamada después de hacer clic en el mensaje
    }).showToast(); // Muestra el mensaje
}
