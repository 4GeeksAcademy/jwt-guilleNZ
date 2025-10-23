import { useReducer, useEffect } from "react";


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    backendStatus: "checking"
};


export const actions = {
    SET_USER: "SET_USER",
    LOGOUT: "LOGOUT",
    SET_LOADING: "SET_LOADING",
    SET_BACKEND_STATUS: "SET_BACKEND_STATUS"
};

// Reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case actions.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false
            };
        case actions.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case actions.SET_BACKEND_STATUS:
            return {
                ...state,
                backendStatus: action.payload
            };
        default:
            return state;
    }
};


const useGlobalReducer = () => {
    const [state, dispatch] = useReducer(globalReducer, initialState);


    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem("token");
            const userStr = sessionStorage.getItem("user");
            
            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    dispatch({ type: actions.SET_USER, payload: user });
                } catch (error) {
                    console.error("Error parsing user data:", error);
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("user");
                }
            } else {
                dispatch({ type: actions.SET_LOADING, payload: false });
            }
        };

        checkAuth();
    }, []);

    // Acciones
    const login = (user, token) => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: actions.SET_USER, payload: user });
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        dispatch({ type: actions.LOGOUT });
    };

    const setBackendStatus = (status) => {
        dispatch({ type: actions.SET_BACKEND_STATUS, payload: status });
    };

    return {
        state,
        actions: {
            login,
            logout,
            setBackendStatus
        }
    };
};

export default useGlobalReducer;