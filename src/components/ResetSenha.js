import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ResetSenha = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    console.log(e)
    
    e.preventDefault();
    const sucess = login(email)
    if (sucess) {
      alert("E-mail com sucesso!");

    }
  };

  return (
    
    <form onSubmit={handleLogin}>
  
      <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />


      
      <button className="buttonLogin" type="submit">Enviar</button> 



      <Link className="linkHome" to="/">
          Página inicial
      </Link>
      
    </form>
  );
};

export default ResetSenha;

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