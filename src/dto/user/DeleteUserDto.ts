import { IsString, IsNotEmpty, } from "class-validator";

export class DeleteUserDto{
    @IsString()
    @IsNotEmpty()
    id: string;   
}