export class User{
    public readonly id: string;
    public readonly nome: string;
    public readonly email: string;
    public readonly senha: string;

    constructor(nome: string, email: string, senha: string){
            this.id = crypto.randomUUID().toString();
            this.nome=nome;
            this.email=email;
            this.senha=senha;
        }
      
}




