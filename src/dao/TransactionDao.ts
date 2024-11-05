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
}