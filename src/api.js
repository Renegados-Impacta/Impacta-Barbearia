// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

// Função para registrar um usuário
const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Função para realizar o login
const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Função para agendar um serviço
const agendarServico = async (agendamentoData) => {
  try {
    const response = await api.post('/agendar', agendamentoData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Função para listar agendamentos
const listarAgendamentos = async () => {
  try {
    const response = await api.get('/agendamentos');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, password };
      const response = await registerUser(userData);
      alert(response.message); // Exibe mensagem de sucesso
    } catch (error) {
      alert(error.message || 'Erro ao registrar usuário'); // Exibe mensagem de erro
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      alert(response.message); // Exibe mensagem de sucesso
    } catch (error) {
      alert(error.message || 'E-mail ou senha inválidos'); // Exibe mensagem de erro
    }
  };

  const handleAgendar = async (e) => {
    e.preventDefault();
    try {
      const agendamentoData = {
        cliente_id: 1, // ID do usuário logado
        barbeiro: 'Victor',
        servico: 'Corte + Barba',
        data: '2023-10-15',
        hora: '14:00',
      };
      const response = await agendarServico(agendamentoData);
      alert(response.message); // Exibe mensagem de sucesso
    } catch (error) {
      alert(error.message || 'Erro ao agendar serviço'); // Exibe mensagem de erro
    }
  };

  const handleListarAgendamentos = async () => {
    try {
      const response = await listarAgendamentos();
      setAgendamentos(response);
    } catch (error) {
      alert(error.message || 'Erro ao carregar agendamentos');
    }
  };

  return (
    <div>
      <h1>Minha Aplicação</h1>

      <form onSubmit={handleRegister}>
        <h2>Registrar Usuário</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      <form onSubmit={handleAgendar}>
        <h2>Agendar Serviço</h2>
        <button type="submit">Agendar</button>
      </form>

      <div>
        <h2>Agendamentos</h2>
        <button onClick={handleListarAgendamentos}>Carregar Agendamentos</button>
        <ul>
          {agendamentos.map((agendamento) => (
            <li key={agendamento.id}>
              {agendamento.cliente} - {agendamento.barbeiro} - {agendamento.servico} - {agendamento.data} - {agendamento.hora}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;