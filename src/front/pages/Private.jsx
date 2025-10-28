import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { protectedRoute, logoutUser } from "../../API/API.js";

const Private = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const validateAccess = async () => {
            const hasAccess = await protectedRoute();
            
            if (!hasAccess) {
                navigate("/login");
            } else {
                const userStr = sessionStorage.getItem("user");
                if (userStr) {
                    setUserData(JSON.parse(userStr));
                }
                setLoading(false);
            }
        };

        validateAccess();
    }, [navigate]);

    const handleLogout = () => {
        logoutUser(navigate);
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
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
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">🏠 Área Privada</h3>
                            <button 
                                className="btn btn-light btn-sm"
                                onClick={handleLogout}
                            >
                                🚪 Cerrar Sesión
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="alert alert-success">
                                <h4>¡Bienvenido a la zona privada! 🎉</h4>
                                <p className="mb-0">
                                    Has accedido exitosamente a contenido protegido.
                                    Esta página solo es visible para usuarios autenticados.
                                </p>
                            </div>
                            
                            {userData && (
                                <div className="mt-4">
                                    <h5>👤 Información del Usuario:</h5>
                                    <div className="card">
                                        <div className="card-body">
                                            <p><strong>ID:</strong> {userData.id}</p>
                                            <p><strong>Email:</strong> {userData.email}</p>
                                            <p><strong>Estado:</strong> <span className="badge bg-success">Activo</span></p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4">
                                <h5>✨ Funcionalidades Disponibles:</h5>
                                <div className="row mt-3">
                                    <div className="col-md-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body text-center">
                                                <h6 className="card-title">📊 Dashboard</h6>
                                                <p className="card-text">
                                                    Acceso completo al panel de control y estadísticas.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body text-center">
                                                <h6 className="card-title">⚙️ Configuración</h6>
                                                <p className="card-text">
                                                    Gestiona tu perfil y preferencias de usuario.
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