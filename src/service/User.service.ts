import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

import { UserDao } from "../dao/UserDao";
import { getDtoUserId, getDtoUserEmail } from "../dto/user/UserDto"
import { RegisterDtoUser, UserResponseDto, UserListDto } from "../dto/user/RegisterDtoUser";
import { UpdateDtoUser } from "../dto/user/UpdateDtoUser";
import { DeleteUserDto } from "../dto/user/DeleteUserDto";



class UserService{

    async getAllUsers(): Promise<UserListDto[]>{
        const users = await UserDao.getAllUsers();
        return users.map((user) => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
        }));
    }

    async getUserById(data: getDtoUserId){
        const dtoInstance = plainToClass(getDtoUserId, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserById(data.id);
        if (existingUser) {
            throw new Error("Email já cadastrado.");
        }
        return existingUser;
    }

    async getUserByEmail(data: getDtoUserEmail){
        const dtoInstance = plainToClass(getDtoUserEmail, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserByEmail(data.email);
        if (existingUser) {
            throw new Error("Email já cadastrado.");
        }
        return existingUser;

    }
    async registerUser(data: RegisterDtoUser): Promise<UserResponseDto> {
        const dtoInstance = plainToClass(RegisterDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.registerUser(data);
        if (existingUser){
            throw new Error("Email já cadastrado.");
        }

        const newUser = await UserDao.registerUser({
            nome: data.nome,
            email: data.email,
            endereco: data.endereco,
            senha: data.senha,
            telefone: data.telefone,

        });

        return newUser
    }

    async updateUser(id: string, data: Partial<UpdateDtoUser>): Promise<UserResponseDto>{
        const dtoInstance = plainToClass(UpdateDtoUser, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.getUserById(id);
        if (existingUser){
            throw new Error("Usuário não encontrado.");
        }

        const updateUser = await UserDao.updateUser(id, data);
        return updateUser;
    }

    async deleteUser(data: DeleteUserDto): Promise<void>{
        const dtoInstance = plainToClass(DeleteUserDto, data);
        await validateOrReject(dtoInstance);

        const existingUser = await UserDao.deleteUser(data.id);
        if (existingUser){
            throw new Error("Usuário não encontrado.");
        }

        await UserDao.deleteUser(data.id);
    }
}

export default UserService;