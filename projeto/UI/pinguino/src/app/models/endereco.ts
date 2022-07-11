import { Municipio } from "./municipio";

export class Endereco {

    constructor() { 
        this.id = 0;
        this.logradouro = '';
        this.ativo = true;
        this.municipio = new Municipio();
        this.complemento = '';
        this.cep = '';
        this.numero = '';
    }

    id: number;
    logradouro: string;    
    numero: string;
    complemento: string;
    cep: string;
    municipio: Municipio;
    ativo: boolean;
}