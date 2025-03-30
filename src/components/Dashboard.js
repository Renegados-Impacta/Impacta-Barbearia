import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from 'axios';

// 📌 Função para formatar data no formato dd/mm/aaaa
const formatarData = (dataISO) => {
  if (!dataISO) return ""; // Evita erro caso a data seja undefined
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

// 📌 Função para formatar hora no formato HH:mm
const formatarHora = (horaISO) => {
  if (!horaISO) return ""; // Evita erro caso a hora seja undefined
  const hora = new Date(horaISO);
  return hora.toLocaleTimeString("pt-BR", { 
    hour: "2-digit", 
    minute: "2-digit", 
    timeZone: "UTC" 
  });
};

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dateCurrent = new Date().toISOString().split("T")[0];
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]); // Estado para armazenar os agendamentos

  // Estado para capturar os valores do formulário
  const [formData, setFormData] = useState({
    barbeiro: "",
    servico: "",
    data: "",
    hora: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barbeirosResponse = await axios.get("http://localhost:5000/barbeiros");
        setBarbeiros(barbeirosResponse.data);  // Aqui salvamos os barbeiros
  
        const servicosResponse = await axios.get("http://localhost:5000/servicos");
        setServicos(servicosResponse.data);  // Aqui salvamos os serviços
      } catch (error) {
        console.error("Erro ao buscar barbeiros e serviços:", error);
        toast.error("Erro ao carregar dados.");
      }
    };
  
    fetchData();
  }, []);

  // Isso garante que, ao abrir a página, a lista de agendamentos seja carregada do banco de dados.
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/agendamentos");
        console.log("Agendamentos carregados:", response.data); // Verifique se a resposta é correta
        setAgendamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        toast.error("Erro ao carregar agendamentos.");
      }
    };

    fetchAgendamentos();
  }, []);

  if (!user) {
    navigate("/"); // Se o usuário não estiver logado, redireciona para a página de login
    return null;
  }

  // Função para capturar as mudanças no formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();    

    // Criar um novo agendamento com os dados do formulário + clienteId (do usuário logado)
    const novoAgendamento = {
      clienteId: user.id,  // Usando o ID do usuário logado
      barbeiroId: formData.barbeiro,
      servicoId: formData.servico,
      data: formData.data,
      hora: formData.hora,
    };

    try {
      const response = await fetch('http://localhost:5000/agendamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAgendamento),
      });

      if (response.ok) {
        toast.success("Agendamento criado com sucesso!");

        // Agora, recupere a lista atualizada de agendamentos
        const agendamentosResponse = await fetch('http://localhost:5000/agendamentos');
        if (agendamentosResponse.ok) {
          const agendamentosData = await agendamentosResponse.json();

          // Atualize o estado com a nova lista de agendamentos
          setAgendamentos(agendamentosData);
        } else {
          toast.error("Erro ao carregar os agendamentos.");
        }

      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Erro ao criar agendamento.");
      }

    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento.");
    }
    
    // Resetar o formulário
    setFormData({
      barbeiro: "",
      servico: "",
      data: "",
      hora: "",
    });
  };

  // Função para excluir um agendamento
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/agendamentos/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          toast.success("Agendamento removido com sucesso!");

          // Atualizar a lista de agendamentos sem recarregar a página
          setAgendamentos(agendamentos.filter(agendamento => agendamento.Id !== id));
      } else {
          toast.error("Erro ao excluir agendamento.");
      }
    } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        toast.error("Erro ao excluir agendamento.");
    }
  };

  return (
    <main className="mainHomePage">
      <header className="headerHomePage">
        <img src="/BarbeariaLogo2.png" alt="Logo" width={100} />
        <h2 className="conteudoHomePage">Seja bem-vindo, {user.name}</h2>
        <button className="productsHomePage" onClick={() => navigate("/produtos")}>
          Produtos
        </button>
        <button className="buttonHomePage" onClick={() => { logout(); navigate("/"); }} >
          Sair
        </button>
      </header>

      <div className="formHomePage">
        <div className="contentHomePage">
          <h1> Agendar procedimento </h1>  

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
                  <option value="" disabled>Selecione um barbeiro</option>
                  {barbeiros.map((barbeiro) => (
                    <option key={barbeiro.Id} value={barbeiro.Id}>
                      {barbeiro.Nome}
                    </option>
                  ))}
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
                  <option value="" disabled>Selecione um serviço</option>
                  {servicos.map((servico) => (
                    <option key={servico.Id} value={servico.Id}>
                      {servico.Nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-wrap">
              <h3>Data do Corte</h3>
              <div className="input-container">
                <input
                  type="date"
                  name="data"
                  min={dateCurrent}
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
                  step="60"
                  min="08:00"
                  max="20:00"
                />
              </div>
            </div>

            <button  type="submit" className="buttonFormHomePage">
              Agendar 
            </button>
          </form>
        </div>
      </div>

      {/* Lista de Clientes Agendados */}
      <div className="formHomePage_2">
        <div className="ContainerHomePage">
          <h1>Lista de clientes agendados</h1>
          <div className="ContentTable">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Barbeiro</th>
                  <th>Serviço</th>
                  <th>Data do Corte</th>
                  <th>Hora do Corte</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos?.map((agendamento, index) => (
                  <tr key={index}>
                    <td>{agendamento?.ClienteNome}</td>  {/* Mostrar Nome do Cliente */}
                    <td>{barbeiros.find(b => b.Id === agendamento.BarbeiroId)?.Nome || "Desconhecido"}</td>
                    <td>{servicos.find(s => s.Id === agendamento.ServicoId)?.Nome || "Desconhecido"}</td>
                    <td>{formatarData(agendamento.Data)}</td> {/* Formata a data corretamente */}
                    <td>{formatarHora(agendamento.Hora)}</td> {/* Formata a hora corretamente */}
                    {agendamento.ClienteId === user.id && (
                      <td>
                        <Trash2
                          className="iconDelete"
                          onClick={() => handleDelete(agendamento.Id)}
                          style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;