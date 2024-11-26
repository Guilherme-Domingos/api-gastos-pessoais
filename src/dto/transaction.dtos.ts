import { IsString, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class RegisterDtoTransaction {
  @IsDateString()
  date: string;  // Caso seja uma string no formato de data (ISO 8601)

  @IsString()
  remetente: string;

  @IsString()
  categoria: string;

  @IsNumber()
  valor: number;

  @IsOptional()  
  @IsString()
  descricao?: string;

  @IsEnum(['Receita', 'Despesa'])  
  tipo: 'Receita' | 'Despesa';

  @IsString()
  userId: string;

  // Construtor: agora tipo e descricao são tratados corretamente
  constructor(remetente: string, categoria: string, valor: number, tipo: 'Receita' | 'Despesa', userId: string, date?: string, descricao?: string
  ) {
    this.date = date || '';  
    this.remetente = remetente;
    this.categoria = categoria;
    this.valor = valor;
    this.tipo = tipo;  
    this.userId = userId;
    this.descricao = descricao;  
  }
}

//////OUU

export interface RegisterDtoTransaction {
    date: string;  
    remetente: string;
    categoria: string;
    valor: number;
    descricao?: string;
    tipo: 'Receita' | 'Despesa';
    userId: string;
}