import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { protectedRoute } from "../API/API";

const Private = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const validateAccess = async () => {
            const hasAccess = await protectedRoute();
            
            if (!hasAccess) {
                navigate("/login");
            } else {
                setLoading(false);
            }
        };

        validateAccess();
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2">Verificando autenticación...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Página Privada</h3>
                            <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="alert alert-success">
                                <h4>¡Bienvenido a la zona privada!</h4>
                                <p className="mb-0">
                                    Has accedido exitosamente a contenido protegido.
                                    Esta página solo es visible para usuarios autenticados.
                                </p>
                            </div>
                            
                            <div className="mt-4">
                                <h5>Información de la sesión:</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Token almacenado:</strong>{" "}
                                        {sessionStorage.getItem("token") ? "Sí" : "No"}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Estado:</strong> Autenticado
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <h5>Funcionalidades disponibles:</h5>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">Contenido Exclusivo</h6>
                                                <p className="card-text">
                                                    Acceso a información y recursos disponibles 
                                                    solo para usuarios registrados.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">Panel Personal</h6>
                                                <p className="card-text">
                                                    Gestiona tu perfil y configuración personal 
                                                    en esta área segura.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Private;