import { Estado } from "./estado";

export class Municipio {

    constructor() { 
        this.id = 0;
        this.descricao = '';
        this.estado = new Estado();
        this.ativo = true;
    }
    
    id: number;
    descricao: string;
    estado: Estado;
    ativo: boolean;
}