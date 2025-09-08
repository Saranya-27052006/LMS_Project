'use client';
import { createContext, ReactNode, useContext, useState, useEffect } from "react";

// Define the IUser interface
interface IUser {
    name: string;
    email: string;
    profile: string;
    token?: string;
    role: string;
}

// Define the UserContextType interface
interface UserContextType {
    user: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
const [user, setUser] = useState<IUser | null>(null);

useEffect(() => {
    const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser));
        }
}, []);


// Login function
const login = (user: IUser) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
};

// Logout function
const logout = () => {
    setUser(null);
    localStorage.removeItem('user')
};

return (
    <UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>
);
};
