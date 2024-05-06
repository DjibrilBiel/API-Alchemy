/**
 * La función changeSelect se encarga de modificar los elementos de entrada (input) basados en la opción seleccionada en un elemento <select>.
 * @param {Object} e - El elemento <select> que contiene las opciones de "types".
 * @param {Object} f - El elemento <input> a modificar que contiene "value".
 * @param {Object} g - El elemento <select> que contiene las opciones del "type" "bool".
 */
function changeSelect(e, f, g, a) { 
    switch (e.value) {
        case 'string':
            // Si se selecciona 'string', muestra el primer input como un campo de búsqueda (type='search') editable y oculta el segundo input
            f.style.display = "block";
            g.style.display = "none";
            f.type = 'search';
            f.readOnly = false;
            a.style.display = "none";
            break;
        case 'number':
            // Si se selecciona 'number', muestra el primer input como un campo numérico (type='tel') editable y oculta el segundo input
            f.style.display = "block";
            g.style.display = "none";
            f.type = 'tel';
            f.readOnly = false;
            a.style.display = "none";
            break;
        case 'bool':
            // Si se selecciona 'bool', oculta el primer input y muestra el segundo input
            f.style.display = "none";
            g.style.display = "block";
            a.style.display = "none";
            break;
        case 'date':
            // Si se selecciona 'date', muestra el primer input como un campo de fecha (type='date') editable y oculta el segundo input
            f.style.display = "block";
            g.style.display = "none";
            f.type = 'date';
            f.readOnly = false;
            a.style.display = "none";
            break;
        case 'null':
            // Si se selecciona 'null', muestra el primer input como un campo de texto (type='text') no editable, con valor 'null', y oculta el segundo input
            f.style.display = "block";
            g.style.display = "none";
            f.type = 'text';
            f.value = 'null';
            f.readOnly = true;
            a.style.display = "none";
            break;
        case 'array':
        case 'object':
            // Si se selecciona 'array' u 'object', oculta ambos inputs
            f.style.display = "none";
            g.style.display = "none";
            f.readOnly = false;
            a.style.display = "block";
            break;
    }
}
