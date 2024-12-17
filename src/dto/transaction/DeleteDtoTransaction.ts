import { IsString, IsNotEmpty, } from "class-validator";

export class DeleteDtoTransaction{
    @IsString()
    @IsNotEmpty()
    id: string;   
}