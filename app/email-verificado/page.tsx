"use client";

import { CheckCircle2 } from "lucide-react";

export default function EmailVerifiedPage() {

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
                text-center
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
                    <CheckCircle2
                        size={34}
                        className="text-[#1E7A3C]"
                    />
                </div>

                <h1 className="
                    text-3xl
                    font-bold
                    mt-6
                ">
                    Email verificado
                </h1>

                <p className="
                    mt-4
                    text-gray-600
                    leading-relaxed
                ">
                    Sua conta foi ativada com sucesso.
                    Agora você já pode acessar o Saldium.
                </p>

                <a
                    href="/login"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        w-full
                        mt-8
                        bg-[#1E7A3C]
                        text-white
                        py-3
                        rounded-xl
                        hover:bg-[#176430]
                        transition
                    "
                >
                    Entrar no Saldium
                </a>

            </div>

        </main>
    );
}