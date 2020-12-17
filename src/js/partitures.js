

(getPartitures())
 async function getPartitures(){
    let x = await fetch("http://server247.cfgs.esliceu.net/piano/nologin/score/list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-urlencoded'
        }}).then(r => r.json());
    

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
        
        for(let i = 0; i < x.length; i++){
            
            tr = document.createElement('TR');
            const tdTitol = document.createElement('TD');
            tdTitol.innerHTML = x[i].titol;
            const tdIdiomaOriginal = document.createElement('TD');
            tdIdiomaOriginal.innerHTML = x[i].idiomaoriginal;
            const tdAccions = document.createElement('TD');
            tdAccions.innerHTML = `<button class='${x[i].idpartitura} editar'>
            <i class="fas fa-edit"></i>Editar</button>
             <button class='${x[i].idpartitura} esborrar'><i class="fas fa-trash"></i>
            Esborrar</button>`
            tr.appendChild(tdTitol);
            tr.appendChild(tdIdiomaOriginal);
            tr.appendChild(tdAccions);
            table.appendChild(tr);
        }
     
        console.log(x)
        document.querySelector('body').appendChild(table);

    }


    let esborrarPartitures = document.querySelectorAll('#esborrar');

    for(let i = 0; i < esborrarPartitures.length ; i++){
        esborrarPartitures[i].addEventListener('click',()=>{
            
        })
    }


    function borraPartitura(idPartitura){

    }

    
function login(){
    window.open("./login.html", "Login","width=200,heigth=100");
}