import { RowDataPacket } from "mysql2";
import { Transacao, transacaoProps } from "../modelo/transacao";
import con from "../util/conexao";

export class transacaoDao{
    public async salvarTransacao(transacao: Transacao){
        try{
            await con.query("INSERT INTO TRANSACAO (id, data, valor, categoria, tipo, remetente) VALUES (?, ?, ?, ?)", [ transacao.props.id, transacao.props.data, transacao.props.valor, transacao.props.categoria, transacao.props.tipo, transacao.props.remetente ])
        }catch(error){
            console.log("Erro ao registrar transação")
            throw error
        }
    }

    public async listarTransacoes(): Promise<Transacao[]>{
        try{
            const [ result ] = await con.query<transacaoProps[] & RowDataPacket[]>("SELECT * FROM TRANSACAO")
            const transacoes: Transacao[] = result.map((transacao) => {
                const { id, data, valor, categoria, tipo, remetente } = transacao
                return Transacao.Assemble(id, data, valor, categoria, remetente, tipo)
            })
            return transacoes
        }catch(error){
            console.log("Erro ao listar transações", error)
            throw error
        }
    }
}