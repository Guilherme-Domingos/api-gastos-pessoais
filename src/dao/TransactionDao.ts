import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionDao{
    public async getAllTransactions() {
        try {
            const transactions = await prisma.transaction.findMany();
            return transactions; 
        } catch (error) {
            throw new Error(`Erro ao buscar transações: ${error}`);
        }
    }

    public async getIdTransaction(id: string){
        try{
            const transaction= await prisma.transaction.findUnique({where: {id}});
            return transaction;
        }catch( erro){
            throw new Error(`Erro ao buscar transação por id: ${erro}`)
        }
    }

    public async registerTransaction(data:{ date: string, remetente: string, categoria: string, valor: number, descricao : string, tipo: string, userId: string }) {
        try{
            const transaction = await prisma.transaction.create({data: 
                {
                    date: data.date,
                    remetente: data.remetente,
                    categoria: data.categoria,
                    valor: data.valor,
                    descricao: data.descricao,
                    tipo: data.tipo,
                    userId: data.userId,
                }
            });
            return transaction;

        }catch(error){
            throw new Error(`Erro ao criar transação: ${error}`);
        }
    }

    public async updateTransaction(id: string, data:{ date: string, remetente: string, categoria: string, valor: number, descricao : string, tipo: string, userId: string }) {
        try {
            const transaction = await prisma.transaction.update({
                where: {
                    id: id,
                },
                data: {
                    date: data.date,
                    remetente: data.remetente,
                    categoria: data.categoria,
                    valor: data.valor,
                    descricao: data.descricao,
                    tipo: data.tipo,
                    userId: data.userId
                },
            });
            return transaction;
        }catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }
    public async deleteTransaction( id: string ){
        try{
            const transaction = await prisma.transaction.delete({where: {id}});
            return transaction;
        }catch(error){
            throw new Error(`Erro ao deletar transação: ${error}`)
        }
    }
}
