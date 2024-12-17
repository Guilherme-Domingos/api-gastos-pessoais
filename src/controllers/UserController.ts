import { Request, Response } from 'express';
import UserService from '../service/User.service';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { GetIdDtoUser } from '../dto/user/GetIdDtoUser';
import { getEmailDtoUser } from '../dto/user/GetEmailDtoUser';
import { RegisterDtoUser } from '../dto/user/RegisterDtoUser';
import { UpdateDtoUser } from '../dto/user/UpdateDtoUser';
import { DeleteDtoUser } from '../dto/user/DeleteDtoUser';

export class UserController {

    public async getAllUsers(req: Request, res: Response){
        try {
            const users = await UserService.getAllUsers(); 
            console.log(users)
            return res.status(200).json(users); 

        } catch (error: any) {
            res.status(500).json({ error: `Erro ao buscar usuários.` });
        }
    }

    public async getUserByEmail(req: Request, res: Response){
        try {
            const { email } = req.query;

            if (!email || typeof email !== 'string') {
                return res.status(400).json({ message: "Email inválido" });
            }

            const user = await UserService.getUserByEmail({email});
            return res.status(200).json(user);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getUserById(req: Request, res: Response){
        try {
            const id = plainToInstance(GetIdDtoUser, req.params)
            
            const errors = await validate(id);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const user = await UserService.getUserById(id);

            if (!user) {
                res.status(404).json({ message: `Usuário não  encontrado com o ID ${id}`});
            }

            return res.status(201).json({message: `Usuário registrado com sucesso`,id: user,});

        } catch (error: any) {
            res.status(500).json({ error: `Erro ao buscar usuário.` });
        }
    }

    public async registerUser( req: Request, res: Response){
        try {
            const user = plainToInstance(RegisterDtoUser, req.body);

            const errors = await validate(user);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const newUser = await  UserService.registerUser(user);

            return res.status(201).json({message: `Usuário registrado com sucesso`,user: newUser,});

        } catch (error: any) {
            res.status(400).json({error: error.message });
        }
    }

    public async updateUser( req: Request, res: Response){
        try{
            const id = plainToInstance(GetIdDtoUser, req.params)
            
            const errorsId = await validate(id);

            if (errorsId.length > 0) {
                return res.status(400).json({ error: "Erro de validação ID", details: errorsId });
            }
            
            const updateData = plainToInstance(UpdateDtoUser, req.body);

            const errorsUp = await validate(updateData);

            if (errorsUp.length > 0) {
                return res.status(400).json({ error: "Erro de validação dados update", details: errorsUp });
            }

            const updateUser = await UserService.updateUser(id, updateData);

            return res.status(200).json({ message: 'Usuário atualizado com sucesso',user: updateUser });

        }catch(error: any){
            res.status(500).json({ message: `Erro ao atualizar usuário: ${error}` });
        }
    }

    public async deleteUser( req: Request, res: Response){
        try {
            const id = plainToInstance(DeleteDtoUser, req.params);
            
            const errors = await validate(id)

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            await UserService.deleteUser(id)

            return res.status(200).json({message: `Usuário com o ID ${id} foi deletado com sucesso`});
            
        }catch (error: any) {
            res.status(500).json({ message: `Erro ao deletar usuário: ${error.message}` });
        }
    }

    public async getUserTransactions( req: Request, res: Response){
        try{
            const id = plainToInstance(GetIdDtoUser, req.params);

            const errors = await validate(id);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const userTransactions = await UserService.getUserTransactions(id);
            res.status(200).json(userTransactions);

        }catch (error: any) {
            res.status(500).json({ message: `Erro ao buscar transações do usuário: ${error.message}` });
        }
    }

    public async getUserBalance( req: Request, res: Response){
        try{
            const id = plainToInstance(GetIdDtoUser, req.params);

            const errors = await validate(id);

            if (errors.length > 0) {
                return res.status(400).json({ error: "Erro de validação", details: errors });
            }

            const userBalance = await UserService.getUserBalance(id);
            res.status(200).json({message: `Saldo: R$ ${userBalance}`});

        }catch (error: any) {
            res.status(500).json({ message: `Erro ao calcular saldo do usuário: ${error.message}` });
        }
    }
}

    