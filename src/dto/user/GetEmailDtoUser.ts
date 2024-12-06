import { IsString, IsNotEmpty, } from "class-validator";

export class getEmailDtoUser{
    @IsString()
    @IsNotEmpty()
    email: string;   
}