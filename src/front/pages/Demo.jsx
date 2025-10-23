import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Demo = () => {
    const [authStatus, setAuthStatus] = useState("checking");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setAuthStatus(token ? "authenticated" : "not-authenticated");
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-4">🎯 Página de Demostración</h1>
                    
                    <div className="alert alert-info">
                        <h4>Estado de Autenticación:</h4>
                        <p>
                            {authStatus === "authenticated" 
                                ? "✅ Estás autenticado y puedes acceder a todas las funciones." 
                                : "❌ No estás autenticado. Algunas funciones pueden estar limitadas."}
                        </p>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">
                            <h5>Funcionalidades del Sistema JWT</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>✅ Implementado:</h6>
                                    <ul>
                                        <li>Registro de usuarios</li>
                                        <li>Inicio de sesión con JWT</li>
                                        <li>Protección de rutas privadas</li>
                                        <li>Cierre de sesión</li>
                                        <li>Validación de tokens</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h6>🔒 Rutas Protegidas:</h6>
                                    <ul>
                                        <li>
                                            <Link to="/private">/private</Link> - Solo usuarios autenticados
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {authStatus === "not-authenticated" && (
                        <div className="text-center">
                            <Link to="/login" className="btn btn-primary btn-lg">
                                🔐 Iniciar Sesión para Probar
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Demo;