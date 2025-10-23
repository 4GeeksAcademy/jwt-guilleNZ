import { useEffect, useState } from "react";

const Footer = () => {
    const [userStatus, setUserStatus] = useState("no-authenticated");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserStatus(token ? "authenticated" : "no-authenticated");
    }, []);

    return (
        <footer className="bg-dark text-light mt-5 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>🔐 JWT Authentication System</h5>
                        <p className="mb-0">
                            Sistema de autenticación seguro con Flask y React.js
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <div className="mb-2">
                            <span className={`badge ${userStatus === "authenticated" ? "bg-success" : "bg-secondary"}`}>
                                {userStatus === "authenticated" ? "✅ Usuario Autenticado" : "🔒 No Autenticado"}
                            </span>
                        </div>
                        <small>
                            Estado: {userStatus === "authenticated" ? "Sesión activa" : "Inicia sesión"}
                        </small>
                    </div>
                </div>
                <hr className="my-3" />
                <div className="text-center">
                    <small>
                        &copy; 2024 JWT Auth System | 
                        <span className="text-warning mx-2">Backend: Flask + JWT</span> | 
                        <span className="text-info">Frontend: React.js</span>
                    </small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;