import { plainToClass } from "class-transformer";

import { validateOrReject } from "class-validator";

import { UserDao } from "../dao/UserDao";

import { RegisterDtoUser, UserResponseDto, UserListDto } from "../dto/user/RegisterDtoUser";
import { UpdateDtoUser } from "../dto/user/UpdateDtoUser";
import { DeleteDtoUser } from "../dto/user/DeleteDtoUser";
import { getEmailDtoUser } from "../dto/user/GetEmailDtoUser";
import { GetIdDtoUser } from "../dto/user/GetIdDtoUser";


class UserService{

    static async getAllUsers(): Promise<UserListDto[]>{
        const users = await UserDao.getAllUsers();
        return users.map((user) => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
        }));
    }

    static async getUserById(data: GetIdDtoUser){
        const dtoInstance = plainToClass(GetIdDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserById(data);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }
        return existingUser;
    }

    static async getUserByEmail(data: getEmailDtoUser){
        const dtoInstance = plainToClass(getEmailDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserByEmail(data);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }
        return existingUser;

    }
    static async registerUser(data: RegisterDtoUser): Promise<UserResponseDto> {

        const dtoInstance = plainToClass(RegisterDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserByEmail(data);
        if (existingUser){
            throw new Error("Email já cadastrado.");
        }

        const newUser = await UserDao.registerUser(dtoInstance);

        return newUser;
    }

    static async updateUser(id: GetIdDtoUser, data: Partial<UpdateDtoUser>): Promise<UserResponseDto>{

        const dtoInstance = plainToClass(UpdateDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserById(id);
        if (!existingUser){
            throw new Error("Usuário não encontrado.");
        }

        const updateUser = await UserDao.updateUser(id, dtoInstance);

        return updateUser;
    }

    static async deleteUser(data: DeleteDtoUser): Promise<void>{
        const dtoInstance = plainToClass(DeleteDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.deleteUser(data);
        if (!existingUser){
            throw new Error("Usuário não encontrado.");
        }

        await UserDao.deleteUser(data);
    }

    static async getUserTransactions(data: GetIdDtoUser) {
        const dtoInstance = plainToClass(GetIdDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserTransactions(data);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }
        return await UserDao.getUserTransactions(data)
        
    }

    static async getUserBalance(data: GetIdDtoUser) {
        const dtoInstance = plainToClass(GetIdDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserBalance(data);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }
        return await UserDao.getUserBalance(data)
        
    }
}

export default UserService;