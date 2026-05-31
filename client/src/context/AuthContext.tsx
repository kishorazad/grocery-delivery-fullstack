import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { User } from "../types";

import { useNavigate } from "react-router-dom";

import api from "../config/api";

import toast from "react-hot-toast";

import { generateToken } from "../firebase";
import { saveFcmToken } from "../utils/saveFcmToken";

interface AuthContextType {

    user: User | null;

    token: string | null;

    loading: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    register: (
        name: string,
        email: string,
        password: string
    ) => Promise<void>;

    logout: () => void;

    updateUser: (
        userData: Partial<User>
    ) => void;
}

const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {

    const navigate =
        useNavigate();

    const [user, setUser] =
        useState<User | null>(null);

    const [token, setToken] =
        useState<string | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const savedToken =
            localStorage.getItem(
                "auth_token"
            );

        const savedUser =
            localStorage.getItem(
                "auth_user"
            );

        if (
            savedToken &&
            savedUser
        ) {

            setToken(savedToken);

            setUser(
                JSON.parse(savedUser)
            );
        }

        setLoading(false);

    }, []);

    // LOGIN
    const login = async (
        email: string,
        password: string
    ) => {

        try {

            const { data } =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password,
                    }
                );

            setUser(data.user);

            setToken(data.token);

            localStorage.setItem(
                "auth_token",
                data.token
            );

            localStorage.setItem(
                "auth_user",
                JSON.stringify(data.user)
            );

            toast.success(
                "Login successful"
            );

            // GENERATE FCM TOKEN
            const fcmToken =
                await generateToken();

            console.log(
                "FCM TOKEN:",
                fcmToken
            );

            // SAVE TOKEN TO DATABASE
            if (fcmToken) {

                await api.put(
                    "/auth/fcm-token",
                    {
                        token:
                            fcmToken,
                            email,
                    }
                );
            }

            navigate("/");

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message ||
                error?.message
            );
        }
    };

    // REGISTER
    const register = async (
        name: string,
        email: string,
        password: string
    ) => {

        try {

            const { data } =
                await api.post(
                    "/auth/register",
                    {
                        name,
                        email,
                        password,
                    }
                );

            setUser(data.user);

            setToken(data.token);

            localStorage.setItem(
                "auth_token",
                data.token
            );

            localStorage.setItem(
                "auth_user",
                JSON.stringify(data.user)
            );

            toast.success(
                "Registration successful"
            );

            // GENERATE FCM TOKEN
            const fcmToken =
                await generateToken();

            console.log(
                "FCM TOKEN:",
                fcmToken
            );

            // SAVE TOKEN TO DATABASE
            if (fcmToken) {

                await api.put(
                    "/auth/fcm-token",
                    {
                        token:
                            fcmToken,
                            email,
                    }
                );
            }

            navigate("/");

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message ||
                error?.message
            );
        }
    };

    // LOGOUT
    const logout = () => {

        setUser(null);

        setToken(null);

        localStorage.removeItem(
            "auth_token"
        );

        localStorage.removeItem(
            "auth_user"
        );
    };

    // UPDATE USER
    const updateUser = (
        userData: Partial<User>
    ) => {

        if (user) {

            const updated = {
                ...user,
                ...userData,
            };

            setUser(updated);

            localStorage.setItem(
                "auth_user",
                JSON.stringify(updated)
            );
        }
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
}