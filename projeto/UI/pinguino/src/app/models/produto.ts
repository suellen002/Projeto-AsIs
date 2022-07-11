import { Fornecedor } from './fornecedor';
export class Produto {

    constructor() {
        this.id = 0;
        this.nome = '';
        this.sku = '';
        this.codigobarras = '';
        this.fornecedor = new Fornecedor();
            this.descricao = ''
        this.precovenda = 0.0;
        this.ativo = true;
    }

    id: number;
    nome: string;
    sku: string;
    codigobarras: string;
    fornecedor: Fornecedor;
    descricao: string;
    precovenda: number
    ativo: boolean;
}
