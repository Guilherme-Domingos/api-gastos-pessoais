
export type transacaoProps = {
    id: string,
    data: Date,
    valor: number,
    categoria: string,
    tipo: 'receita' | 'despesa',
    remetente: string
}

export class Transacao{
    private constructor(readonly props: transacaoProps){}

    public static build(data: Date, valor: number, categoria: string, tipo: 'receita' | 'despesa', remetente: string){
        const props: transacaoProps = {
            id: crypto.randomUUID().toString(),
            data,
            valor,
            categoria,
            tipo,
            remetente
        }
        return new Transacao(props)
    }

    public static Assemble(id: string, data: Date, valor: number, categoria: string, remetente: string, tipo: 'receita' | 'despesa'){
        const props: transacaoProps = {
            id,
            data,
            valor,
            categoria,
            tipo,
            remetente
        }
        return new Transacao(props)
    }
}
