import { UserDao } from "../dao/UserDao";
import { UserListDto, RegisterDtoUser } from "../dto/user/RegisterDtoUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export class UserService {
    private userDao: UserDao;

    private constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    public static build(){
        return new UserService(new UserDao())
    }

    public async save(userDto: RegisterDtoUser): Promise<string>{
        const user = await prisma.user.create({
            data: {
                nome: userDto.nome,
                email: userDto.email,
                telefone: userDto.telefone,
                endereco: userDto.endereco,
                senha: userDto.senha
            },
        });
        return user.id;
    }

    public async list(): Promise<void>{
        const users = await prisma.user.findMany();
        return users; 
        
    }
    
    public async search(email: string): Promise<null>{
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw new Error(`Erro ao buscar usuário por ID: `);
        }
    }
}