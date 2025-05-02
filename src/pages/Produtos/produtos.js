import useFetchProducts from "../../hooks/useFetchProducts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "./produtos.css";

const Produtos = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { products } = useFetchProducts();

  if (!user) {
    navigate("/"); // Se o usuário não estiver logado, redireciona para a página de login
    return null;
  }
  
  return (
    <main>
      
      <header className="headerHomePage">
        
        <img src="/BarbeariaLogo2.png" alt="Logo" width={100} />
        
        <h2 className="conteudoHomePage"> Confira nossos produtos disponíveis! </h2>
        
        <button onClick={() => navigate("/homepage")}>Voltar</button>
        
        <button onClick={() => { logout(); navigate("/"); }}>Sair</button>
        
      </header>

      <section className="products">
        
        {products.map((product) => (

          <div key={product.id} className="product-card">
            
            <h2>{product.title}</h2>
            
            <a href={product.permalink} target="_blank" rel="noopener noreferrer">
              <img src={product.thumbnail} alt={product.title} />
            </a>
            
            <p> R$ {product.price.toFixed(2)} </p>
            
          </div>
          
        ))}
        
      </section>

    </main>
  );
};

export default Produtos;
