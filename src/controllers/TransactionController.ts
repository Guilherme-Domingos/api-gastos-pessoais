import { Request, Response } from 'express';
import { TransactionDao }  from '../dao/TransactionDao';


const transactionDao = new TransactionDao();

export class TransactionController{

    async getAllTransactions(req: Request, res: Response) {
        try {
            const transactions = await transactionDao.getAllTransactions();
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: `Erro ao buscar transações ${error}` });
        }
    }
    
    async getIdTransaction( req: Request, res: Response) {
        try{
            const id = req.params.id;
            const transaction = await transactionDao.getIdTransaction(id);
            res.json(transaction);
        }catch(error){
            res.status(500).json({message: `Erro ao buscar transação ${error}`})
        }
    }

    async registerTransaction(req: Request, res: Response) {
        try {
            const transaction = await transactionDao.registerTransaction(req.body);
            res.json(transaction);
        
        }
        catch (error) {
            res.status(500).json({ message: `Erro ao criar transação ${error}`})
        }
    }

    async updateTransaction(req: Request, res: Response) {
        try {
            const id = req.params.id
            const transaction = await transactionDao.updateTransaction(id, req.body);
            res.json(transaction)
        }catch( error){
            res.status(500).json({ message: `Erro ao atualizar transação ${error}`})
        }
    }

    async deleteTransaction( req: Request, res: Response) {
        try{
            const id = req.params.id;
            const transaction = await transactionDao.deleteTransaction(id);
            res.json(transaction);
        }catch(error){
            res.status(500).json({message: `Erro ao deletar transação ${error}`})
        }
    }

                

}