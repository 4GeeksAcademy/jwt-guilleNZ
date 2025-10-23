import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [userStatus, setUserStatus] = useState("checking");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserStatus(token ? "authenticated" : "not-authenticated");
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <div className="fade-in">
                        <h1 className="display-4 fw-bold mb-4">
                            🔐 Sistema de Autenticación JWT
                        </h1>
                        
                        <p className="lead mb-4">
                            Una implementación segura de autenticación usando 
                            <span className="text-primary"> Flask + JWT </span> en el backend y 
                            <span className="text-info"> React.js </span> en el frontend.
                        </p>

                    
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Estado Actual</h5>
                                <div className={`auth-status ${userStatus === "authenticated" ? "status-authenticated" : "status-not-authenticated"}`}>
                                    {userStatus === "authenticated" ? "✅ Sesión Activa" : "🔒 No Autenticado"}
                                </div>
                                <p className="mt-2 mb-0">
                                    {userStatus === "authenticated" 
                                        ? "Tienes acceso a las áreas privadas del sistema." 
                                        : "Inicia sesión para acceder al contenido protegido."}
                                </p>
                            </div>
                        </div>

                        
                        <div className="row mt-4">
                            <div className="col-md-4 mb-3">
                                <div className="card feature-card h-100">
                                    <div className="card-body text-center">
                                        <h5>👤 Registro</h5>
                                        <p>Crea una nueva cuenta en el sistema</p>
                                        <Link to="/signup" className="btn btn-primary auth-btn">
                                            Registrarse
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card feature-card h-100">
                                    <div className="card-body text-center">
                                        <h5>🔐 Login</h5>
                                        <p>Accede con tu cuenta existente</p>
                                        <Link to="/login" className="btn btn-success auth-btn">
                                            Iniciar Sesión
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card feature-card h-100">
                                    <div className="card-body text-center">
                                        <h5>🚀 Privado</h5>
                                        <p>Área exclusiva para usuarios autenticados</p>
                                        <Link to="/private" className="btn btn-warning auth-btn">
                                            Zona Privada
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    
                        <div className="mt-5">
                            <h4>Tecnologías Implementadas</h4>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        <li className="list-group-item">✅ Flask (Backend)</li>
                                        <li className="list-group-item">✅ JWT Tokens</li>
                                        <li className="list-group-item">✅ SQLAlchemy (ORM)</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        <li className="list-group-item">✅ React.js (Frontend)</li>
                                        <li className="list-group-item">✅ React Router</li>
                                        <li className="list-group-item">✅ Session Storage</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;