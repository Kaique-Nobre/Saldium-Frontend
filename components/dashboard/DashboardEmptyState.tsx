"use client";

import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardEmptyState() {

    const router = useRouter();

    return (

        <div
            className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                min-h-[520px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-10
            "
        >

            <div
                className="
                    w-24
                    h-24
                    rounded-full
                    bg-[#1E7A3C]/10
                    flex
                    items-center
                    justify-center
                    mb-8
                "
            >
                <TrendingUp
                    size={44}
                    className="text-[#1E7A3C]"
                />
            </div>

            <h2 className="text-3xl font-bold">
                Bem-vindo ao Saldium 👋
            </h2>

            <p
                className="
                    mt-5
                    max-w-lg
                    text-lg
                    text-gray-500
                    leading-relaxed
                "
            >
                Você ainda não possui nenhuma movimentação financeira.
                Cadastre sua primeira receita ou despesa para acompanhar
                seus ganhos, gastos e visualizar relatórios completos.
            </p>

            <button
                onClick={() => router.push("/transacoes")}
                className="
                    mt-10
                    bg-[#1E7A3C]
                    hover:bg-[#176430]
                    text-white
                    px-8
                    py-4
                    rounded-xl
                    font-medium
                    transition-all
                    hover:scale-105
                "
            >
                Registrar primeira transação
            </button>

        </div>

    );

}