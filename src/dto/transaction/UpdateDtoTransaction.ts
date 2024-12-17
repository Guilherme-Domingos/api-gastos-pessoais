import { IsString, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class UpdateDtoTransaction {
    @IsOptional()
    @IsDateString()
    date: string; 

    @IsOptional()
    @IsString()
    remetente: string;

    @IsOptional()
    @IsString()
    categoria: string;

    @IsOptional()
    @IsNumber()
    valor: number;

    @IsOptional()  
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsEnum(['Receita', 'Despesa'], {message:"Deve ser escrito conforme mostrado 'Receita' ou 'Despesa' "})
    tipo: 'Receita' | 'Despesa';

    @IsOptional()
    @IsString()
    userId: string;

}