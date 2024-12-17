import { IsString, IsNotEmpty, } from "class-validator";

export class DeleteDtoUser{
    @IsString()
    @IsNotEmpty()
    id: string;   
}