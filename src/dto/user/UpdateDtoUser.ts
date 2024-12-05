import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class UpdateDtoUser{
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nome: string;
    
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    telefone: string;

    @IsOptional()
    @IsString()
    endereco: string;

    @IsOptional()
    @IsString()
    senha: string;
    
}