import { PrismaClient } from '@prisma/client';
import { RegisterDtoUser } from '../dto/user/RegisterDtoUser';

const prisma = new PrismaClient();

export class UserDao {
    static async getAllUsers() {
        try {
            return await prisma.user.findMany();
            
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error}`);
        }
    }

    static async getUserByEmail(email: string) {
        try {
            return await prisma.user.findUnique({ where: { email } });

        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error}`);
        }
    }

    static async getUserById(id: string) {
        try {
            return await prisma.user.findUnique({ where: { id } });

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
    static async updateUser(id: string, data: Partial<{ nome: string; email: string; telefone: string; endereco: string; senha: string}>) {
        try {
            return await prisma.user.update({
                where: { id },
                data,
            });
             
        }catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }

    static async deleteUser( id: string) {
        try{
            return await prisma.user.delete({
                where: { id },
            });
        }catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error}`);
        }
    }

    static async getUserTransactions(id: string){
        try{
            const userTransactions = await prisma.user.findUnique({
                where: { id },
                select: { transactions: true },
            });
            return userTransactions?.transactions;     	
        }catch (error) {
            throw new Error(`Erro ao buscar transações do usuário: ${error}`);
        }
    }

}
