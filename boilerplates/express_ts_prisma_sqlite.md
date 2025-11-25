# 🚀 Boilerplate Backend: Express, TypeScript e Prisma (SQLite)

Este é um boilerplate inicial para um projeto backend moderno, combinando a robustez do **Express**, a tipagem forte do **TypeScript** e o poder do ORM **Prisma**, configurado para usar **SQLite** (ideal para desenvolvimento rápido).

## 🛠️ Comandos de Configuração e Instalação

Siga os passos abaixo em seu terminal para configurar o projeto do zero.

### 1. Configuração Inicial e Estrutura

Crie o diretório do projeto e inicialize o Node.js.

# Cria e acessa o diretório
mkdir meu-backend-ts
cd meu-backend-ts

# Inicializa o projeto Node.js
npm init -y

# Cria a estrutura básica de código-fonte
mkdir src
touch src/index.ts

# Dependências de Produção
npm install express @prisma/client

# Dependências de Desenvolvimento
npm install --save-dev typescript @types/node @types/express prisma nodemon ts-node
# Gera arquivo de config do typescript
npx tsc --init

# Inicializa o Prisma e configura o 'schema.prisma' para usar SQLite
npx prisma init --datasource-provider sqlite

# Aplica a primeira migração (cria o arquivo dev.db e as tabelas)
# Gera o Prisma Client, fornecendo a tipagem para o seu código
npx prisma migrate dev --name init
# lembrar de mandar o .env pois só tem o caminho pro sqlite.dev

#usar o dev pois tem o nodemon pra interpretar o typescript sem problemas
// package.json (seção "scripts")
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon --exec ts-node src/index.ts" 
}
