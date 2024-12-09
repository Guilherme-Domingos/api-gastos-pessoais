import { Request, Response } from 'express';
import UserService from '../service/User.service';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';


import { getIdDtoUser } from '../dto/user/GetIdDtoUser';
import { getEmailDtoUser } from '../dto/user/GetEmailDtoUser';
import { RegisterDtoUser } from '../dto/user/RegisterDtoUser';
import { UpdateDtoUser } from '../dto/user/UpdateDtoUser';
import { DeleteUserDto } from '../dto/user/DeleteDtoUser';

export class UserController {

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
            const id = plainToInstance(getIdDtoUser, req.params)
            
            const errors = await validate(id);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({ message: `Usuário não  encontrado com o ID ${id}`});
            }

            return res.status(201).json({message: `Usuário registrado com sucesso`,id: user,});

        } catch (error: any) {
            res.status(500).json({ error: `Erro ao buscar usuário.` });
        }
    }

    async registerUser( req: Request, res: Response){
        try {
            const user = plainToInstance(RegisterDtoUser, req.body);

            const errors = await validate(user);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const newUser = await  this.userService.registerUser(user);

            return res.status(201).json({message: `Usuário registrado com sucesso`,user: newUser,});

        } catch (error: any) {
            res.status(400).json({error: error.message });
        }
    }

    public async updateUser( req: Request, res: Response){
        try{
            const { id } = req.params;
            const user = plainToInstance(UpdateDtoUser, id);

            const errors = await validate(user);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const upUser = await this.userService.updateUser(id, user);

            return res.status(200).json({ message: 'Usuário atualizado com sucesso',user: upUser });

        }catch(error: any){
            res.status(500).json({ message: `Erro ao atualizar usuário: ${error}` });
        }
    }

    public async deleteUser( req: Request, res: Response){
        try {
            const { id } = req.params;
            
            const user = plainToInstance(DeleteUserDto, id);

            const errors = await validate(user)

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const delUser = await this.userService.deleteUser(user)

            return res.status(200).json({message: `Usuário com o ID ${id} foi deletado com sucesso`});
            
        }catch (error: any) {
            res.status(500).json({ message: `Erro ao deletar usuário: ${error.message}` });
        }
    }

    // public async getUserTransactions( req: Request, res: Response){
    //     try{
    //         const { id } = req.params;
    //         const user = plainToInstance(GetUserTransactionsDto, id);
    //         if (!id || typeof id !== 'string') {
    //             return res.status(400).json({ message: "ID inválido." });
    //         }

    //         const userTransactions = await this.userService.getUserTransactions(id);
    //         res.status(200).json(userTransactions);

    //     }catch (error: any) {
    //         res.status(500).json({ message: `Erro ao buscar transações do usuário: ${error.message}` });
    //     }
    // }
}
