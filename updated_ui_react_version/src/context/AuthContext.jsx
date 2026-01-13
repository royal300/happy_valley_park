import React, { createContext, useContext, useState, useEffect } from 'react';
import { bookingService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('hv_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Fetch User Profile
            bookingService.getProfile()
                .then(res => {
                    if (res.data.status === 'success') {
                        setUser(res.data.user);
                    } else {
                        logout();
                    }
                })
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = (newToken, userData) => {
        localStorage.setItem('hv_token', newToken);
        setToken(newToken);
        if (userData) setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('hv_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
