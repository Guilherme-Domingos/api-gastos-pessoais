import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserDao {
    public async getAllUsers() {
        try {
            return await prisma.user.findMany();
            
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error}`);
        }
    }

    public async getUserById(email: string) {
        try {
            return await prisma.user.findUnique({ where: { email } });

        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error}`);
        }
    }

    public async registerUser(data: { nome: string; email: string; telefone: string; endereco: string; senha: string }) {
        try {
            const user = await prisma.user.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                    endereco: data.endereco,
                    senha: data.senha
                },
            });
            return user; 
        } catch (error) {
            throw new Error(`Erro ao registrar usuário: ${error}`);
        }
    }
    public async updateUser(id: string, data: { nome: string; email: string; telefone: string; endereco: string; senha: string}) {
        try {
            return await prisma.user.update({
                where: { id },
                data: {
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                    endereco: data.endereco,
                    senha: data.senha,
                },
            });
             
        }catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }

    public async deleteUser( id: string) {
        try{
            return await prisma.user.delete({
                where: { id },
            });
        }catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error}`);
        }
    }

    public async getUserTransaction(id: string){
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
