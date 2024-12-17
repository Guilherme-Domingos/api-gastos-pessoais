import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export type UserListDto = {
    id: string,
    nome: string,
    email: string,
    telefone: string
}

export class UserResponseDto{
    id: string
    nome: string
    email: string
    telefone: string
    endereco: string | null
}

export class RegisterDtoUser{
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    telefone: string;

    @IsOptional()
    @IsString()
    endereco?: string;

    @IsString()
    senha: string;
    
}