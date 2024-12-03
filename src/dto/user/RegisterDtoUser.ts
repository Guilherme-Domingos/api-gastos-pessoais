
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

    @IsEmail()
    email: string;

    @IsString()
    telefone: string;

    @IsString()
    endereco: string;

    @IsString()
    senha: string;
    
}