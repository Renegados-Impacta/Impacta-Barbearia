import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ResetSenha = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erro ao tentar redefinir a senha!");
    }

    setEmail("");
  };

  return (
    <form onSubmit={handleReset}>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <button className="buttonLogin" type="submit">Enviar</button> 

      <Link className="linkHome" to="/login">Página de Login</Link>
    </form>
  );
};

export default ResetSenha;

/*

  📌 O que esse código faz?
  O ResetSenha permite que um usuário solicite a recuperação de senha informando seu e-mail.
  ✅ Verifica se o e-mail informado existe no sistema.
  ✅ Chama a função resetPassword do AuthContext para processar a recuperação.
  ✅ Se o e-mail for encontrado, exibe um alerta e limpa o campo de entrada.

  📌 Por que precisamos desse código?
  1️⃣ Permite que os usuários recuperem suas senhas caso as esqueçam.
  2️⃣ Garante que apenas e-mails cadastrados possam solicitar a recuperação.
  3️⃣ Melhora a experiência do usuário limpando o campo de e-mail após o envio.
  4️⃣ Redireciona o usuário para a página principal caso queira.
  
*/