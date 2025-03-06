import RegisterForm from "../../components/RegisterForm";
import './Register.css'

const Register = () => {
    return(
        <main>
            
            <img
                src="/BarbeariaLogo2.png"
                alt="Logo"
                width={300}
                className="logoLogin"
            />
            
            <div className="container_Register">
                <h1> Cadastro </h1>
                <RegisterForm />
            </div>

        </main>
    )
}

export default Register;