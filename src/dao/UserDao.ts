import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserDao {
    public async getAllUsers() {
        try {
            const users = await prisma.user.findMany();

            return users; // Retorna a lista de usuários

        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error}`);
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
                    senha: data.senha,
                },
            });
            return user; // Retorna o novo usuário

        } catch (error) {
            throw new Error(`Erro ao registrar usuário: ${error}`);
        }
    }

    
    public async updateUser(id: string, data: { nome: string; email: string; telefone: string; endereco: string; senha: string }) {
        try {
            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                    endereco: data.endereco,
                    senha: data.senha,
                },
            });
            return user;
        }catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }

    public async deleteUser( id: string) {
        try{
            const user = await prisma.user.delete({
                where: {
                    id: id,
                    }
                });
        }catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error}`);
        }
    }
}
