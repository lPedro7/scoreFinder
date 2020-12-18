import { Nota } from '../Model/Nota.js';
import { Partitura } from '../Model/Partitura.js';

let arrayCerca = [];
let arrayPartitures = [];

export async function getPartitures(){

    let x = await fetch("http://server247.cfgs.esliceu.net/piano/nologin/score/list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-urlencoded'
        }
    }).then(r => r.json())



    for(let i = 0; i<x.length; i++){
        arrayPartitures.push(new Partitura(x[i].idpartitura,x[i].titol,x[i].idiomaoriginal,x[i].idiomatraduccio,x[i].lletraoriginal,x[i].lletratraduccio,x[i].notes))
    }

    for (let i = 0; i < arrayPartitures.length; i++) {
            arrayPartitures[i].notes = ordenaNotes(arrayPartitures[i].notes)
    }

    return x


}

export  function addCerca(nom, alteracio){
    let newNota = new Nota(0, nom, alteracio, arrayCerca.length);
    arrayCerca.push(newNota);

    
    playNote(newNota);

    document.querySelector('#cercaNotes').innerHTML += newNota.nom + ' ';

    cercador();
}

function cercador(){
    document.querySelector('#resultat').innerHTML = ''

    let stringCerca = concatArray(arrayCerca);
    let stringNotesPartitures = [];

    for (let i = 0; i < arrayPartitures.length; i++) {
        stringNotesPartitures.push(concatArray(arrayPartitures[i].notes))
    }



    for (let i = 0; i < arrayPartitures.length; i++) {
        if (stringNotesPartitures[i].includes(stringCerca)) {
            const div = document.createElement('DIV');
            div.id = `partitura${arrayPartitures[i].id}`;
            div.innerHTML = arrayPartitures[i].titol;
            const button = document.createElement('BUTTON');
            button.innerHTML = 'Reprodueix Cançó';
            button.onclick = (function () {
                playSong(arrayPartitures[i]);
            })
            div.appendChild(button)
            document.querySelector('#resultat').appendChild(div);
        }
    }

}

function concatArray(array) {
    let string = '';
    for (let i = 0; i < array.length; i++) {
        string += array[i].nom;
    }
    return string;
}

function playSong(arrayPartitura) {

    let arrayNotas = arrayPartitura.notes;


    for (let i = 0; i < arrayNotas.length; i++) {
        arrayNotas[i] = new Nota(0, arrayNotas[i].nom, arrayNotas[i].alteracio, arrayNotas[i].ordre);
    }
    let i = 0;
    let interval = setInterval(function () {
        let notaAudio;
        if (arrayNotas[i].nom == 'DO_AGUT') {
            notaAudio = `/scoreFinder/assets/audio/do7.ogg`
        } else {
            notaAudio = `/scoreFinder/assets/audio/${arrayNotas[i].nom}.ogg`
        }
        const sound = new Audio(notaAudio);
        sound.play();
        i++;
        document.querySelector(`#partitura${arrayPartitura.id}>button`).innerHTML=arrayNotas.length-i;

        if (i == arrayNotas.length) {
            document.querySelector(`#partitura${arrayPartitura.id}>button`).innerHTML=`Reprodueix cançó`;
            clearInterval(interval);

        }

    }, 1000)
}

function playNote(nota) {
    let notaAudio;
    if (nota.nom == 'DO_AGUT') {
        notaAudio = `/scoreFinder/assets/audio/do7.ogg`
    } else {
        notaAudio = `/scoreFinder/assets/audio/${nota.nom}.ogg`
    }

    const sound = new Audio(notaAudio);
    sound.play();
}

function ordenaNotes(arrayNotes) {

    let newArray = [];
    for (let i = 0; i < arrayNotes.length; i++) {

        newArray[arrayNotes[i].ordre - 1] = arrayNotes[i]

    }

    return newArray;
}

export function borra() {
    arrayCerca = [];
    document.querySelector('#cercaNotes').innerHTML = '';
    document.querySelector('#resultat').innerHTML = '';
}

export async function getPartituraById(idpartitura){
    let x = await fetch("http://server247.cfgs.esliceu.net/piano/nologin/score/get", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({id: idpartitura})
    }).then(r => r.json());

    return x;
}

export async function afegeixPartitura(partitura){

    let score = {
        idpartitura: partitura.idpartitura,
        name: partitura.title,
        partituraoriginal: partitura.lletraoriginal,
        partituratraduccio: partitura.lletratraduccio,
        idiomaoriginal: partitura.idiomaoriginal,
        idiomatraduccio: 'ca',
        notes: []
    }

    let x = await fetch("http://server247.cfgs.esliceu.net/piano/nologin/score/save", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-urlencoded'
        },
        body : score
    }).then(r => r.json())
}