// Importa las funciones necesarias de Firebase Firestore y el objeto 'db' desde el archivo firebase.js
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { db } from '../firebase.js';

import { addElement, addElement2 } from './addElement.js';
import { dropElement } from './dropElement.js';

// Importa funciones de autenticación desde el archivo firebase.js
import { auth } from '../firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
                <div class="elementF kp${kp}" id="n${j}_${i}" style="margin-left: ${displace}px;"> <!-- https://developer.mozilla.org/es/docs/Learn/Forms/HTML5_input_types -->
                    <div class="elementS" id="up">
                        <input type="" class="key" id="input${j}k" placeholder="Key" value="${datum[0]}">
                        <input type="search" class="value" id="input${j}" placeholder="Value" value="${datum[1].value}">
                        <select name="bool" class="value" id="select${j}" style="width:190px;">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div class="elementS" id="down">
                        <select name="type" href="#" class="type" id="select${j}" onchange="changeSelect(this, document.querySelector('.value#input${j}'), document.querySelector('.value#select${j}'), document.querySelector('#add${j}'))">
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="bool">Bool</option>
                            <option value="date">Date</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                            <option value="null">Null</option>
                        </select>
                    </div>
                    <div id="add${j}">
                        <a class="add" href="#">
                            <i class='bx bx-add-to-queue icon' id="n${j}_${i}_${k}"></i>
                        </a>
                    </div>
                </div>
                <div id="remove${j}">
                    <a class="drop" href="#">
                        <i class='bx bx-trash icon' id="n${j}_${i}"></i>
                    </a>
                </div>
            </div>
            <style>
                .img-izq {
                    display: flex;
                    flex-direction: row;
                    margin: 0 auto;
                }
                .elementF {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: min-content;
                    margin-bottom: 20px;

                    border-radius: 15px;
                    box-shadow: 0 0 12px white;
                    width:auto;
                }
                .elementS {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
                .value, .key {
                    margin-top: 3px;
                    margin-bottom: 3px;
                    margin-left: 3px;
                    color: black;
                } .value {
                    margin-right: 3px;
                }
                select.type {
                    margin-bottom: 3px;
                    margin-right: 3px;
                    margin-left: 3px;
                    color: black;
                    border: none;
                }
                option {
                    color: black;
                }
            </style>
        `);

        document.querySelector(`#remove${j}`).addEventListener('click', function(event) { dropElement(event) });
        document.querySelector(`#add${j}`).addEventListener('click', function(event) { j, i = addElement2(event);console.log(j, i) })
        
        const valueInput = document.querySelector(`.value#input${j}`);
        const valueSelect = document.querySelector(`.value#select${j}`);
        const typeSelect = document.querySelector(`.type#select${j}`);
        const add = document.querySelector(`#add${j}`);
        typeSelect.value = datum[1].type
        changeSelect(typeSelect, valueInput, valueSelect, add); 
        if (datum[1].type == "array" || datum[1].type == "object") {
            document.querySelector(`.elementF#n${j}_${i}`).insertAdjacentHTML(`beforeend`, `
                <style>
                    .key#input${j}k {
                        margin-right: 3px;
                        border-radius: 15px 15px 0 0;
                    }
                </style>
            `);
        }
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
                <div class="elementF kp${kp}" id="n${j}_${i}" style="margin-left: ${displace}px;"> <!-- https://developer.mozilla.org/es/docs/Learn/Forms/HTML5_input_types -->
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
                            <option value="null">Null</option>
                        </select>
                    </div>
                    <div id="add${j}">
                        <a class="add" href="#">
                            <i class='bx bx-add-to-queue icon'></i>
                        </a>
                    </div>
                </div>
                <div id="remove${j}">
                    <a class="drop" href="#">
                        <i class='bx bx-trash icon' id="n${j}_${i}"></i>
                    </a>
                </div>
            </div>
            <style>
                .img-izq {
                    display: flex;
                    flex-direction: row;
                    margin: 0 auto;
                }
                .elementF {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: min-content;
                    margin-bottom: 20px;

                    border-radius: 15px;
                    box-shadow: 0 0 12px white;
                    width:auto;
                }
                .elementS {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
                .value, .key {
                    margin-top: 3px;
                    margin-bottom: 3px;
                    margin-left: 3px;
                    color: black;
                } .value {
                    margin-right: 3px;
                }
                select.type {
                    margin-bottom: 3px;
                    margin-right: 3px;
                    margin-left: 3px;
                    color: black;
                    border: none;
                }
                option {
                    color: black;
                }
                .value#input${j} {
                    border-radius: 15px 15px 0 0;
                } .value#select${j} {
                    border-radius: 15px 15px 0 0;
                }
            </style>
        `);

        document.querySelector(`#remove${j}`).addEventListener('click', function(event) { dropElement(event) });
        document.querySelector(`#add${j}`).addEventListener('click', function(event) { j, i = addElement2(event) }); 
        
        const valueInput = document.querySelector(`.value#input${j}`);
        const valueSelect = document.querySelector(`.value#select${j}`);
        const typeSelect = document.querySelector(`.type#select${j}`);
        const add = document.querySelector(`#add${j}`);
        typeSelect.value = datum.type
        changeSelect(typeSelect, valueInput, valueSelect, add)
        if (datum.type == "object") {
            document.querySelector(`.elementF#n${j}_${i}`).insertAdjacentHTML(`beforeend`, `
                <style>
                    .elementF#n${j}_${i} .elementS#up {
                        height: 3px;
                    }
                    .elementF#n${j}_${i} .elementS#down .type {
                        border-radius: 15px 15px 15px 15px;
                    }
                </style>
            `);
        }
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
    };

    document.querySelector('#agregarBoton').addEventListener('click', () => j = addElement(i, j, k));
};