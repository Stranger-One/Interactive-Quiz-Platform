import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide the context to its children
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        isAuthenticated: false,
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};