"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post(
                "/auth/forgot-password",
                {
                    email,
                }
            );

            setSucesso(true);

        } catch (error) {

            console.error(error);

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
                    <Mail
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
                    Esqueceu sua senha?
                </h1>

                <p className="
                    text-center
                    text-gray-600
                    mt-4
                ">
                    Informe seu email para receber um link de redefinição.
                </p>

                {
                    sucesso ? (

                        <div className="
                            mt-8
                            rounded-xl
                            bg-green-50
                            border
                            border-green-200
                            p-4
                            text-green-700
                            text-center
                        ">
                            Email enviado com sucesso.
                            Verifique sua caixa de entrada.
                        </div>

                    ) : (

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8"
                        >

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="seuemail@exemplo.com"
                                className="
                                    w-full
                                    p-3
                                    rounded-lg
                                    border
                                "
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    mt-4
                                    bg-[#1E7A3C]
                                    text-white
                                    py-3
                                    rounded-xl
                                "
                            >
                                {
                                    loading
                                        ? "Enviando..."
                                        : "Enviar link"
                                }
                            </button>

                        </form>

                    )
                }

                <a
                    href="/login"
                    className="
                        block
                        text-center
                        mt-6
                        text-[#1E7A3C]
                    "
                >
                    Voltar ao login
                </a>

            </div>

        </main>
    );
}