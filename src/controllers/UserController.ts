import { Request, Response } from 'express';
import { UserService } from '../service/User.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterDtoUser } from '../dto/user/RegisterDtoUser';

export class UserController {

    private userService = UserService.build();

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.list(); 
            res.status(200).json(users); 
        } catch (error) {
            res.status(500).json({ message: `Erro ao buscar usuários: ${error}` });
        }
    }

    public async getUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            const email = req.params.email;
            const user = await this.userService.search(email);
            if (!user) {
                res.status(404).json({ message: `Usuário não encontrado com o ID ${email}`});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: `Erro ao buscar usuário: ${error}` });
        }
    }

    public async registerUser( req: Request, res: Response): Promise<void> {
        try {
            const userDto = plainToInstance(RegisterDtoUser, req.body);

            // Validando o DTO
            const errors = await validate(userDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Dados inválidos', errors });
                return;
            }

            const newUserId = await this.userService.save(userDto); 
            res.status(201).json({ message: 'Usuário registrado com sucesso', id: newUserId });
        } catch (error) {
            res.status(500).json({ message: `Erro ao registrar usuário: ${error}` });
        }
    }

    public async updateUser( req: Request, res: Response): Promise<void> {
        try{
            const email = req.params.email;
            const updatedUser = await this.userService.search(email);
            if (!updatedUser) {
                res.status(404).json({ message: `Usuário não encontrado com o email ${email}` });
                return;
            }

            const updatedData = req.body;
            await this.userService.save(updatedData); // Use the save method to update
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });

        }catch(error){
            res.status(500).json({ message: `Erro ao atualizar usuário: ${error}` });
        }
    }

    public async deleteUser( req: Request, res: Response): Promise<void> {
        try {
            const email = req.params.email;
            const deletedUser = await this.userService.search(email);
            
            if (!deletedUser) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }

            await this.userService.save({ ...deletedUser, ativo:false})
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        }catch (error) {
            res.status(500).json({ message: `Erro ao deletar usuário: ${error}` });
        }
    }

    public async getUserTransactions( req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            const userTransactions = await this.userService.getUserTransactions(id);
        res.status(200).json(userTransactions);
        }catch (error) {
            res.status(500).json({ message: `Erro ao buscar transações do usuário: ${error}` });
        }
    }
}
