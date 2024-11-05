import { Request, Response } from 'express';
import { TransactionDao }  from '../dao/TransactionDao';


const transactionDao = new TransactionDao();

export class TransactionController{
    async getTransactions(req: Request, res: Response) {
        try {
            const transactions = await transactionDao.getAllTransactions();
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: `Erro ao buscar transações ${error}` });
        }
    }
}