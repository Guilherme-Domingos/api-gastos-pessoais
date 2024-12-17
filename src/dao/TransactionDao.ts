import { PrismaClient } from '@prisma/client';

import { GetIdDtoTransaction } from '../dto/transaction/GetIdDtoTransaction';
import { RegisterDtoTransaction } from '../dto/transaction/RegisterDtoTransaction';
import { UpdateDtoTransaction } from '../dto/transaction/UpdateDtoTransaction';
import { DeleteDtoTransaction } from '../dto/transaction/DeleteDtoTransaction';

const prisma = new PrismaClient();

export class TransactionDao{
    static async getAllTransactions() {
        try {
            const transactions = await prisma.transaction.findMany();
            console.log(transactions)
            return transactions; 
        } catch (error) {
            throw new Error(`Erro ao buscar transações: ${error}`);
        }
    }

    static async getTransactionById(id: GetIdDtoTransaction){
        try{
            const transaction = await prisma.transaction.findUnique({where: id});
            return transaction;
        }catch( erro){
            throw new Error(`Erro ao buscar transação por id: ${erro}`)
        }
    }

    static async registerTransaction(transaction: RegisterDtoTransaction) {
        try{

            return await prisma.transaction.create({data: transaction});

        }catch(error){
            throw new Error(`Erro ao criar transação: ${error}`);
        }
    }

    static async updateTransaction(id: GetIdDtoTransaction, updateTransaction: UpdateDtoTransaction) {
        try {
            const transaction = await prisma.transaction.update({
                where: id,
                data: updateTransaction,
            });
            return transaction;
        }catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }
    static async deleteTransaction( id: DeleteDtoTransaction ){
        try{
            const transaction = await prisma.transaction.delete({where: id});
            return transaction;
        }catch(error){
            throw new Error(`Erro ao deletar transação: ${error}`)
        }
    }
}