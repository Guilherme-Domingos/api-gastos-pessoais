import { Request, Response } from 'express';
import { UserDao } from '../dao/UserDao'; // Importe o DAO de Usuário

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

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const user = await userDao.getUserById(id);
            if (!user) {
                res.status(404).json({ message: `Usuário não encontrado com o ID ${id}`});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: `ID inválido, erro: ${error}`});
        }
    }

    public async registerUser( req: Request, res: Response): Promise<void> {
        try {
            const newUser = await userDao.registerUser(req.body); 
            res.status(201).json(newUser); 
        } catch (error) {
            res.status(500).json({ message: `Erro ao registrar usuário: ${error}` });
        }
    }

    public async updateUser( req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            const updatedUser = await userDao.updateUser(id, req.body);
            res.status(200).json(updatedUser);
        }catch(error){
            res.status(500).json({ message: `Erro ao atualizar usuário: ${error}`})
        }
    }

    public async deleteUser( req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const deletedUser = await userDao.deleteUser(id);
            
            if (!deletedUser) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        }catch (error) {
            res.status(500).json({ message: `Erro ao deletar usuário: ${error}` });
        }
    }

    public async getUserTransaction( req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id
            const userTransactions = await userDao.getUserTransaction(id);
        res.status(200).json(userTransactions);
        }catch (error) {
            res.status(500).json({ message: `Erro ao buscar transações do usuário: ${error}` });
        }
    }
}
