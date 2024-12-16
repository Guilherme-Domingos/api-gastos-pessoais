import { IsString, IsNotEmpty, } from "class-validator";

export class GetIdDtoUser{
    @IsString()
    @IsNotEmpty()
    id: string;   
}