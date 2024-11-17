import cuid from 'cuid';

export class User{
    public readonly id: string;
    public readonly nome: string;
    public readonly email: string;
    public readonly telefone: string;  
    public readonly endereco: string;   
    public readonly senha: string;
    public readonly saldo: number;

    constructor(nome: string, email: string, telefone: string, endereco: string, senha: string, saldo: number) {
        this.id = cuid();
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;  
        this.endereco = endereco;   
        this.senha = senha; 
        this.saldo = saldo;
    }
      
}




