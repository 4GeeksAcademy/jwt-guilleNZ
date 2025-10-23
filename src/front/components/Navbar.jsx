import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    🔐 JWT Auth
                </Link>
                
                <div className="navbar-nav ms-auto">
                    {token ? (
                        <>
                            <Link className="nav-link" to="/private">
                                Área Privada
                            </Link>
                            <button 
                                className="btn btn-outline-danger btn-sm ms-2"
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/login">
                                Iniciar Sesión
                            </Link>
                            <Link className="nav-link" to="/signup">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;