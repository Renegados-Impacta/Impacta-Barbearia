// server.js
const express = require('express');
const { registerUser, loginUser, agendarServico, listarAgendamentos } = require('./dbOperations');
const app = express();
app.use(express.json()); // Para processar JSON no corpo das requisições

// Rota para registro de usuário
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userId = registerUser(name, email, password);
    res.status(201).json({ message: 'Cadastro realizado!', userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para login de usuário
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const user = loginUser(email, password);
    res.status(200).json({ message: 'Login realizado!', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Rota para agendar serviço
app.post('/agendar', (req, res) => {
  const { cliente_id, barbeiro, servico, data, hora } = req.body;
  try {
    const agendamentoId = agendarServico(cliente_id, barbeiro, servico, data, hora);
    res.status(201).json({ message: 'Agendamento realizado!', agendamentoId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar agendamentos
app.get('/agendamentos', (req, res) => {
  try {
    const agendamentos = listarAgendamentos();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});