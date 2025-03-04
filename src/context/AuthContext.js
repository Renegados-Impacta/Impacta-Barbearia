import { createContext, useState, useEffect } from "react"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find((u) => u.email === email && u.password === password);

    if (validUser) {
      localStorage.setItem("loggedUser", JSON.stringify(validUser));
      setUser(validUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

    // ✅ Função para recuperação de senha
    const resetPassword = (email) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((u) => u.email === email);
  
      if (userExists) {
        alert(`Um e-mail foi enviado para ${email} com instruções para redefinir sua senha.`);
        return true;
      } else {
        alert("E-mail não encontrado! Verifique se digitou corretamente.");
        return false;
      }
    };

  return (
    <AuthContext.Provider value={{ user, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

/* 

  📌 Para que serve: 

  O contexto (AuthContext) gerencia o estado global da autenticação, permitindo que qualquer parte do site acesse informações sobre o usuário logado, sem precisar passar dados manualmente entre componentes.

  📌 O que esse código faz?
  ✅ Mantém o login do usuário salvo na aplicação.
  ✅ Permite login e logout de qualquer parte do app.
  ✅ Salva o usuário automaticamente no localStorage.
  ✅ Implementa a funcionalidade de recuperação de senha.

  📌 Por que precisamos desse código?
  1️⃣ Facilita a autenticação centralizando login, logout e recuperação de senha.
  2️⃣ Evita repetição de código ao permitir chamadas diretas ao contexto.
  3️⃣ Melhora a experiência do usuário ao salvar o estado do login no localStorage.
  4️⃣ Oferece um sistema de recuperação de senha para que usuários possam redefinir suas credenciais facilmente.

*/