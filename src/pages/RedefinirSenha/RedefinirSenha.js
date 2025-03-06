import ResetSenha from "../../components/ResetSenha";
import './RedefinirSenha.css';

const RedefinirSenha = () => {
    return(
        <main className="main">
            
            <img
                src="/BarbeariaLogo2.png"
                alt="Logo"
                width={300}
                className="logoLogin"
            />

            <div className="container_login">
                <h1> Redefinir Senha </h1>
                <ResetSenha />
            </div>

        </main>
    )
}

export default RedefinirSenha;