export class Nota{
    constructor(id, nom, alteracio, ordre){
        this.id = id;
        this.nom = nom.toUpperCase();
        this.alteracio = alteracio.toUpperCase();
        this.ordre = ordre;
    }
}