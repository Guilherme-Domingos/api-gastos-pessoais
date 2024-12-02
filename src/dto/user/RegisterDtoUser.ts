
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

export type UserListDto = {
    id: string,
    nome: string,
    email: string 
}

export class RegisterDtoUser{
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsOptional() 
    @IsString()
    endereco?: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
    
}