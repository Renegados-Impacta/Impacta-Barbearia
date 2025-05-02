import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Admin = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [barbeiros, setBarbeiros] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);

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
        
        <main className="mainAdmin">

            <header className="headerAdmin">
                <img src="/BarbeariaLogo2.png" alt="Logo" width={100} />
                <h2 className="conteudoHomePage">
                  {user ? `Seja bem-vindo, ${user.name}` : ""}
                </h2>

                <button className="buttonHomePage" onClick={() => { logout(); navigate("/"); }} > Sair </button>
            </header>

            {/* Lista de Clientes Agendados */}
            <div className="formAdmin">

                <div className="ContainerAdmin">

                    <h1>Lista de clientes agendados</h1>
                    
                    <div className="ContentTableAdmin">

                        <table className="tableAdmin">
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
                                <td>
                                    <Trash2
                                    className="iconDelete"
                                    onClick={() => handleDelete(agendamento.Id)}
                                    style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                                    />
                                </td>
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

export default Admin;