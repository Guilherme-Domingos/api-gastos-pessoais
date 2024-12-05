import { IsString, IsNotEmpty, } from "class-validator";

export class getDtoUserId{
    @IsString()
    @IsNotEmpty()
    id: string;   
}

export class getDtoUserEmail{
    @IsString()
    @IsNotEmpty()
    email: string;   
}