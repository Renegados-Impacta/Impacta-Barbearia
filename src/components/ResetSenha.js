import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ResetSenha = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    const success = resetPassword(email);
    if (success) {
      setEmail("");
    }
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

      <Link className="linkHome" to="/">Página inicial</Link>
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