const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

sql.connect(config)
  .then(() => console.log("Conectado ao banco de dados!"))
  .catch(err => console.error("Erro ao conectar:", err));

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const emailCheck = await sql.query`SELECT * FROM Usuarios WHERE Email = ${email}`;
        if (emailCheck.recordset.length > 0) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        await sql.query`
            INSERT INTO Usuarios (Nome, Email, Senha)
            VALUES (${name}, ${email}, ${password})
        `;

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao cadastrar usuário", error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await sql.query`SELECT * FROM Usuarios WHERE Email = ${email} AND Senha = ${password}`;
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "E-mail ou senha inválidos!" });
        }
        
        res.json({ 
            message: "Login efetuado com sucesso!", 
            user: {
                id: result.recordset[0].Id,
                name: result.recordset[0].Nome,
                email: result.recordset[0].Email,
                isAdmin: result.recordset[0].IsAdmin,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Erro ao fazer login", error: err.message });
    }
});

app.post("/reset-password", async (req, res) => {
    const { email } = req.body;
    try {
        const result = await sql.query`SELECT * FROM Usuarios WHERE email = ${email}`;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "E-mail não encontrado!" });
        }

        // Aqui poderia ser enviada uma lógica de envio de e-mail real
        res.status(200).json({ message: "Um e-mail foi enviado com instruções para redefinir sua senha." });

    } catch (err) {
        res.status(500).json({ message: "Erro no servidor!", error: err.message });
    }
});

app.get('/barbeiros', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Barbeiros`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/servicos', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Servicos`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/agendamentos', async (req, res) => {
    try {
        // Criar conexão com o banco de dados
        const pool = await sql.connect(config);
        const request = pool.request();
        
        const result = await request.query(`
            SELECT Agendamentos.Id, Agendamentos.ClienteId, Usuarios.Nome AS ClienteNome, 
                   Agendamentos.BarbeiroId, Agendamentos.ServicoId, Agendamentos.Data, Agendamentos.Hora
            FROM Agendamentos
            JOIN Usuarios ON Agendamentos.ClienteId = Usuarios.Id
        `);

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error("Erro ao buscar agendamentos:", err); // Log do erro
        res.status(500).json({ message: "Erro ao buscar agendamentos", error: err.message });
    }
});

app.post('/agendamentos', async (req, res) => {
    const { clienteId, barbeiroId, servicoId, data, hora } = req.body;

    console.log("Recebendo requisição de agendamento:", req.body); // Debug
    
    try {
        if (!clienteId || !barbeiroId || !servicoId || !data || !hora) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        const formattedData = new Date(data).toISOString().split("T")[0]; // YYYY-MM-DD
        const pool = await sql.connect(config);

        // 🔍 Verificar se já existe um agendamento no mesmo dia, horário e barbeiro
        const checkAgendamento = await pool.request()
            .input('barbeiroId', sql.Int, barbeiroId)
            .input('data', sql.Date, formattedData)
            .input('hora', sql.VarChar, hora)
            .query(`
                SELECT * FROM Agendamentos 
                WHERE BarbeiroId = @barbeiroId 
                AND Data = @data 
                AND Hora = @hora
            `);

        if (checkAgendamento.recordset.length > 0) {
            return res.status(400).json({ message: "Este horário já está ocupado para este barbeiro!" });
        }

        // Buscar nome do cliente
        const clienteResult = await pool.request()
            .input('clienteId', sql.Int, clienteId)
            .query('SELECT Nome FROM Usuarios WHERE Id = @clienteId');

        if (clienteResult.recordset.length === 0) {
            return res.status(404).json({ message: "Cliente não encontrado!" });
        }

        const clienteNome = clienteResult.recordset[0].Nome;

        // Criar requisição no banco de dados
        const request = pool.request();
        request.input('clienteId', sql.Int, clienteId);
        request.input('clienteNome', sql.VarChar, clienteNome);
        request.input('barbeiroId', sql.Int, barbeiroId);
        request.input('servicoId', sql.Int, servicoId);
        request.input('data', sql.Date, formattedData);
        request.input('hora', sql.VarChar, hora);

        // Inserir o novo agendamento
        await request.query(`
            INSERT INTO Agendamentos (ClienteId, ClienteNome, BarbeiroId, ServicoId, Data, Hora)
            VALUES (@clienteId, @clienteNome, @barbeiroId, @servicoId, @data, @hora)
        `);

        // Retornar a lista atualizada de agendamentos
        const result = await pool.request().query(`
            SELECT ClienteId, ClienteNome, BarbeiroId, ServicoId, Data, Hora 
            FROM Agendamentos
        `);

        res.status(201).json(result.recordset);  // Retornar a lista completa de agendamentos (incluindo o novo)
    } catch (err) {
        console.error("Erro ao criar agendamento:", err); // Log do erro
        res.status(500).json({ message: "Erro ao criar agendamento", error: err.message });
    }
});

// Rota para excluir agendamento
app.delete('/agendamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Verificar se o agendamento existe antes de excluir
        const result = await sql.query`
            SELECT * FROM Agendamentos WHERE Id = ${id}`
        ;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Agendamento não encontrado!" });
        }

        // Criar conexão com o banco de dados
        const pool = await sql.connect(config);
        const request = pool.request();

        // Executar a exclusão do agendamento
        await request.query`DELETE FROM Agendamentos WHERE Id = ${id}`;
        res.status(200).json({ message: "Agendamento removido com sucesso!" })    
    } catch (err) {
        console.error("Erro ao excluir agendamento:", err);
        res.status(500).json({ message: "Erro ao excluir agendamento", error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});