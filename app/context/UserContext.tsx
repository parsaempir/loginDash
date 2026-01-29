"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    email: string;
    name?: string;
    profileImage?: string;
}

interface UserContextType {
    currentUser: User | null;
    updateUser: (userData: Partial<User>) => void;
    login: (email: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem("currentUser");
                if (stored) {
                    setCurrentUser(JSON.parse(stored));
                }
            } catch (err) {
                console.error("Failed to load user from localStorage", err);
            }
        }
    }, []);

    const updateUser = (userData: Partial<User>) => {
        setCurrentUser((prev) => {
            const updated = { ...(prev || {}), ...userData } as User;
            if (!updated.email) return prev;

            try {
                localStorage.setItem("currentUser", JSON.stringify(updated));

                // Keep allUsers list in sync
                const storedAllUsers = localStorage.getItem("allUsers");
                let allUsers: User[] = [];
                try {
                    const parsed = JSON.parse(storedAllUsers || "[]");
                    allUsers = Array.isArray(parsed) ? parsed : [];
                } catch {
                    allUsers = [];
                }

                const index = allUsers.findIndex(u => u.email === updated.email);
                if (index !== -1) {
                    allUsers[index] = updated;
                } else {
                    allUsers.push(updated);
                }
                localStorage.setItem("allUsers", JSON.stringify(allUsers));
            } catch (err) {
                console.error("Failed to save user to localStorage", err);
            }
            return updated;
        });
    };

    const login = (email: string) => {
        // Try to find user in simulated database
        try {
            const storedAllUsers = localStorage.getItem("allUsers");
            let allUsers: User[] = [];

            try {
                const parsed = JSON.parse(storedAllUsers || "[]");
                allUsers = Array.isArray(parsed) ? parsed : [];
            } catch {
                allUsers = [];
            }

            const user = allUsers.find((u: User) => u.email === email);

            if (user) {
                setCurrentUser(user);
                localStorage.setItem("currentUser", JSON.stringify(user));
            } else {
                // Create new user if not found
                const newUser = { email };
                allUsers.push(newUser);
                setCurrentUser(newUser);
                localStorage.setItem("currentUser", JSON.stringify(newUser));
                localStorage.setItem("allUsers", JSON.stringify(allUsers));
            }
        } catch (err) {
            console.error("Failed to login", err);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    return (
        <UserContext.Provider value={{ currentUser, updateUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
