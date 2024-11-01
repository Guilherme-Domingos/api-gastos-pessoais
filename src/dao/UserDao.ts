import { User } from '../models/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserDao{

    public async getAllUsers(req: Request){
        try{
            const users = await prisma.user.findMany();
            return users
        }catch(error){
            throw new Error(`Erro ao buscar usuários: ${error}`);
        }
    }

}