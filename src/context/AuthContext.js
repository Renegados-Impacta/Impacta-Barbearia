import { createContext, useState, useEffect } from "react"; 
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        sessionStorage.setItem("loggedUser", JSON.stringify(data.user)); // Armazena temporariamente a sessão
        toast.success("Login efetuado com sucesso!");
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor!");
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("loggedUser");
    setUser(null);
    toast.success("Desconectado com sucesso! Até breve, volte sempre!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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