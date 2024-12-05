import { IsString, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export type TransactionListDtio = {
    date: string;
    remetente: string;
    categoria: string;
    valor: number;
    descricao?: string;
    tipo: 'Receita' | 'Despesa';
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

}

