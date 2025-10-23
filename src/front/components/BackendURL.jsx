// BackendURL.jsx - Versión de diagnóstico completo
import { useEffect, useState } from "react";

const BackendURL = () => {
    const [backendInfo, setBackendInfo] = useState({
        status: "checking",
        url: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
        responseTime: null
    });

    useEffect(() => {
        const checkBackendConnection = async () => {
            const startTime = Date.now();
            
            try {
                const response = await fetch(backendInfo.url.replace('/api', '/health'));
                const endTime = Date.now();
                
                if (response.ok) {
                    const data = await response.json();
                    setBackendInfo(prev => ({
                        ...prev,
                        status: "connected",
                        responseTime: endTime - startTime,
                        message: data.message || "Backend funcionando"
                    }));
                } else {
                    setBackendInfo(prev => ({
                        ...prev,
                        status: "error",
                        responseTime: endTime - startTime,
                        message: "Error en la respuesta del backend"
                    }));
                }
            } catch (error) {
                const endTime = Date.now();
                setBackendInfo(prev => ({
                    ...prev,
                    status: "error",
                    responseTime: endTime - startTime,
                    message: "No se pudo conectar al backend"
                }));
            }
        };

        checkBackendConnection();
    }, []);

    return (
        <div className="alert alert-info mt-3">
            <h6>🔧 Información de Conexión</h6>
            <div className="row">
                <div className="col-md-6">
                    <strong>Backend:</strong> {backendInfo.url}
                </div>
                <div className="col-md-3">
                    <strong>Estado:</strong> 
                    <span className={backendInfo.status === "connected" ? "text-success" : "text-danger"}>
                        {backendInfo.status === "connected" ? " ✅ Conectado" : " ❌ Error"}
                    </span>
                </div>
                <div className="col-md-3">
                    <strong>Token:</strong> 
                    {sessionStorage.getItem("token") ? " ✅ Activo" : " ❌ Inactivo"}
                </div>
            </div>
            {backendInfo.responseTime && (
                <small className="text-muted">
                    Tiempo de respuesta: {backendInfo.responseTime}ms
                </small>
            )}
        </div>
    );
};

export default BackendURL;