import { IsString, IsNotEmpty, } from "class-validator";

export class getIdDtoUser{
    @IsString()
    @IsNotEmpty()
    id: string;   
}