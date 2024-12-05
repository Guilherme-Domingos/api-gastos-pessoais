import { Request, Response } from 'express';
import UserService from '../service/User.service';

class UserController {

    private userService = new UserService();

    async getAllUsers(req: Request, res: Response){
        try {
            const users = await this.userService.getAllUsers(); 
            return res.status(200).json(users); 
        } catch (error: any) {
            res.status(500).json({ error: `Erro ao buscar usuários.` });
        }
    }

    async getUserByEmail(req: Request, res: Response){
        try {
            const { email } = req.query;

            if (!email || typeof email !== 'string') {
                return res.status(400).json({ message: "Email inválido" });
            }

            const user = await this.userService.getUserByEmail({email});
            return res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req: Request, res: Response){
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido." });
            }

            const user = await this.userService.getUserById({id});

            if (!user) {
                res.status(404).json({ message: `Usuário não  encontrado com o ID ${id}`});
            }

            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: `Erro ao buscar usuário.` });
        }
    }

    async registerUser( req: Request, res: Response){
        try {
            const newUser = await  this.userService.registerUser(req.body);
            return res.status(201).json(newUser);

        } catch (error: any) {
            res.status(400).json({error: error.message });
        }
    }

    public async updateUser( req: Request, res: Response){
        try{
            const { id } = req.params;
            const updatedUser = await this.userService.updateUser(id, req.body);
            

            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        }catch(error: any){
            res.status(500).json({ message: `Erro ao atualizar usuário: ${error}` });
        }
    }

    public async deleteUser( req: Request, res: Response){
        try {
            const { id } = req.params;
            return await this.userService.deleteUser({id});
            
            
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        }catch (error: any) {
            res.status(500).json({ message: `Erro ao deletar usuário: ${error}` });
        }
    }

    // public async getUserTransactions( req: Request, res: Response){
    //     try{
    //         const id = req.params.id;
    //         const userTransactions = await this.userService.getUserTransactions(id);
    //     res.status(200).json(userTransactions);
    //     }catch (error: any) {
    //         res.status(500).json({ message: `Erro ao buscar transações do usuário: ${error}` });
    //     }
    // }
}
