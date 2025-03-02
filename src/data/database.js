// database.js
const Database = require('better-sqlite3');

// Conecta ao banco de dados (ou cria se não existir)
const db = new Database('./database/barbearia.db');

// Cria a tabela de usuários (se não existir)
db.exec(
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
);

// Cria a tabela de agendamentos (se não existir)
db.exec(
  CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    barbeiro TEXT NOT NULL,
    servico TEXT NOT NULL,
    data TEXT NOT NULL,
    hora TEXT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES users(id)
  );
);

module.exports = db; 