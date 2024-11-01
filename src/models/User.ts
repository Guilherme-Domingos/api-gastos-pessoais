import { UUID } from "crypto";

export interface User{
    id: UUID,
    nome: string,
    email:  string,
    senha: string
}

export interface  Transacao{
    data: Date,
    rementente: string,
    categoria:  string,
    valor:  number,
    descricao: string,
    tipo: string

}

