import { getPartitures, addCerca, borra } from '../Servei/partituraService.js';

getPartitures();



let teclas = document.querySelectorAll('.tecla');

for (let i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener('click', function () {
        addCerca(teclas[i].id, teclas[i].dataset.alteracio);
    })
}


document.querySelector('#borrar').addEventListener('click', function () {
    borra();
})


