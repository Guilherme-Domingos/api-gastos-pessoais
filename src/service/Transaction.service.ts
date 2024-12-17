import { plainToClass } from "class-transformer";

import { validateOrReject } from "class-validator";

import { TransactionDao } from "../dao/TransactionDao";

import { RegisterDtoTransaction, TransactionListDto, TransactionResponseDto } from "../dto/transaction/RegisterDtoTransaction";
import { GetIdDtoTransaction } from "../dto/transaction/GetIdDtoTransaction";
import { UpdateDtoTransaction } from "../dto/transaction/UpdateDtoTransaction";

class TransactionService{

    static async getAllTransactions(): Promise<TransactionListDto[]>{
        const transactions = await TransactionDao.getAllTransactions();
        return transactions.map((transaction) => ({
            id: transaction.id,
            date: transaction.date,
            remetente: transaction.remetente,
            valor: transaction.valor,
            tipo: transaction.tipo === 'Receita' ? 'Receita' : 'Despesa',
        }));
    }

    static async getTransactionById(data: GetIdDtoTransaction){
        const dtoInstance = plainToClass(GetIdDtoTransaction, data);
        await validateOrReject(dtoInstance);

        const existingUser = await TransactionDao.getTransactionById(data);
        if (!existingUser) {
            throw new Error("Transação não encontrada.");
        }
        return existingUser;
    }

    static async registerTransaction(data: RegisterDtoTransaction): Promise<TransactionResponseDto> {
    
        const dtoInstance = plainToClass(RegisterDtoTransaction, data);
        await validateOrReject(dtoInstance);

        const newTransaction = await TransactionDao.registerTransaction(dtoInstance);

        return newTransaction;
    }

    static async updateTransaction(id: GetIdDtoTransaction, data: Partial<UpdateDtoTransaction>): Promise<TransactionResponseDto> {

        const dtoInstance = plainToClass(UpdateDtoTransaction, data);
        await validateOrReject(dtoInstance);

        const existingTransaction = await TransactionDao.getTransactionById(id);
        if (!existingTransaction){
            throw new Error("Transação não encontrada.");
        }

        const updateTransaction = await TransactionDao.updateTransaction(id, dtoInstance)

        return updateTransaction;
    }

    static async deleteTransaction(id: GetIdDtoTransaction): Promise<void>{
        const dtoInstance = plainToClass(GetIdDtoTransaction, id);
        await validateOrReject(dtoInstance);

        const existingTransaction = await TransactionDao.deleteTransaction(id);
        if (!existingTransaction){
            throw new Error("Transação não encontrado.");
        }

        await TransactionDao.deleteTransaction(id);
    }

}
export default TransactionService;