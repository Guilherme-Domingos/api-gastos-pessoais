import { Request, Response } from 'express';
import { UserDao } from '../dao/UserDao'; // Importe o DAO de Usuário

const userDao = new UserDao();

export class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userDao.getAllUsers(); // Chama apenas o DAO
            res.status(200).json(users); // Retorna a lista de usuários com status 200
        } catch (error) {
            res.status(500).json({ message: `Erro ao buscar usuários: ${error}` });
        }
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await userDao.registerUser(req.body); // Passa os dados do corpo da requisição
            res.status(201).json(newUser); 
        } catch (error) {
            res.status(500).json({ message: `Erro ao registrar usuário: ${error}` });
        }
    }
}
