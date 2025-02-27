import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  return (
    <div className="container">
        
      <img 
        src="/BarbeariaLogo.png"
        alt="Logo da Barbearia"
        width={600}
        className="logoHome"
      />
              
      <p> Faça seu login ou cadastre-se para continuar. </p>

      <div>

        <Link to="/login">
            <button className="login"> Login </button>
        </Link>

        <Link to="/register">
          <button> Cadastro </button>
        </Link>

      </div>
      
    </div>
  );
};

export default Home;