import { writable } from 'svelte/store';


export const authStore = writable({
    user: null,
    isAuthenticated: false,
    loading: true
});


export const initializeAuth = () => {
    const token = sessionStorage.getItem('token');
    const userStr = sessionStorage.getItem('user');
    
    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            authStore.set({
                user: user,
                isAuthenticated: true,
                loading: false
            });
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Limpiar datos corruptos
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            authStore.set({
                user: null,
                isAuthenticated: false,
                loading: false
            });
        }
    } else {
        authStore.set({
            user: null,
            isAuthenticated: false,
            loading: false
        });
    }
};


export const login = (user, token) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    authStore.set({
        user: user,
        isAuthenticated: true,
        loading: false
    });
};


export const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    authStore.set({
        user: null,
        isAuthenticated: false,
        loading: false
    });
};