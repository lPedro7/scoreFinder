import { getIdiomes } from '../Servei/GoogleService.js';
import { getPartituraById } from '../Servei/partituraService.js'

const idOriginal = document.getElementsByName('idiomaOriginal')[0];

let arrayIdiomes = [];

(async () => {
    arrayIdiomes = await getIdiomes();


    for (let i = 0; i < arrayIdiomes.length; i++) {
        let option = document.createElement('OPTION');
        option.value = arrayIdiomes[i].codi;
        option.innerHTML = arrayIdiomes[i].nom;
        idOriginal.appendChild(option);
    }
})().then(()=>{
    console.log(window.location.search)
    if (window.location.search !== undefined) {
        printPartitura();
    }
})

document.querySelector('#enviar').addEventListener(`click`, function () {


    let checkTitol = false;
    let checkLletraOriginal = false;
    let checkTraduccioCatala = false;
    let title = document.getElementsByName('titol')[0].value;


    const pattern3Paraules = /^(\s?\b\w+\b\s?){3}$/;

    if (pattern3Paraules.test(title)) {
        checkTitol = true;
        document.querySelector('#titleError').innerHTML = ""

    } else {
        checkTitol = false;
        document.querySelector('#titleError').innerHTML = "El titol ha de tenir exactament 3 paraules";
        document.querySelector('#titleError').style = "color:red"
    }



    const patternHTML = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/;

    const lletraOriginal = document.getElementsByName('lletraOriginal')[0].value;

    if (patternHTML.test(lletraOriginal)) {
        checkLletraOriginal = true;
        document.querySelector('#lletraOriginalError').innerHTML = ""

    } else {
        checkLletraOriginal = false;
        document.querySelector('#lletraOriginalError').innerHTML = "Aquest HTML no està ben format";
        document.querySelector('#lletraOriginalError').style = "color:red"
    }


    const traduccioCatala = document.getElementsByName('traduccioCatala')[0].value;

    const idiomaOriginal = document.getElementsByName('idiomaOriginal')[0].value;

    if (idiomaOriginal.toLowerCase() == 'catalan') {
        if (lletraOriginal == traduccioCatala) {
            checkTraduccioCatala = true;
        } else {
            checkTraduccioCatala = false;
            document.querySelector('#traduccioCatalaError').innerHTML = "L'idioma original i el traduit no coincideixen";
            document.querySelector('#traduccioCatalaError').style = "color:red"

        }
    } else if (patternHTML.test(traduccioCatala)) {
        checkTraduccioCatala = true;
        document.querySelector('#traduccioCatalaError').innerHTML = ""
    } else {
        checkTraduccioCatala = false;
        document.querySelector('#traduccioCatalaError').innerHTML = "Aquest HTML no està ben format";
        document.querySelector('#traduccioCatalaError').style = "color:red"
    }

    if (checkTitol && checkLletraOriginal && checkTraduccioCatala) {
        document.querySelector('#form').submit();
    }

})


async function printPartitura() {
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
    
        const idPartitura = urlParams.get('id');
    
        const partitura = await getPartituraById(idPartitura)
    
        console.log(partitura)
    
        document.querySelector('#partituraId').value = idPartitura;
    
        document.getElementsByName('titol')[0].value = partitura.titol;
        
        document.getElementsByName('idiomaOriginal')[0].value = partitura.idiomaoriginal;
        
        document.getElementsByName('lletraOriginal')[0].value = partitura.lletraoriginal;

        document.getElementsByName('traduccioCatala')[0].value = partitura.lletratraduccio;

    }