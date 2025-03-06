import { useContext, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname
  const formPosition = useRef(null)
  const dateCurrent = new Date().toISOString().split("T"[0])[0];

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
    if(formData.data){
  }
  
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
    if (locationPath === "/homepage/edit") {
      setAgendamentos(agendamentos.map((item, i) =>
        i === formPosition.current ? {...item, ...novoAgendamento } : item
      ));
    } else {
      setAgendamentos([...agendamentos, novoAgendamento]);
    }

    // Resetar o formulário
    setFormData({
      barbeiro: "",
      servico: "",
      data: "",
      hora: "",
    });

    if(locationPath === "/homepage/edit"){
      toast.success("Agendamento atualizado com sucesso!");
      navigate("/homepage")
    }else{
      toast.success("Agendamento efetuado com sucesso!");
    }

  };

  const setPosition = (i)=>{
    
    if(i !== undefined) {
      setFormData({
        barbeiro: agendamentos[i].barbeiro,
        servico: agendamentos[i].servico,
        data: agendamentos[i].data,
        hora: agendamentos[i].hora
      })
      window.scrollTo(0, 0)
      formPosition.current = i
    }
  }

   // Função para excluir um agendamento
  const handleDelete = (index) => {
    const novosAgendamentos = agendamentos.filter((_, i) => i !== index);
    setAgendamentos(novosAgendamentos);
    toast.success("Agendamento removido com sucesso!");
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
          <h1>{locationPath === "/homepage/edit" ? "Editar" : "Agendar"}  procedimento </h1>  

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
                  <option>Sobrancelha</option>
                  <option>Corte + Barba</option>
                  <option>Corte + Barba + Sobrancelha</option>
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
              {locationPath === "/homepage/edit" ? "Editar" : "Agendar"} 
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
                  <th>Cliente</th> |
                  <th>Barbeiro</th> |
                  <th>Serviço</th> |
                  <th>Data do Corte</th> |
                  <th>Hora do Corte</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos?.map((agendamento, index) => (
                  <tr key={index}>
                    <td>{agendamento?.cliente}</td> |
                    <td>{agendamento?.barbeiro}</td> |
                    <td>{agendamento?.servico}</td> |
                    <td>{agendamento?.data}</td> |
                    <td>{agendamento?.hora}</td>
                    <td>       
                      
                      <button className="buttonEditHomePage" onClick={() => {setPosition(index); navigate("/homepage/edit"); }}>
                        Editar
                      </button>

                      <Trash2
                        className="iconDelete"
                        onClick={() => handleDelete(index)}
                        style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                      />
                      
                    </td>
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