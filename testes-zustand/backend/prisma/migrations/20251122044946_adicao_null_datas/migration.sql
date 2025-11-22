-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "criadoQuando" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "atualizadoQuando" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Usuario" ("atualizadoQuando", "criadoQuando", "email", "id", "nome", "senha", "telefone") SELECT "atualizadoQuando", "criadoQuando", "email", "id", "nome", "senha", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
