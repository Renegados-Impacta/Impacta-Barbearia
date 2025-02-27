import LoginForm from "../../components/LoginForm";
import './Login.css';

const Login = () => {
    return(
        <main className="main">
            
            <img
                src="/BarbeariaLogo2.png"
                alt="Logo"
                width={300}
                className="logoLogin"
            />

            <div className="container_login">
                <h1> Login </h1>
                <LoginForm />
            </div>

        </main>
    )
}

export default Login;