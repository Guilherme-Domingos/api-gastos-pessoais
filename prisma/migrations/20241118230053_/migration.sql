/*
  Warnings:

  - You are about to drop the column `data` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `date` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "remetente" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("categoria", "descricao", "id", "remetente", "tipo", "userId", "valor") SELECT "categoria", "descricao", "id", "remetente", "tipo", "userId", "valor" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
