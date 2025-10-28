import { useEffect, useState } from "react";

const BackendURL = () => {
    const [backendInfo, setBackendInfo] = useState({
        status: "checking",
        url: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api",
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
                        message: `Backend running on port ${data.port || 3001}`
                    }));
                } else {
                    setBackendInfo(prev => ({
                        ...prev,
                        status: "error",
                        responseTime: endTime - startTime,
                        message: "Backend not responding on port 3001"
                    }));
                }
            } catch (error) {
                const endTime = Date.now();
                setBackendInfo(prev => ({
                    ...prev,
                    status: "error",
                    responseTime: endTime - startTime,
                    message: "Cannot connect to backend on port 3001"
                }));
            }
        };

        checkBackendConnection();
    }, []);

    return (
        <div className="alert alert-info mt-3">
            <h6>🔧 Connection Status</h6>
            <div className="row">
                <div className="col-md-6">
                    <strong>Frontend:</strong> http://localhost:3000
                </div>
                <div className="col-md-6">
                    <strong>Backend:</strong> {backendInfo.url}
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4">
                    <strong>Status:</strong> 
                    <span className={backendInfo.status === "connected" ? "text-success ms-2" : "text-danger ms-2"}>
                        {backendInfo.status === "connected" ? "✅ Connected" : "❌ Disconnected"}
                    </span>
                </div>
                <div className="col-md-4">
                    <strong>Token:</strong> 
                    <span className={sessionStorage.getItem("token") ? "text-success ms-2" : "text-warning ms-2"}>
                        {sessionStorage.getItem("token") ? "✅ Active" : "❌ Inactive"}
                    </span>
                </div>
                <div className="col-md-4">
                    {backendInfo.responseTime && (
                        <strong>Response:</strong> 
                    )}
                    {backendInfo.responseTime && (
                        <span className="ms-2">{backendInfo.responseTime}ms</span>
                    )}
                </div>
            </div>
            {backendInfo.message && (
                <small className="text-muted mt-2 d-block">{backendInfo.message}</small>
            )}
        </div>
    );
};

export default BackendURL;