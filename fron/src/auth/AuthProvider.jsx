import { useContext, createContext, useState, useEffect } from "react";

interface AuthContextType {
    children: React.ReactNode;
}
const AuthContext = createContext(null);

export const AuthProvider = ({ children }: AuthContextType) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
}