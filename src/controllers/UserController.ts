import { Request, Response } from 'express';
import { UserDao } from '../dao/UserDao'; 

const userDao = new UserDao();

export class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userDao.getAllUsers(); 
            res.status(200).json(users); 
        } catch (error) {
            res.status(500).json({ message: `Erro ao buscar usuários: ${error}` });
        }
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await userDao.registerUser(req.body); 
            res.status(201).json(newUser); 
        } catch (error) {
            res.status(500).json({ message: `Erro ao registrar usuário: ${error}` });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            const updatedUser = await userDao.updateUser(id, req.body);
            res.status(200).json(updatedUser);
        }catch(error){
            res.status(500).json({ message: `Erro ao atualizar usuário: ${error}`})
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userDao.deleteUser(req.body);
        }catch (error) {
            res.status(500).json({ message: `Erro ao deletar usuário: ${error}` });
        }
    }

}
