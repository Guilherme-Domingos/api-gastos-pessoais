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
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("categoria", "date", "descricao", "id", "remetente", "tipo", "userId", "valor") SELECT "categoria", "date", "descricao", "id", "remetente", "tipo", "userId", "valor" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
