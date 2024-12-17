import { PrismaClient } from '@prisma/client';

import { RegisterDtoUser } from '../dto/user/RegisterDtoUser';
import { UpdateDtoUser } from '../dto/user/UpdateDtoUser';
import { GetIdDtoUser } from '../dto/user/GetIdDtoUser';
import { getEmailDtoUser } from '../dto/user/GetEmailDtoUser';

import { TransactionListDto, UserBalance } from '../dto/transaction/RegisterDtoTransaction';
import { DeleteDtoTransaction } from '../dto/transaction/DeleteDtoTransaction';

const prisma = new PrismaClient();

export class UserDao {
    static async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            console.log(users);
            return users;
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error}`);
        }
    }

    static async getUserByEmail(data: getEmailDtoUser) {
        try {
            return await prisma.user.findUnique({ where:  data  });

        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error}`);
        }
    }

    static async getUserById(data: GetIdDtoUser) {
        try {
            return await prisma.user.findUnique({ where:  data });

        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error}`);
        }
    }

    static async registerUser(user: RegisterDtoUser) {
        try {
            return await prisma.user.create({ data: user });
             
        } catch (error) {
            throw new Error(`Erro ao registrar usuário: ${error}`);
        }
    }
    static async updateUser(id: GetIdDtoUser, user : UpdateDtoUser) {
        try {
            return await prisma.user.update({
                where: id,
                data: user,
            });
             
        }catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }

    static async deleteUser( id: DeleteDtoTransaction) {
        try{
            return await prisma.user.delete({
                where: id ,
            });
        }catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error}`);
        }
    }

    static async getUserTransactions(id: GetIdDtoUser){
        try{
            const userTransactions = await prisma.user.findUnique({
                where:  id,
                select: { transactions: true },
            });
            return userTransactions?.transactions;     	
        }catch (error) {
            throw new Error(`Erro ao buscar transações do usuário: ${error}`);
        }
    }

    static async getUserBalance(id: GetIdDtoUser): Promise <number>{
        try {            
            const transactions = await prisma.user.findMany({
                where: id,
                select: {
                    transactions: {
                        select: {
                            tipo: true,
                            valor: true
                        }
                    }
                }

            })

            const todasTransacoes = transactions.flatMap(user => user.transactions)

            const receitas = todasTransacoes.filter((t) => t.tipo === "receita").reduce((acc, t) => acc + t.valor, 0)
            
            const despesas = todasTransacoes.filter((t) => t.tipo === "despesa").reduce((acc, t) => acc + t.valor, 0)

            return receitas - despesas
        }catch (error) {
            throw new Error(`Erro ao buscar transações do usuário: ${error}`);
        }
    }

}
