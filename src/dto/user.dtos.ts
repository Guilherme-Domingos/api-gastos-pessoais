// import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";


// export class registerDtoUser{
//     @IsString()
//     @IsNotEmpty()
//     nome: string;

//     @IsString()
//     @IsEmail()
//     @IsNotEmpty()
//     email: string;

//     @IsString()
//     @IsNotEmpty()
//     telefone:    string;

//     @IsOptional() 
//     @IsString()
//     endereco?:    string;

//     @IsString()
//     @IsNotEmpty()
//     senha:      string;

//     @IsNotEmpty()
//     saldo:       number; 
    
//     constructor( nome: string, email: string, telefone: string, endereco?: string, senha: string, saldo: number ){
//         this.nome = nome,
//         this.email = email,
//         this.telefone = telefone,
//         this.endereco = endereco,
//         this.senha = senha,
//         this.saldo = saldo
//     }

// }