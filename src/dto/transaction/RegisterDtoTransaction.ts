import { IsString, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export type TransactionListDto = {
    id: string;
    date: Date;
    remetente: string;
    valor: number;
    tipo: 'Receita' | 'Despesa';
}

export class TransactionResponseDto{
    id: string
    date: Date
    remetente: string
    categoria: string
    valor: number
    tipo: string
}

export type UserBalance = {
    id:string;
    remetente: string;
    valor: number;
}

export class RegisterDtoTransaction {
    @IsDateString()
    date: string; 

    @IsString()
    remetente: string;

    @IsString()
    categoria: string;

    @IsNumber()
    valor: number;

    @IsOptional()  
    @IsString()
    descricao?: string;

    @IsEnum(['Receita', 'Despesa'], {message:"Deve ser escrito conforme mostrado 'Receita' ou 'Despesa' "})
    tipo: 'Receita' | 'Despesa';

    @IsString()
    userId: string;

}

