/*
  Warnings:

  - Added the required column `saldo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT,
    "senha" TEXT NOT NULL,
    "saldo" REAL NOT NULL
);
INSERT INTO "new_User" ("email", "endereco", "id", "nome", "senha", "telefone") SELECT "email", "endereco", "id", "nome", "senha", "telefone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
