# api-gastos-pessoais
Aprendendo a fazer uma api NodeJs com Typescript

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id       String  @id @default(cuid())
  nome     String
  email    String  @unique
  telefone String
  endereco String?
  senha    String
}

model Transaction {
  id        String   @id @default(uuid())
  data      DateTime
  remetente String
  categoria String
  valor     Float
  descricao String
  tipo      String
}