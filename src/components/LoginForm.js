import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const sucess = login(email, password)
    if (sucess) {
      alert("Login Efetuado com sucesso!")
      navigate("/homepage");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  return (


    
    <form onSubmit={handleLogin}>
      
      <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} required />

      <Link className="LinkLogin" to="/redefinirSenha"> 
        Esqueceu a senha?
      </Link> 
      
      <button className="buttonLogin" type="submit">Entrar</button>
      
      <hr className="linhaLogin"/>

      <span>
         
        Ainda não tem uma conta? 
        <Link className="LinkLogin" to="/register"> 
          Cadastre-se 
        </Link> 
        
      </span>

      <Link className="linkHome" to="/">
          Página inicial
      </Link>
      
    </form>
  );
};

export default LoginForm;

/*

  📌 O que esse código faz?
  O LoginForm permite que um usuário faça login fornecendo e-mail e senha.
  ✅ Verifica se o e-mail e a senha estão corretos.
  ✅ Salva o usuário logado no AuthContext.
  ✅ Redireciona o usuário para a página principal após o login.

  📌 Por que precisamos desse código?
  1️⃣ Permite que o usuário entre no sistema com e-mail e senha.
  2️⃣ Verifica se o e-mail e a senha estão corretos antes de fazer o login.
  3️⃣ Usa o AuthContext para armazenar o usuário logado.
  4️⃣ Redireciona o usuário para a página principal após o login.
  
*/