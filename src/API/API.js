const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

// Función de utilidad para hacer requests MEJORADA
const makeRequest = async (endpoint, options = {}) => {
    const url = `${backendURL}${endpoint}`;
    
    console.log(`🔄 Making request to: ${url}`);
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            console.error(`❌ HTTP error! status: ${response.status}`, response);
        }
        
        const data = await response.json();
        console.log(`✅ Response from ${endpoint}:`, data);
        
        return { response, data };
    } catch (error) {
        console.error(`❌ Request error to ${endpoint}:`, error);
        console.error(`🔧 Details:`, {
            url,
            errorMessage: error.message,
            errorType: error.name
        });
        
        return { 
            error: "Connection failed - Check if backend is running on port 3001",
            details: error.message
        };
    }
};

// REGISTRO - MEJORADO
export const newUser = async (userData) => {
    console.log("👤 Attempting user registration:", userData);
    
    const { response, data, error } = await makeRequest('/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    
    if (error) {
        console.error("❌ Registration connection error:", error);
        return { 
            success: false, 
            error: "Cannot connect to server. Make sure backend is running on port 3001.",
            details: error.details
        };
    }
    
    if (response.ok) {
        console.log("✅ User registered successfully");
        return { success: true, data };
    } else {
        console.error("❌ Registration failed:", data.msg);
        return { 
            success: false, 
            error: data.msg || "Registration failed",
            status: response.status
        };
    }
};

// LOGIN - MEJORADO
export const loginUser = async (credentials, navigate) => {
    console.log("🔐 Attempting login:", credentials);
    
    const { response, data, error } = await makeRequest('/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
    
    if (error) {
        const errorMsg = "Cannot connect to authentication server. Please check if the backend is running.";
        alert(errorMsg);
        console.error("❌ Login connection error:", error);
        return { success: false, error: errorMsg };
    }
    
    if (response.ok && data.token) {
        console.log("✅ Login successful, token received");
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        
        if (navigate) {
            navigate("/private");
        }
        
        return { success: true, user: data.user };
    } else {
        const errorMsg = data.msg || "Login failed - Invalid credentials";
        alert(errorMsg);
        console.error("❌ Login failed:", data.msg);
        return { success: false, error: errorMsg };
    }
};

// TEST BACKEND CONNECTION - NUEVA FUNCIÓN
export const testBackendConnection = async () => {
    console.log("🔧 Testing backend connection...");
    
    try {
        const response = await fetch('http://localhost:3001/health');
        if (response.ok) {
            const data = await response.json();
            console.log("✅ Backend is running:", data);
            return { connected: true, data };
        } else {
            console.error("❌ Backend health check failed");
            return { connected: false, error: "Health check failed" };
        }
    } catch (error) {
        console.error("❌ Cannot connect to backend:", error);
        return { 
            connected: false, 
            error: "Backend not running on port 3001",
            details: error.message 
        };
    }
};

// Resto de las funciones permanecen igual...
export const protectedRoute = async () => {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
        return false;
    }
    
    const { response, error } = await makeRequest('/protected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (error) return false;
    return response.ok;
};

export const logoutUser = (navigate) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    if (navigate) {
        navigate("/login");
    }
};

export const getCurrentUser = () => {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
};