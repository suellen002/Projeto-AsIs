import { Pais } from "./pais";

export class Estado {

    constructor() { 
        this.id = 0;
        this.pais = new Pais();
        this.descricao = '';
        this.sigla = '';
        this.ativo = true;
    }

    id: number;
    pais: Pais;
    descricao: string;
    sigla: string;
    ativo: boolean;
}