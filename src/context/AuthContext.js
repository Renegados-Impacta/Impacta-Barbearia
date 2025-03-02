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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* Para que serve: 

  O contexto (AuthContext) serve para gerenciar o estado global da autenticação. Assim, qualquer parte do app pode verificar se o usuário está logado, sem precisar passar dados manualmente de um componente para outro.

  Sem o contexto, cada componente precisaria gerenciar a autenticação separadamente, tornando o código mais difícil de manter.

  📌 Por que precisamos desse código:
  1️⃣ Mantém o login em toda a aplicação

  Sem ele, precisaríamos passar user, login e logout como props para todos os componentes.
  Isso deixaria o código bagunçado e difícil de manter.
  
  2️⃣ Facilita o login e logout

  Podemos chamar login(email, password) e logout() de qualquer lugar do app.
  Não precisamos repetir código em vários componentes.
  
  3️⃣ Salva o usuário automaticamente

  Se o usuário fechar o navegador e abrir de novo, ele continua logado.
  O useEffect recupera o usuário do localStorage automaticamente.

*/