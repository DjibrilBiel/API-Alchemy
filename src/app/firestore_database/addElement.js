import { dropElement } from './dropElement.js';

export function addElement(i, j, k) {
    // Código para procesar y mostrar los datos obtenidos
    const displace = 75 * i;
    
    let kp = ''
    for (let h = 0; h <= i; h++) {
        kp += k[h] + '_'
    }; kp = kp.substring(0, kp.length - 1)

    const textoVacio = ""
    document.querySelector('.editor').insertAdjacentHTML(`beforeend`, `
        <div class="img-izq">
            <div class="elementF kp${kp}" id="n${j}_${i}" style="margin-left: ${displace}px;"> <!-- https://developer.mozilla.org/es/docs/Learn/Forms/HTML5_input_types -->
                <div class="elementS" id="up">
                    <input type="" class="key" id="input${j}k" placeholder="Key" value="${textoVacio}">
                    <input type="search" class="value" id="input${j}" placeholder="Value" value="${textoVacio}">
                    <select name="bool" class="value" id="select${j}" style="width:190px;">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div class="elementS" id="down">
                    <select name="type" href="#" class="type" id="select${j}" onchange="changeSelect(this, document.querySelector('.value#input${j}'), document.querySelector('.value#select${j}'))">
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
            .value#select${j} {
                display: none;
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
    
    j++;
    return j;
}

export function addElement2(e) {
    const id = '#'+e.target.id;
    let i = Number(/(\d+)_(\d+)/.exec(id)[2]);
    let j = Number(/(\d+)_(\d+)/.exec(id)[1]);
    let k = id.split('_')[2].split(',').map(Number);
    i++; j++; 
    if (k[i+1] === undefined)
        k[i] = 0;
    k[i]++

   /*  if (type === 'object') {
        k[i]++
    } else if (type === 'array') {
        k[i]++
    } */

    // Código para procesar y mostrar los datos obtenidos
    const displace = 75 * i;
    
    let kp = ''
    for (let h = 0; h <= i; h++) {
        kp += k[h] + '_'
    }; kp = kp.substring(0, kp.length - 1)

    const textoVacio = ""
    document.querySelector('.editor').insertAdjacentHTML(`beforeend`, `
        <div class="img-izq">
            <div class="elementF kp${kp}" id="n${j}_${i}" style="margin-left: ${displace}px;"> <!-- https://developer.mozilla.org/es/docs/Learn/Forms/HTML5_input_types -->
                <div class="elementS" id="up">
                    <input type="" class="key" id="input${j}k" placeholder="Key" value="${textoVacio}">
                    <input type="search" class="value" id="input${j}" placeholder="Value" value="${textoVacio}">
                    <select name="bool" class="value" id="select${j}" style="width:190px;">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div class="elementS" id="down">
                    <select name="type" href="#" class="type" id="select${j}" onchange="changeSelect(this, document.querySelector('.value#input${j}'), document.querySelector('.value#select${j}'))">
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
            .value#select${j} {
                display: none;
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
    
    j++;
    return j, i;
}