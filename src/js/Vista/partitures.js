import { getPartitures } from '../Servei/partituraService.js'

(async function printPartitures() {

    let arrayPartitures = await getPartitures();

    const table = document.createElement('TABLE');
    let tr = document.createElement('TR');
    const thTitol = document.createElement('TH');
    thTitol.innerHTML = 'Titol ';
    const thIdioma = document.createElement('TH');
    thIdioma.innerHTML = 'Idioma Original ';
    const thAccions = document.createElement('TH');
    thAccions.innerHTML = 'Accions ';

    tr.appendChild(thTitol);
    tr.appendChild(thIdioma);
    tr.appendChild(thAccions);
    table.appendChild(tr);

    for (let i = 0; i < arrayPartitures.length; i++) {

        tr = document.createElement('TR');
        const tdTitol = document.createElement('TD');
        const tdIdiomaOriginal = document.createElement('TD');
        const tdAccions = document.createElement('TD');
        let editButton = document.createElement('BUTTON');
        let editIcono = document.createElement('I');
        let borraButton = document.createElement('BUTTON');
        let borraIcono = document.createElement('I');

        tdTitol.innerHTML = arrayPartitures[i].titol;
        tdIdiomaOriginal.innerHTML = arrayPartitures[i].idiomaoriginal;

        editButton.className = arrayPartitures[i].idPartitura + ' editar';
        editButton.className="fas fa-edit";
        editButton.appendChild(editIcono);
        editButton.innerHTML="Editar";

        borraButton.className = arrayPartitures[i].idPartitura + ' esborrar';
        borraButton.className = "fas fa-trash";
        borraButton.appendChild(borraIcono);
        borraButton.innerHTML="Borrar";

        tdAccions.appendChild(editButton);
        tdAccions.appendChild(borraButton);
        tr.appendChild(tdTitol);
        tr.appendChild(tdIdiomaOriginal);
        tr.appendChild(tdAccions);
        table.appendChild(tr);


        editButton.addEventListener('click', function(){
            editPartitura(arrayPartitures[i].idpartitura)
        })

        borraButton.addEventListener('click', function(){
            borraPartitura(arrayPartitures[i].idPartitura)
        })
        

    }

    
    document.querySelector('body').appendChild(table);

})()


function borraPartitura(idPartitura) {
console.log("Hello world")
}

document.querySelector('#login').addEventListener('click', function () {
    login();
});

function login() {
    window.open("./login.html", "Login", "width=200,heigth=100");
}

function editPartitura(idPartitura){
    
    window.open(`/scoreFinder/src/partitura.html?id=${idPartitura}`,"_self")

}
