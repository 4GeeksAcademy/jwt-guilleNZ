const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const newUser = async (userData) => {
    try {
        const response = await fetch(`${backendURL}/register`, {
            method: "POST",
            body: JSON.stringify({ 
                "email": userData.email, 
                "password": userData.password 
            }),
            headers: { 
                "Content-Type": "application/json" 
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, error: data.msg || "Error en el registro" };
        }
    } catch (error) {
        console.error("Error registrando usuario", error);
        return { success: false, error: "Error de conexión" };
    }
};

export const loginUser = async (credentials, navigate) => {
    try {
        const response = await fetch(`${backendURL}/login`, {
            method: "POST",
            body: JSON.stringify({ 
                "email": credentials.email, 
                "password": credentials.password 
            }),
            headers: { 
                "Content-Type": "application/json" 
            }
        });
        
        const data = await response.json();
        
        if (response.ok && data.token) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            navigate("/private");
            return { success: true, user: data.user };
        } else {
            alert(data.msg || "Error en el login");
            return { success: false, error: data.msg || "Error en el login" };
        }
    } catch (error) {
        console.error("Login Error", error);
        alert("Error de conexión");
        return { success: false, error: "Error de conexión" };
    }
};

export const protectedRoute = async () => {
    try {
        const token = sessionStorage.getItem("token");
        
        if (!token) {
            return false;
        }
        
        const response = await fetch(`${backendURL}/protected`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        return response.ok;
    } catch (error) {
        console.error("Error de acceso a la ruta protegida", error);
        return false;
    }
};

export const logoutUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
};