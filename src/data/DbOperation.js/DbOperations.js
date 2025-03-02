// dbOperations.js
const db = require('./database'); // Importa a conexão com o banco de dados

// Função para registrar um novo usuário
function registerUser(name, email, password) {
  // Verifica se o e-mail já está cadastrado
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (user) {
    throw new Error('E-mail já cadastrado!');
  }

  // Insere o novo usuário no banco de dados
  const result = db
    .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
    .run(name, email, password);

  return result.lastInsertRowid; // Retorna o ID do usuário cadastrado
}

// Função para realizar o login
function loginUser(email, password) {
  // Busca o usuário pelo e-mail
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || user.password !== password) {
    throw new Error('E-mail ou senha inválidos!');
  }

  return user; // Retorna os dados do usuário
}

// Função para agendar um serviço
function agendarServico(cliente_id, barbeiro, servico, data, hora) {
  // Insere o agendamento no banco de dados
  const result = db
    .prepare(
      'INSERT INTO agendamentos (cliente_id, barbeiro, servico, data, hora) VALUES (?, ?, ?, ?, ?)'
    )
    .run(cliente_id, barbeiro, servico, data, hora);

  return result.lastInsertRowid; // Retorna o ID do agendamento
}

// Função para listar agendamentos
function listarAgendamentos() {
  // Consulta os agendamentos com JOIN na tabela de usuários
  const agendamentos = db
    .prepare(
      
      SELECT u.name AS cliente, a.barbeiro, a.servico, a.data, a.hora
      FROM agendamentos a
      JOIN users u ON a.cliente_id = u.id
      
    )
    .all();

  return agendamentos; // Retorna a lista de agendamentos
}

// Exporta as funções para uso em outros arquivos
module.exports = {
  registerUser,
  loginUser,
  agendarServico,
  listarAgendamentos,
};