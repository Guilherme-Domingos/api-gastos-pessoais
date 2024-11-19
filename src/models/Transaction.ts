export class Transacao{
    public readonly id: string;
    public readonly date: Date;
    public readonly rementente: string;
    public readonly categoria:  string;
    public readonly valor:  number;
    public readonly descricao: string;
    public readonly tipo: string;

    constructor(date: Date, rementente: string,  categoria: string, valor: number, descricao: string, tipo: string) {
        this.id = crypto.randomUUID();
        this.date = date;
        this.rementente = rementente;
        this.categoria = categoria;
        this.valor = valor;
        this.descricao = descricao;
        this.tipo = tipo;
    }
}