import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      toast.info("E-mail já cadastrado!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <form onSubmit={handleRegister}>
      
      <input type="text" placeholder=" Digite o nome de usuário" onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder=" Digite um e-mail" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder=" Digite uma senha" onChange={(e) => setPassword(e.target.value)} required />
      <button className="ButtonRegister" type="submit">Cadastrar</button>

      <hr className="linhaRegister"/>
      
      <span> 
        Já possui uma conta? Faça o seu
        <Link className="linkRegister" to="/login"> 
          login
        </Link>
      </span>
     
      <Link className="linkHome" to="/"> 
          Página inicial
      </Link>
     
    </form>

  );
};

export default RegisterForm;

/*

    📌 O que esse código faz?
    O RegisterForm permite que um usuário se cadastre fornecendo e-mail e senha.
    ✅ Verifica se o e-mail já existe.
    ✅ Salva o usuário no localStorage.
    ✅ Redireciona para a tela de login após o cadastro.

    📌 Por que precisamos desse código?
    1️⃣ Permite que novos usuários sejam cadastrados.
    2️⃣ Garante que e-mails duplicados não sejam cadastrados.
    3️⃣ Salva os usuários no localStorage para login posterior.
    4️⃣ Redireciona o usuário para o login após o cadastro.

*/