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
}
