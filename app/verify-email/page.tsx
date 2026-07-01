"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/services/api";
import { Mail, CheckCircle } from "lucide-react";

function VerifyEmailContent() {

    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        const emailParam = searchParams.get("email");

        if (emailParam) {
            setEmail(emailParam);
            return;
        }

        const emailStorage =
            sessionStorage.getItem("verificationEmail");

        if (emailStorage) {
            setEmail(emailStorage);
        }

    }, [searchParams]);

    async function handleResendEmail() {

        try {

            setLoading(true);

            await api.post(
                "/auth/resend-verification-email",
                {
                    email,
                }
            );

            setSuccess(true);

        } catch (error) {

            console.error(error);

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
                px-6
            "
        >

            <div
                className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-lg
                    p-10
                    max-w-lg
                    w-full
                    text-center
                "
            >

                <div
                    className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-[#1E7A3C]/10
                        flex
                        items-center
                        justify-center
                        mx-auto
                    "
                >
                    <Mail
                        size={32}
                        className="text-[#1E7A3C]"
                    />
                </div>

                <h1 className="text-3xl font-bold mt-6">
                    Verifique seu email
                </h1>

                <p className="text-gray-600 mt-4 leading-relaxed">
                    Enviamos um link de confirmação para:
                </p>

                <p className="font-semibold mt-2 break-all">
                    {email}
                </p>

                <p className="text-gray-500 mt-6 text-sm">
                    Clique no link enviado para ativar sua conta.
                </p>

                {success && (

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            mt-6
                            text-[#1E7A3C]
                        "
                    >
                        <CheckCircle size={18} />

                        <span>
                            Email reenviado com sucesso
                        </span>

                    </div>

                )}

                <button
                    onClick={handleResendEmail}
                    disabled={loading}
                    className="
                        w-full
                        mt-8
                        bg-[#1E7A3C]
                        text-white
                        py-3
                        rounded-xl
                        hover:bg-[#176430]
                        transition
                        disabled:opacity-60
                    "
                >
                    {
                        loading
                            ? "Reenviando..."
                            : "Reenviar email"
                    }
                </button>

                <a
                    href="/login"
                    className="
                        block
                        mt-4
                        text-[#1E7A3C]
                        font-medium
                    "
                >
                    Voltar para login
                </a>

            </div>

        </main>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={null}>
            <VerifyEmailContent />
        </Suspense>
    );
}