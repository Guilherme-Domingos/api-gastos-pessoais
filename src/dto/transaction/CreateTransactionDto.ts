import 'reflect-metadata';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  remetente: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  // Construtor não é necessário, mas se quiser pode inicializar assim:
  constructor(date: string, remetente: string, categoria: string, valor: number, descricao: string, tipo: string, userId: string) {
    this.date = date;
    this.remetente = remetente;
    this.categoria = categoria;
    this.valor = valor;
    this.descricao = descricao;
    this.tipo = tipo;
    this.userId = userId;
  }
}
