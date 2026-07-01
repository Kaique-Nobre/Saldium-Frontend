"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
                                           children
                                       }: {
    children: React.ReactNode;
}) {

    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {

        if (!loading && !isAuthenticated) {
            router.push("/login");
        }

    }, [isAuthenticated, loading]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return <>{children}</>;
}