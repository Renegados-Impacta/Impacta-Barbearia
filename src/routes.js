import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RedefinirSenha from "./pages/RedefinirSenha/RedefinirSenha";

import Home from "./pages/Home/Home";
import HomePage from "./pages/HomePage/HomePage";
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