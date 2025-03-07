// const express = require('express');
// const sql = require('mssql');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const config = {
//     user: 'DAVI',
//     password: '123',
//     server: 'localhost', // ou o endereço do seu servidor SQL
//     database: 'Barbearia',
//     options: {
//         encrypt: false,
//         trustServerCertificate: true, // Para evitar problemas com certificado SSL
//     }
// };

// // Testando conexão ao iniciar o servidor
// sql.connect(config)
//   .then(() => console.log("Conectado ao banco de dados!"))
//   .catch(err => console.error("Erro ao conectar:", err));

// app.get('/agendamentos', async (req, res) => {
//     try {
//         await sql.connect(config);
//         const result = await sql.query`SELECT * FROM Agendamentos`
//         res.json(result.recordset)
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// // Rota para criar um agendamento
// app.post('/agendamentos', async (req, res) => {
//     const { clienteId, barbeiroId, servicoId, data, hora } = req.body;
//     try {
//         const request = new sql.Request();
//         request.input('clienteId', sql.Int, clienteId);
//         request.input('barbeiroId', sql.Int, barbeiroId);
//         request.input('servicoId', sql.Int, servicoId);
//         request.input('data', sql.Date, data);
//         request.input('hora', sql.Time, hora);

//         await request.query(`
//             INSERT INTO Agendamentos (ClienteId, BarbeiroId, ServicoId, Data, Hora)
//             VALUES (@clienteId, @barbeiroId, @servicoId, @data, @hora)
//         `);

//         res.status(201).send('Agendamento criado com sucesso!');
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });


// // Rota para excluir um agendamento
// app.delete('/agendamentos/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await sql.connect(config);
//         await sql.query`DELETE FROM Agendamentos WHERE Id = ${id}`;
//         res.send("Agendamento removido com sucesso!");
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });

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

        res.json({ message: "Login efetuado com sucesso!", user: result.recordset[0] });
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

app.get('/agendamentos', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Agendamentos`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
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

app.post('/agendamentos', async (req, res) => {
    const { clienteId, barbeiroId, servicoId, data, hora } = req.body;
    try {
        const request = new sql.Request();
        request.input('clienteId', sql.Int, clienteId);
        request.input('barbeiroId', sql.Int, barbeiroId);
        request.input('servicoId', sql.Int, servicoId);
        request.input('data', sql.Date, data);
        request.input('hora', sql.Time, hora);

        await request.query(`
            INSERT INTO Agendamentos (ClienteId, BarbeiroId, ServicoId, Data, Hora)
            VALUES (@clienteId, @barbeiroId, @servicoId, @data, @hora)
        `);

        res.status(201).send('Agendamento criado com sucesso!');
    } catch (err) {
        res.status(500).send({ message: "Erro ao criar agendamento", error: err.message });
    }
});

app.delete('/agendamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM Agendamentos WHERE Id = ${id}`;
        res.send("Agendamento removido com sucesso!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});