// Importa las funciones necesarias de Firebase Firestore y el objeto 'db' desde el archivo firebase.js
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { db } from '../firebase.js';

// Importa funciones de autenticación desde el archivo firebase.js
import { auth } from '../firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Declara una variable 'uid' para almacenar el ID del usuario autenticado
let uid;

// Escucha cambios en la autenticación y obtiene el UID del usuario autenticado si está conectado
onAuthStateChanged(auth, (user) => {
    if (user) {
        takeUID(user.uid);
    } else {
        // Si no hay usuario autenticado, muestra un mensaje para iniciar sesión en la interfaz de edición
        document.querySelector('.container-edit').innerHTML = `
            <h2>Inicie sesión para poder editar su API</h2>
            <style>
                .container-edit {
                    height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            </style>
        `;
    }
});

// Función para obtener el UID del usuario autenticado
async function takeUID(a) {
    uid = a;

    /* Leer Documento */
    const docRef = doc(db, uid, "Películas");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const orderedData = Object.entries(data).sort();

    let i = 0;
    let j = 0;
    let k = [1];

    // Función para procesar y mostrar los datos obtenidos
    orderedData.forEach(read);
    async function read(datum) {
        // Código para procesar y mostrar los datos obtenidos
        const displace = 75 * i;

        if (datum[1].type === 'date') {
            const date = datum[1].value.toDate()
            
            let d = new Date(date),
            day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();
            if (month.length < 2) { month = '0' + month; }
            if (day.length < 2) { day = '0' + day; }
            datum[1].value = [year, month, day].join('-')
        }

        let kp = ''
        for (let h = 0; h <= i; h++) {
            kp += k[h] + '_'
        }; kp = kp.substring(0, kp.length - 1)

        document.querySelector('.editor').insertAdjacentHTML(`beforeend`, `
            <div class="img-izq">
                <div class="elementF kp${kp}" id="${j}-${i}" style="margin-left: ${displace}px;"> <!-- https://developer.mozilla.org/es/docs/Learn/Forms/HTML5_input_types -->
                    <div class="elementS" id="up">
                        <input type="search" class="key" id="input${j}" placeholder="Key" value="${datum[0]}">
                        <input type="search" class="value" id="input${j}" placeholder="Value" value="${datum[1].value}">
                        <select name="bool" class="value" id="select${j}" style="width:190px;">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div class="elementS" id="down">
                        <select name="type" class="type" id="select${j}" onchange="changeSelect(this, document.querySelector('.value#input${j}'), document.querySelector('.value#select${j}'))">
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="bool">Bool</option>
                            <option value="date">Date</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                            <option value="null">Null</option>
                        </select>
                    </div>
                </div>
            </div>
            <style>
                .img-izq {
                    display: flex;
                    flex-direction: row;
                }
                .elementF {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: min-content;
                    background-color: lightgray;
                    margin-bottom: 20px;
                }
                .elementS {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
                .value, .key {
                    margin: 2px;
                    color: black;
                }
                select.type {
                    margin-bottom: 2px;
                    color: black;
                }
                option {
                    color: black;
                }
            </style>
        `); 
        
        const valueInput = document.querySelector(`.value#input${j}`);
        const valueSelect = document.querySelector(`.value#select${j}`);
        const typeSelect = document.querySelector(`.type#select${j}`);
        typeSelect.value = datum[1].type
        changeSelect(typeSelect, valueInput, valueSelect)
        j++;

        // Se agrega lógica para manejar objetos y arrays anidados
        const type = String(datum[1].type)
        i++;
        if (k[i+1] === undefined)
            k[i] = 0;

        if (type === 'object') {
            k[i]++
            Object.entries(datum[1].value).sort().forEach(read);
        } else if (type === 'array') {
            k[i]++
            datum[1].value.forEach(readArray);
        }
        i--;
    }

    // Función para procesar arrays anidados
    async function readArray(datum) {
        // Código similar al anterior para procesar y mostrar arrays anidados
        const displace = 75 * i;

        if (datum.type === 'date') {
            const date = datum.value.toDate()
            
            let d = new Date(date),
            day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();
            if (month.length < 2) { month = '0' + month; }
            if (day.length < 2) { day = '0' + day; }
            datum.value = [year, month, day].join('-')
        }

        let kp = '';
        for (let h = 0; h <= i; h++) {
            kp += k[h] + '_';
        }; kp = kp.substring(0, kp.length - 1)
        
        document.querySelector('.editor').insertAdjacentHTML(`beforeend`, `
            <div class="img-izq">
                <div class="elementF kp${kp}" id="${j}-${i}" style="margin-left: ${displace}px;"> <!-- https://developer.mozilla.org/es/docs/Learn/Forms/HTML5_input_types -->
                    <div class="elementS" id="up">
                        <input type="search" class="value" id="input${j}" placeholder="Value" value="${datum.value}">
                        <select name="bool" class="value" id="select${j}" style="width:190px;">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div class="elementS" id="down">
                        <select name="type" class="type" id="select${j}" onchange="changeSelect(this, document.querySelector('.value#input${j}'), document.querySelector('.value#select${j}'))">
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="bool">Bool</option>
                            <option value="date">Date</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                            <option value="null">Null</option>
                        </select>
                    </div>
                </div>
            </div>
            <style>
                .img-izq {
                    display: flex;
                    flex-direction: row;
                }
                .elementF {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: min-content;
                    background-color: lightgray;
                    margin-bottom: 20px;
                }
                .elementS {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
                .value, .key {
                    margin: 2px;
                    color: black;
                }
                select.type {
                    margin-bottom: 2px;
                    color: black;
                }
                option {
                    color: black;
                }
            </style>
        `);
        
        const valueInput = document.querySelector(`.value#input${j}`);
        const valueSelect = document.querySelector(`.value#select${j}`);
        const typeSelect = document.querySelector(`.type#select${j}`);
        typeSelect.value = datum.type
        changeSelect(typeSelect, valueInput, valueSelect)
        j++; 

        // Lógica para manejar objetos y arrays anidados en arrays
        const type = String(datum.type);

        i++;
        if (k[i+1] == undefined)
            k[i] = 0;

        if (type === 'object') {
            k[i]++
            Object.entries(datum.value).sort().forEach(read);
        } else if (type === 'array') {
            k[i]++
            datum.value.forEach(readArray);
        }
        i--;
    }
}