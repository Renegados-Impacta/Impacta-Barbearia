import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estado para armazenar os agendamentos
  const [agendamentos, setAgendamentos] = useState([]);

  // Estado para capturar os valores do formulário
  const [formData, setFormData] = useState({
    barbeiro: "",
    servico: "",
    data: "",
    hora: "",
  });

  if (!user) {
    navigate("/");
    return null;
  }

  // Função para capturar as mudanças no formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Criar um novo agendamento com os dados do formulário + nome do usuário
    const novoAgendamento = {
      cliente: user.name, // Nome do usuário logado
      ...formData,
    };

    // Atualizar a lista de agendamentos
    setAgendamentos([...agendamentos, novoAgendamento]);

    // Resetar o formulário
    setFormData({
      barbeiro: "",
      servico: "",
      data: "",
      hora: "",
    });
  };

  return (
    <main className="mainHomePage">
      <header className="headerHomePage">
        <img src="/BarbeariaLogo2.png" alt="Logo" width={100} />
        <h2 className="conteudoHomePage">Seja bem-vindo, {user.name}</h2>
        <button className="productsHomePage" onClick={() => navigate("/produtos")}>
          Produtos
        </button>
        <button className="buttonHomePage" onClick={() => { logout(); navigate("/"); }}>
          Sair
        </button>
      </header>

      <div className="formHomePage">
        <div className="contentHomePage">
          <h1>Agendar Corte</h1>

          <form className="cadastrarHomePage" onSubmit={handleSubmit}>
            <div className="sign-up">
              <div>
                <h3>Barbeiros</h3>
                <select
                  className="selectorHomePage"
                  name="barbeiro"
                  value={formData.barbeiro}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option>Victor</option>
                  <option>Matheus</option>
                  <option>Gustavo</option>
                </select>
              </div>

              <div>
                <h3>Serviços</h3>
                <select
                  className="selectorHomePage"
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option>Corte</option>
                  <option>Barba</option>
                  <option>Sombrancelha</option>
                  <option>Corte + Barba</option>
                  <option>Corte + Barba + Sombrancelha</option>
                  <option>Tintura</option>
                  <option>Luzes</option>
                </select>
              </div>
            </div>

            <div className="field-wrap">
              <h3>Data do Corte</h3>
              <div className="input-container">
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  required
                />
              </div>

              <h3>Hora do Corte</h3>
              <div className="input-container">
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  required
                  step={3600}
                  min="08:00"
                  max="20:00"
                />
              </div>
            </div>

            <button type="submit" className="buttonFormHomePage">
              Agendar
            </button>
          </form>
        </div>
      </div>

      {/* Lista de Clientes Agendados */}
      <div className="formHomePage_2">
        <div className="ContainerHomePage">
          <h1>Lista de Clientes Agendados</h1>
          <div className="ContentTable">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th> |
                  <th>Barbeiro</th> |
                  <th>Serviço</th> |
                  <th>Data do Corte</th> |
                  <th>Hora do Corte</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.map((agendamento, index) => (
                  <tr key={index}>
                    <td>{agendamento.cliente}</td> |
                    <td>{agendamento.barbeiro}</td> |
                    <td>{agendamento.servico}</td> |
                    <td>{agendamento.data}</td> |
                    <td>{agendamento.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="linhaTable"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;