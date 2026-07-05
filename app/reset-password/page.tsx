"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Lock } from "lucide-react";
import { api } from "@/services/api";

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

        if (!token) {
            return (
                <main className="min-h-screen bg-[#F7F8F5] flex items-center justify-center px-6">
                    <div className="bg-white rounded-3xl border shadow-lg p-10 max-w-lg w-full text-center">
                        <h1 className="text-2xl font-bold">
                            Link inválido
                        </h1>

                        <p className="text-gray-500 mt-3">
                            O link de redefinição de senha é inválido ou expirou.
                        </p>

                        <button
                            onClick={() => router.push("/login")}
                            className="mt-8 w-full rounded-xl bg-[#1E7A3C] py-3 text-white"
                        >
                            Voltar ao login
                        </button>
                    </div>
                </main>
            );
        }

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

            router.push("/password-reset-success");

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

        <main className="
            min-h-screen
            bg-[#F7F8F5]
            flex
            items-center
            justify-center
            px-6
        ">

            <div className="
                bg-white
                rounded-3xl
                border
                shadow-lg
                p-10
                max-w-lg
                w-full
            ">

                <div className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-[#1E7A3C]/10
                    flex
                    items-center
                    justify-center
                    mx-auto
                ">

                    <Lock
                        size={30}
                        className="text-[#1E7A3C]"
                    />

                </div>

                <h1 className="
                    text-3xl
                    font-bold
                    text-center
                    mt-6
                ">
                    Redefinir senha
                </h1>

                <p className="
                    text-center
                    text-gray-600
                    mt-4
                ">
                    Escolha uma nova senha para acessar sua conta.
                </p>

                {erro && (

                    <div className="
                        mt-6
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                        text-center
                        text-red-700
                    ">
                        {erro}
                    </div>

                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4"
                >

                    <input
                        type="password"
                        placeholder="Nova senha"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                        "
                    />

                    <input
                        type="password"
                        placeholder="Confirme a nova senha"
                        value={confirmacao}
                        onChange={(e) =>
                            setConfirmacao(e.target.value)
                        }
                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                        "
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-[#1E7A3C]
                            py-3
                            text-white
                            transition
                            hover:bg-[#176532]
                            disabled:opacity-60
                        "
                    >
                        {loading
                            ? "Alterando senha..."
                            : "Alterar senha"}
                    </button>

                </form>

                <button
                    onClick={() => router.push("/login")}
                    className="
                        mt-6
                        w-full
                        text-center
                        text-[#1E7A3C]
                        hover:underline
                    "
                >
                    Voltar ao login
                </button>

            </div>

        </main>

    );
}

export default function ResetPasswordPage() {

    return (

        <Suspense
            fallback={
                <main className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-[#F7F8F5]
                ">
                    Carregando...
                </main>
            }
        >
            <ResetPasswordContent />
        </Suspense>

    );
}