import { Request, Response } from 'express';

import TransactionService from '../service/Transaction.service';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { RegisterDtoTransaction, TransactionListDto, TransactionResponseDto } from "../dto/transaction/RegisterDtoTransaction";
import { GetIdDtoTransaction } from "../dto/transaction/GetIdDtoTransaction";
import { UpdateDtoTransaction } from "../dto/transaction/UpdateDtoTransaction";
import { DeleteDtoTransaction } from "../dto/transaction/DeleteDtoTransaction";
import UserService from '../service/User.service';



export class TransactionController{

    async getAllTransactions(req: Request, res: Response) {
        try {
            const transactions = await TransactionService.getAllTransactions();
            console.log(transactions);
            return res.status(200).json(transactions); 
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: `Erro ao buscar transações ${error}` });
        }
    }
    
    async getIdTransaction( req: Request, res: Response) {
        try{
            const id = plainToInstance(GetIdDtoTransaction, req.params)

            const errors = await validate(id);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação ID", details: errors });
            }

            const transaction = await TransactionService.getTransactionById(id);

            if (!transaction) {
                res.status(404).json({ message: `Transação não encontrado com o ID ${id}`});
            }

            return res.status(201).json({message: `Transação registrado com sucesso`,id: transaction,});
        }catch(error){
            console.error(error)
            res.status(500).json({message: `Erro ao buscar transação ${error}`})
        }
    }

    async registerTransaction(req: Request, res: Response) {
        try {

            const transaction = plainToInstance(RegisterDtoTransaction, req.body);

            const errors = await validate(transaction);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }
            
            const newTransaction = await TransactionService.registerTransaction(transaction);

            return res.status(201).json({message: `Transação registrado com sucesso`,user: newTransaction,});
        }
        catch (error) {
            console.error(error)
            res.status(500).json({ message: `Erro ao criar transação ${error}`})
        }
    }

    async updateTransaction(req: Request, res: Response) {
        try {
            const id = plainToInstance(GetIdDtoTransaction, req.params)

            const errorsId = await validate(id);

            if (errorsId.length > 0) {
                return res.status(400).json({ error: "Erro de validação ID", details: errorsId });
            }

            const updateData = plainToInstance(UpdateDtoTransaction, req.body)

            const errorsUp = await validate(updateData);

            if (errorsUp.length > 0) {
                return res.status(400).json({ error: "Erro de validação dados update", details: errorsUp });
            }

            const updateTransaction = await TransactionService.updateTransaction(id, updateData);
            
            return res.status(200).json({ message: 'Transação atualizada com sucesso', transaction: updateTransaction });
            
        }catch( error){
            console.error(error)
            res.status(500).json({ message: `Erro ao atualizar transação ${error}`})
        }
    }

    async deleteTransaction( req: Request, res: Response) {
        try{
            const id = plainToInstance(DeleteDtoTransaction, req.params)

            const errors = await validate(id)

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação ID", details: errors });
            }

            await TransactionService.deleteTransaction(id);

            return res.status(200).json({message: `Transação com o ID ${id} foi deletada com sucesso`});

        }catch(error){
            console.error(error)
            res.status(500).json({message: `Erro ao deletar transação ${error}`})
        }
    }

}