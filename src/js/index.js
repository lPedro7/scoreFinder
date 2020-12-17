import { Nota } from './Nota.js';


let arrayCerca = [];
let arrayPartitures = [];
let partitures = getPartitures().then((r) => {
    for (let i = 0; i < r.length; i++) {
        arrayPartitures.push(r[i])
    }
});


let teclas = document.querySelectorAll('.tecla');

for(let i = 0; i < teclas.length; i++){
    teclas[i].addEventListener('click',function(){
            addCerca(teclas[i].id,teclas[i].dataset.alteracio);
    })
}

function addCerca(nom, alteracio){
  
    let newNota = new Nota(0, nom,alteracio,arrayCerca.length);
    arrayCerca.push(newNota);

    playNote(newNota);

    document.querySelector('#cercaNotes').innerHTML+=newNota.nom+' ';

    cercador(); 
}

function cercador(){

    document.querySelector('#resultat').innerHTML = ''

    let stringCerca = concatArray(arrayCerca);
    let stringNotesPartitures = [];

    for(let i = 0; i < arrayPartitures.length; i++){
        stringNotesPartitures.push(concatArray(arrayPartitures[i].notes))
    }


    for(let i = 0; i < arrayPartitures.length; i++){
        if(stringNotesPartitures[i].includes(stringCerca)){
            const div = document.createElement('DIV');
            div.id = arrayPartitures[i].id;
            div.innerHTML = arrayPartitures[i].titol;
            const button = document.createElement('BUTTON');
            button.innerHTML = 'Reprodueix Cançó';
            button.onclick = (function(){
                playSong(arrayPartitures[i]);
            })
            div.appendChild(button)
            document.querySelector('#resultat').appendChild(div);
        }
    }

}


function concatArray(array){
    let string = '';
    for(let i = 0; i < array.length; i++){
        string += array[i].nom;
    }
    return string;
}

async function getPartitures(){
    let x = await fetch("http://server247.cfgs.esliceu.net/piano/nologin/score/list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-urlencoded'
        }
    }).then(r => r.json());
    for (let i = 0; i < x.length; i++) {
        x[i].notes = ordenaNotes(x[i].notes)
    }
    return x
}

function ordenaNotes(arrayNotes) {

    let newArray = [];
    for (let i = 0; i < arrayNotes.length; i++) {

        newArray[arrayNotes[i].ordre - 1] = arrayNotes[i]

    }

    return newArray;
}

function playNote(nota){
let notaAudio;
    if(nota.nom=='DO_AGUT'){
         notaAudio = `/scoreFinder/assets/audio/do7.ogg`
    }else{
         notaAudio = `/scoreFinder/assets/audio/${nota.nom}.ogg`
    }

    const sound = new Audio(notaAudio);
    sound.play();
}

document.querySelector('#borrar').addEventListener('click',function(){
    borra();
})
function borra() {
    arrayCerca = [];
    document.querySelector('#cercaNotes').innerHTML = '';
    document.querySelector('#resultat').innerHTML = '';
}


function playSong(arrayPartitura) {

    let arrayNotas = arrayPartitura.notes;


    for (let i = 0; i < arrayNotas.length; i++) {
        arrayNotas[i] = new Nota(0,arrayNotas[i].nom, arrayNotas[i].alteracio, arrayNotas[i].ordre);
    }
    let i = 0;   
    let interval = setInterval(function () {
        let notaAudio;
        if(arrayNotas[i].nom=='DO_AGUT'){
             notaAudio = `/scoreFinder/assets/audio/do7.ogg`
        }else{
             notaAudio = `/scoreFinder/assets/audio/${arrayNotas[i].nom}.ogg`
        }
            const sound = new Audio(notaAudio);
            sound.play();
        i++;
        if(i == arrayNotas.length){
            clearInterval(interval);
        }
        }, 1000)
}
