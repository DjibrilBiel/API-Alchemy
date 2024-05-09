// Importa las funciones necesarias de Firebase Firestore y el objeto 'db' desde el archivo firebase.js
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { db } from '../firebase.js';

// Importa funciones de autenticación desde el archivo firebase.js
import { auth } from '../firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


let uid;

onAuthStateChanged(auth, (user) => {
    if (user) 
        takeUID(user.uid);
});

async function takeUID(a) {
    uid = a;

    document.querySelector('#download').addEventListener('click', () => download() )

    async function download() {
        const docRef = doc(db, uid, "Películas");
        const data = await getDoc(docRef)
        const archivo = { ...data.data() };
        const json = JSON.stringify(archivo, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'archivo.json';
        a.click();
        URL.revokeObjectURL(url);

        console.log(a)
    }
}