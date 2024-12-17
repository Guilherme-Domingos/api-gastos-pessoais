import { IsString, IsNotEmpty, } from "class-validator";

export class GetIdDtoTransaction{
    @IsString()
    @IsNotEmpty()
    id: string;   
}