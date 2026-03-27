import { useContext, createContext, useState, useEffect } from "react";

/**
 * @typedef {Object} AuthProviderProps
 * @property {React.ReactNode} children
 */

const AuthContext = createContext({
    isAuthenticated: false,
});

/**
 * @param {AuthProviderProps} props
 */
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}