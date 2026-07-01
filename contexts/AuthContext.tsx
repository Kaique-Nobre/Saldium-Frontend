"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { api } from "@/services/api";
import axios from "axios";

interface AuthContextData {
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: {
        email: string;
        senha: string;
    }) => Promise<void>;
    logout: (s: string) => Promise<void>;
}

const AuthContext =
    createContext<AuthContextData>(
        {} as AuthContextData
    );

const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function AuthProvider({
                                 children
                             }: {
    children: React.ReactNode;
}) {

    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    async function loadSession() {

        const refreshToken =
            localStorage.getItem("refreshToken");

        if (!refreshToken) {
            setLoading(false);
            return;
        }

        try {

            const response =
                await api.post("/auth/refresh", {
                    refreshToken
                });

            const accessToken =
                response.data.accessToken;

            localStorage.setItem(
                "accessToken",
                accessToken
            );

            setIsAuthenticated(true);

        } catch {

            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSession();
    }, []);

    async function login({
                             email,
                             senha
                         }: {
        email: string;
        senha: string;
    }) {

        const response =
            await authApi.post("/auth/login", {
                email,
                senha
            });

        const {
            accessToken,
            refreshToken
        } = response.data;

        localStorage.setItem(
            "accessToken",
            accessToken
        );

        localStorage.setItem(
            "refreshToken",
            refreshToken
        );

        setIsAuthenticated(true);
    }

    async function logout(redirect: string = "/login") {

        const refreshToken = localStorage.getItem("refreshToken");

        try {

            if (refreshToken) {

                await api.post("/auth/logout", {
                    refreshToken
                });

            }

        } catch (error) {

            console.error("Erro ao fazer logout:", error);

        } finally {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            setIsAuthenticated(false);

            window.location.href = redirect;
        }

    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}