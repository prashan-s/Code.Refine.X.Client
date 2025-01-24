import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSessionStorage from '@hooks/useSessionStorage';
import { setAuthenticated } from '@redux/reducers/authReducer';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken, removeToken] = useSessionStorage('token', null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const dispatch = useDispatch();

    useEffect(() => {
        // If there's a token in localStorage on page load, update the authentication state in Redux
        if (token) {
            setIsAuthenticated(true);
            dispatch(setAuthenticated(true)); // Dispatch to Redux on load
        }
    }, [token, dispatch]);

    const login = (newToken: string) => {
        setToken(newToken);
        setIsAuthenticated(true);
        dispatch(setAuthenticated(true)); // Dispatch authenticated state to Redux
    };

    const logout = () => {
        removeToken();
        setIsAuthenticated(false);
        dispatch(setAuthenticated(false)); // Dispatch unauthenticated state to Redux
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
