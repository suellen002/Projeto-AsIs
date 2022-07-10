export class Fornecedor {

    constructor() { 
        this.id = 0;
        this.nome = '';
        this.cnpjCpf = '';
        this.email = '';
        this.endereco = 0;
        this.enderecoLogradouro = '';
        this.ativo = true;
    }

    id: number;
    nome: string;
    cnpjCpf: string;
    email: string;
    endereco: number;
    enderecoLogradouro: string;    
    ativo: boolean;
}