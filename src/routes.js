import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import RedefinirSenha from "./pages/RedefinirSenha/redefinirsenha";

import Home from "./pages/Home/home";
import HomePage from "./pages/HomePage/homepage";
import PageAdmin from "./pages/PageAdmin/pageadmin";
import Produtos from "./pages/Produtos/produtos";

function RoutesApp() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/pageadmin" element={<PageAdmin />} />
                    <Route path="/redefinirSenha" element={<RedefinirSenha />} />
                    <Route path="/produtos" element={<Produtos />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default RoutesApp;