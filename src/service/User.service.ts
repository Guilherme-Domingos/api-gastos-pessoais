import { plainToClass } from "class-transformer";
import { plainToInstance } from "class-transformer";

import { validateOrReject } from "class-validator";

import { UserDao } from "../dao/UserDao";

import { RegisterDtoUser, UserResponseDto, UserListDto } from "../dto/user/RegisterDtoUser";
import { UpdateDtoUser } from "../dto/user/UpdateDtoUser";
import { DeleteUserDto } from "../dto/user/DeleteDtoUser";
import { getEmailDtoUser } from "../dto/user/GetEmailDtoUser";
import { getIdDtoUser } from "../dto/user/GetIdDtoUser";


class UserService{

    async getAllUsers(): Promise<UserListDto[]>{
        const users = await UserDao.getAllUsers();
        return users.map((user) => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
        }));
    }

    async getUserById(data: getIdDtoUser){
        const dtoInstance = plainToClass(getIdDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserById(data.id);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }
        return existingUser;
    }

    async getUserByEmail(data: getEmailDtoUser){
        const dtoInstance = plainToClass(getEmailDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserByEmail(data.email);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }
        return existingUser;

    }
    async registerUser(data: RegisterDtoUser): Promise<UserResponseDto> {

        const dtoInstance = plainToClass(RegisterDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserByEmail(data.email);
        if (existingUser){
            throw new Error("Email já cadastrado.");
        }

        const newUser = await UserDao.registerUser(dtoInstance);

        return newUser;
    }

    async updateUser(id: string, data: Partial<UpdateDtoUser>): Promise<UserResponseDto>{

        const dtoInstance = plainToClass(UpdateDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserById(id);
        if (!existingUser){
            throw new Error("Usuário não encontrado.");
        }

        const updateUser = await UserDao.updateUser(id, dtoInstance);

        return updateUser;
    }

    async deleteUser(data: DeleteUserDto): Promise<void>{
        const dtoInstance = plainToClass(DeleteUserDto, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.deleteUser(data.id);
        if (!existingUser){
            throw new Error("Usuário não encontrado.");
        }

        await UserDao.deleteUser(data.id);
    }

    // async getUserTransactions(req: Request, res: Response): Promise<void> {
    //     const id = req.params.id;
    //     const transactions = await UserDao.getUserTransactions(id);
    //     res.json(transactions);
    // }
}

export default UserService;