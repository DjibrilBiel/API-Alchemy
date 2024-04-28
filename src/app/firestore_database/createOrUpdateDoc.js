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
        let docData = {};

        const elements = document.querySelectorAll('.elementF');

        let k = [1];

        elements.forEach(element => {
            takeI(element, docData);
        });

        console.log(docData);
        // Establece el documento en Firestore con los datos proporcionados
        setDoc(doc(db, uid, 'Películas'), docData);
        console.log("guardado");  
    
        function takeI(element, parent) {
            let i = Number(/-(\d)/.exec(element.id)[1]);

            if (i == 0)
                updateDocData(element, parent, 0)
        }

        function updateDocData(element, parent, a){
            let i = Number(/-(\d)/.exec(element.id)[1]);

            let key = null;
            if (element.querySelector('.key') != null) {
                key = element.querySelector('.key').value;
            }
  
            let type = element.querySelector('.type').value;
    
            let value = null;
            element.querySelectorAll('.value').forEach(e => {
                if (e.style.display != 'none')
                    value = e.value;
            });
            if (type == 'number')
                value = Number(value)
            else if (type == 'date')
                value = Timestamp.fromDate(new Date(value))
            else if (type == 'null')
                value = null
            else if (type == 'bool') {
                if (value == 'true')
                    value = true
                else
                    value = false
            }
    
            let g = element.getAttribute("class").replace(/^elementF\s(.*)$/, '$1');

            let kp = '';
            for (let h = i; h <= i; h++) {
                kp += String(k[h]) + '_';
            }; kp = kp.substring(0, kp.length - 1);

            if (i == 0) {
                if (type === 'object') {
                    if (k[i+1] === undefined)
                        k[i+1] = 1
                    k[i]++;
                    if (!parent[key])
                        parent[key] = { value: {}, type: type };
                    let nestedElements = document.querySelectorAll(`.${g}_${kp}`);
                    nestedElements.forEach(nestedElement => {
                        let newObj = [{}, ''];
                        newObj = updateDocData(nestedElement, newObj[0], 2);
                        parent[key].value[newObj[1]] = { value: newObj[0].value, type: newObj[0].type };
                    });
                } else if (type === 'array') {
                    if (k[i+1] === undefined)
                        k[i+1] = 1
                    k[i]++;
                    if (!parent[key])
                        parent[key] = { value: [], type: type };
                    let nestedElements = document.querySelectorAll(`.${g}_${kp}`);
                    nestedElements.forEach(nestedElement => {
                        let newObj = { value: null, type: null };
                        newObj = updateDocData(nestedElement, newObj, 1);
                        parent[key].value.push(newObj);
                    });
                } else {
                    parent[key] = { value: value, type: type };
                }
            } else {
                // Si viene de un array...
                if (a == 1) {
                    // Si el mismo objeto es un object...
                    if (type === 'object') {
                        if (k[i+1] === undefined)
                            k[i+1] = 1
                        k[i]++;
                        parent = { value: {}, type: type };
                        let nestedElements = document.querySelectorAll(`.${g}_${kp}`);
                        nestedElements.forEach(nestedElement => {
                            let newObj = [{}, ''];
                            newObj = updateDocData(nestedElement, newObj[0], 2);
                            parent.value[newObj[1]] = { value: newObj[0].value, type: newObj[0].type };
                            console.log(newObj[1], newObj[0], parent.value[newObj[1]])
                        });
                        return parent
                    }

                    // Si el mismo objeto es un array... Cosa imposible
                    else if (type === 'array')
                        alert("Error. Array dentro de Array.")
                    
                    // Si el mismo objeto es de otro tipo...
                    else {
                        if (!parent.value)
                            parent = {};
                        parent = { value: value, type: type };
                        return parent;
                    }
                    
                // Si viene de un object...
                } else if (a == 2) {
                    // Si el mismo objeto es un object...
                    if (type === 'object') {
                        if (k[i+1] === undefined)
                            k[i+1] = 1
                        k[i]++;
                        if (!parent[key])
                            parent[key] = { value: {}, type: type };
                        let nestedElements = document.querySelectorAll(`.${g}_${kp}`);
                        nestedElements.forEach(nestedElement => {
                            let newObj = [{}, ''];
                            newObj = updateDocData(nestedElement, newObj[0], 2);
                            parent[key].value[newObj[1]] = { value: newObj[0].value, type: newObj[0].type };
                        });
                        return [parent[key], key]
                    }

                    // Si el mismo objeto es un array...
                    else if (type === 'array') {
                        if (k[i+1] === undefined)
                            k[i+1] = 1
                        k[i]++;
                        if (!parent[key])
                            parent[key] = { value: [], type: type };
                        let nestedElements = document.querySelectorAll(`.${g}_${kp}`);
                        nestedElements.forEach(nestedElement => {
                            let newObj = { value: null, type: null };
                            newObj = updateDocData(nestedElement, newObj, 1);
                            parent[key].value.push(newObj);
                        });
                        return [parent[key], key]
                    }

                    // Si el mismo objeto es de otro tipo...
                    else {
                        if (!parent.value)
                            parent = {};
                        parent = { value: value, type: type };
                        return [parent, key];
                    }

                // No debería llegar aquí.
                } else 
                    alert("Error.")
            }
        }
      


        /* // Create or Update Document
        let key = 0;
        let value = null;
        let type = 'null';
        const nombreApi = 'Películas';

        // Agrega un evento de escucha al elemento con clase 'save' para guardar los datos en Firestore
        document.querySelector('.save').addEventListener("click", () => {
            const docData = {
                // Datos de ejemplo para almacenar en Firestore
                stringExample: { value: "Hello world!", type: 'string' },
                numberExample: { value: 3.14159265, type: 'number' },
                boolExample: { value: true, type: 'bool' },
                dateExample: { value: Timestamp.fromDate(new Date("December 10, 2022")), type: 'date' },
                arrayExample: { value: [
                    { value: 5, type: 'number' },
                    { value: true, type: 'bool' },
                    { value: "hello", type: 'string' },
                    { value: {
                        nested3: { value: Timestamp.fromDate(new Date("December 14, 2023")), type: 'date' },
                        nested4: { value: [
                            { value: 9.2, type: 'number' }
                        ], type: 'array' }
                    }, type: 'object' }
                ], type: 'array' },
                nullExample: { value: null, type: 'null' },
                objectExample: { value: {
                    a: { value: 5, type: 'number' },
                    b: { value: {
                        nested: { value: "foo", type: 'string' },
                        nested2: { value: {
                            c: { value: false, type: 'bool' }
                        }, type: 'object' }
                    }, type: 'object' }
                }, type: 'object' }
            };

            // Utiliza un bucle para agregar datos adicionales a docData basados en el valor de 'k'
            // for (let i = 0; i < k; i++) {
            //     docData[key] = { value: value, type: type };
            // }

            // Establece el documento en Firestore con los datos proporcionados
            setDoc(doc(db, uid, nombreApi), docData);

            console.log("guardado");
        }); */
    });
}