"use client";

import { RelatorioResponse } from "@/types/relatorio.types";

import {TrendingDown, TrendingUp, Wallet} from "lucide-react";

interface RelatorioCardsProps {
    relatorio: RelatorioResponse;
}

export default function RelatorioCards({
                                           relatorio,
                                       }: RelatorioCardsProps) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                    p-4
                    min-h-[120px]
                "
                >
                <div className="flex items-center justify-between mb-3">

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Receitas
                        </p>
                    </div>

                    <div
                        className="
                            w-8
                            h-8
                            sm:w-9
                            sm:h-9
                            rounded-xl
                            bg-green-50
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <TrendingUp
                            size={18}
                            className="text-green-600"
                        />
                    </div>

                </div>

                <h3 className={`
                    text-lg
                    sm:text-xl
                    font-bold
                    break-words`}
                >
                    {relatorio.totalRenda.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </h3>

            </div>

            <div className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
                p-4
                "
                >
                <div className="flex items-center justify-between mb-3">

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Despesas
                    </p>

                    <div
                        className="
                            w-8
                            h-8
                            sm:w-9
                            sm:h-9
                            rounded-xl
                            bg-green-50
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <TrendingDown
                            size={18}
                            className="text-red-600"
                        />
                    </div>

                </div>

                <h3 className={`
                    text-lg
                    sm:text-xl
                    font-bold
                    break-words`}
                >
                    {relatorio.totalDespesas.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </h3>

            </div>

            <div
                className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
                p-4
                "
            >
                <div className="flex items-center justify-between mb-3">

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Saldo
                    </p>

                    <div
                        className="
                            w-8
                            h-8
                            sm:w-9
                            sm:h-9
                            rounded-xl
                            bg-green-50
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Wallet
                            size={18}
                            className="text-blue-600"
                        />
                    </div>

                </div>

                <h3 className={`
                    text-lg
                    sm:text-xl
                    font-bold
                    break-words>
                    ${
                        relatorio.saldo >= 0
                            ? "text-blue-600"
                            : "text-red-600"
                    }
                `}
                >
                    {relatorio.saldo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </h3>

            </div>

        </div>
    );
}