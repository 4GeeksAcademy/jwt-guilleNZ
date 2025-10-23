import { useEffect, useState } from "react";

const Single = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const userStr = sessionStorage.getItem("user");
        
        if (token && userStr) {
            try {
                setUserInfo(JSON.parse(userStr));
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        }
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-info text-white">
                            <h3 className="mb-0">📄 Página Individual</h3>
                        </div>
                        <div className="card-body">
                            <h5>Información de la Sesión</h5>
                            
                            {userInfo ? (
                                <div className="alert alert-success">
                                    <h6>👤 Usuario Autenticado</h6>
                                    <p><strong>ID:</strong> {userInfo.id}</p>
                                    <p><strong>Email:</strong> {userInfo.email}</p>
                                    <p><strong>Estado:</strong> Activo ✅</p>
                                </div>
                            ) : (
                                <div className="alert alert-warning">
                                    <h6>🔒 No Autenticado</h6>
                                    <p>Esta página es pública, pero no hay una sesión activa.</p>
                                    <p>
                                        <a href="/login" className="btn btn-sm btn-primary">
                                            Iniciar Sesión
                                        </a>
                                    </p>
                                </div>
                            )}

                            <div className="mt-4">
                                <h6>Características del Sistema:</h6>
                                <ul>
                                    <li>Autenticación segura con JWT</li>
                                    <li>Protección de rutas privadas</li>
                                    <li>Manejo de sesiones en el frontend</li>
                                    <li>API RESTful en el backend</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single;