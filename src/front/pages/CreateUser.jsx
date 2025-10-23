import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newUser } from "../API/API";

const CreateUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await newUser({ email, password });
            
            if (result && result.msg) {
                alert(result.msg);
            } else if (result && result.email) {
                alert("Usuario registrado exitosamente");
                navigate("/login");
            } else {
                alert("Error en el registro");
            }
        } catch (error) {
            console.error("Error en registro:", error);
            alert("Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Registro</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Registrando..." : "Registrarse"}
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <p>
                                    ¿Ya tienes cuenta?{" "}
                                    <a href="/login" className="text-decoration-none">
                                        Inicia sesión aquí
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;