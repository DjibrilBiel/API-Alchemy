// Importa las funciones necesarias de Firebase Firestore y el objeto 'db' desde el archivo firebase.js
import { doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { db } from '../firebase.js';

// Take UID
import { auth } from '../firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

let uid;

// Escucha cambios en la autenticación y obtiene el UID del usuario autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        takeUID(user.uid);
    }
});

// Función para asignar el UID obtenido
function takeUID(a) {
    uid = a;

    document.querySelector('.save').addEventListener("click", () => {
        let docData = {}
        
        let regex = /-(\d)/
        let k = 0; let keySaved = [null]; let ksN = 0; let arrays = [null];let objects = {};
        const elements = document.querySelectorAll('.elementF')
        elements.forEach(updateDocData);

        console.log(docData)

        function updateDocData(element) {
            let id = element.id
            let i = regex.exec(id)
            i = Number(i[1])
            /* console.log(i) */

            let key = null;
            if (element.querySelector('.key') != null) {
                key = element.querySelector('.key').value;
            }

            let type = element.querySelector('.type').value;

            let value = null
            element.querySelectorAll('.value').forEach(e => {
                if (e.style.display != 'none') {
                    value = element.querySelector('.value').value
                }
            })
            if (type == 'date')
                value = Timestamp.fromDate(new Date(value))

            if (i <= 0) {
                docData[key] = { value: value, type: type };
            } else {
                if (key == null) {
                    // Array
                    console.log(keySaved[ksN], keySaved[ksN - 1], arrays[1], i, k, ksN)
                    if (arrays[ksN] !== undefined)
                        arrays[ksN].push({ value: value, type: type })
                    else
                        arrays[ksN] = [{ value: value, type: type }]
                    docData[keySaved[ksN]] = { value: arrays[ksN], type: 'array' }
                } else {
                    // Object
                    console.log(keySaved[ksN], keySaved[ksN - 1], objects[ksN], i, k, ksN)
                    if (objects[ksN] !== undefined)
                        objects[ksN][key] = { value: value, type: type }
                    else
                        objects[ksN] = {[key]: { value: value, type: type }}
                    docData[keySaved[ksN]] = { value: objects[ksN], type: 'object' }
                }
            }
            if (type == 'array' || type == 'object') {
                ksN++
                keySaved[ksN] = key
            }
        }
    })


    /* Create or Update Document */
    /* let key = 0;
    let value = null;
    let type = 'null';
    const nombreApi = 'Películas';

    // Agrega un evento de escucha al elemento con clase 'save' para guardar los datos en Firestore
    document.querySelector('.save').addEventListener("click", () => {
        const docData = {
            // Datos de ejemplo para almacenar en Firestore
            stringExample: { value: "Hello world!", type: 'string' },
            numberExample: { value: 3.14159265, type: 'number' },
            dateExample: { value: Timestamp.fromDate(new Date("December 10, 2022")), type: 'date' },
            arrayExample: { value: [
                { value: 5, type: 'number' },
                { value: true, type: 'bool' },
                { value: "hello", type: 'string' }
            ], type: 'array' },
            nullExample: { value: null, type: 'null' },
            objectExample: { value: {
                a: { value: 5, type: 'number' },
                b: { value: {
                    nested: { value: "foo", type: 'string' }
                }, type: 'object' }
            }, type: 'object' }
        };

        // Utiliza un bucle para agregar datos adicionales a docData basados en el valor de 'k'
        for (let i = 0; i < k; i++) {
            docData[key] = { value: value, type: type };
        }

        // Establece el documento en Firestore con los datos proporcionados
        setDoc(doc(db, uid, nombreApi), docData);

        console.log("guardado");
    }); */
}
