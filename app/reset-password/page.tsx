"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/services/api";
import axios from "axios";

function ResetPasswordContent() {

    const router = useRouter();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const [senha, setSenha] = useState("");
    const [confirmacao, setConfirmacao] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        setErro("");

        if (senha.length < 8) {
            setErro(
                "A senha deve ter no mínimo 8 caracteres."
            );
            return;
        }

        if (!confirmacao.trim()) {
            setErro(
                "Confirme sua nova senha."
            );
            return;
        }

        if (senha !== confirmacao) {
            setErro(
                "As senhas não coincidem."
            );
            return;
        }

        try {

            setLoading(true);

            await api.post(
                `/auth/reset-password?token=${token}`,
                {
                    novaSenha: senha,
                    confirmarNovaSenha: confirmacao,
                }
            );

            router.push(
                "/password-reset-success"
            );

        } catch (error) {

            console.error(error);

            if (axios.isAxiosError(error)) {

                if (
                    error.response?.status === 400 ||
                    error.response?.status === 404
                ) {

                    setErro(
                        "Este link de redefinição é inválido ou expirou."
                    );

                    return;
                }
            }

            setErro(
                "Não foi possível alterar sua senha."
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <main
            className="
                min-h-screen
                bg-[#F7F8F5]
                flex
                items-center
                justify-center
            "
        >
        </main>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={null}>
            <ResetPasswordContent />
        </Suspense>
    );
}