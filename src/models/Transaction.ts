export class  Transacao{
    public readonly data: Date;
    public readonly rementente: string;
    public readonly categoria:  string;
    public readonly valor:  number;
    public readonly descricao: string;
    public readonly tipo: string;

    constructor(data: Date, rementente: string,  categoria: string, valor: number, descricao: string, tipo: string) {
        this.data = data;
        this.rementente = rementente;
        this.categoria = categoria;
        this.valor = valor;
        this.descricao = descricao;
        this.tipo = tipo;
    }
}