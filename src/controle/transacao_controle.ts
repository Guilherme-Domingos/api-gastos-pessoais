import { Request, Response} from "express";
import { Transacao } from "../modelo/transacao";
import { transacaoDao } from "../dao/transacaoDao";

export class TransacaoControle{
    public constructor (readonly transacaoDao: transacaoDao){}

    public async salvarTransacao(req: Request, res: Response){
        const { data, valor, categoria, tipo, remetente } = req.body
        const transacao : Transacao = Transacao.build(data, valor, categoria, tipo, remetente)
        try{
            this.transacaoDao.salvarTransacao(transacao)
        }catch(error){

        }
    }
}