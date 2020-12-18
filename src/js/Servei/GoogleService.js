import { Idioma } from '../Model/Idioma.js';

export async function getIdiomes(){
    
    let x = await fetch("http://server247.cfgs.esliceu.net/piano/nologin/google/translate/languages", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-urlencoded'
        }
    }).then(r => r.json());

    let arrayIdiomes = [];
    for(let i = 0; i < x.length; i++){
        arrayIdiomes.push(new Idioma(x[i].code,x[i].name))
    }

    return arrayIdiomes;
}