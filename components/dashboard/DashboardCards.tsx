"use client";

import {
    TrendingUp,
    TrendingDown,
    Wallet
} from "lucide-react";
import {RelatorioResponse} from "@/types/relatorio.types";

interface Props {
    relatorio: RelatorioResponse | null;
}

export default function DashboardCards({
                                           relatorio
                                       }: Props) {

    const possuiMovimentacoes =
        relatorio &&
        (
            relatorio.totalRenda > 0 ||
            relatorio.totalDespesas > 0
        );

    if (!relatorio) return null;

    const cards = [

        {
            titulo: "Total recebido",
            valor: relatorio.totalRenda,
            descricao: possuiMovimentacoes
                ? "Entradas do mês"
                : "Nenhuma receita registrada",
            icon: TrendingUp,
            iconBg: "bg-green-50",
            iconColor: "text-green-600"
        },

        {
            titulo: "Total gasto",
            valor: relatorio.totalDespesas,
            descricao: possuiMovimentacoes
                ? "Saídas do mês"
                : "Nenhuma despesa registrada",
            icon: TrendingDown,
            iconBg: "bg-red-50",
            iconColor: "text-red-600"
        },

        {
            titulo: "Saldo",
            valor: relatorio.saldo,
            descricao: possuiMovimentacoes
                ? (
                    relatorio.saldo >= 0
                        ? "Superávit do mês"
                        : "Déficit do mês"
                )
                : "Aguardando movimentações",
            icon: Wallet,
            iconBg: "bg-blue-50",
            iconColor:
                relatorio.saldo >= 0
                    ? "text-blue-600"
                    : "text-red-600"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {

                cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={index}
                            className="
                                group
                                bg-white
                                rounded-3xl
                                border
                                border-gray-200
                                p-6
                                shadow-sm
                                transition-all
                                duration-300
                                hover:shadow-lg
                                hover:-translate-y-1
                            "
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-wider
                                            font-semibold
                                            text-gray-500
                                        "
                                    >
                                        {card.titulo}
                                    </p>

                                    <h2
                                        className={`
                                            mt-4
                                            text-4xl
                                            font-bold
                                            tracking-tight

                                            ${
                                            index === 2
                                                ? (
                                                    relatorio.saldo >= 0
                                                        ? "text-blue-600"
                                                        : "text-red-600"
                                                )
                                                : "text-gray-900"
                                        }
                                        `}
                                    >

                                        {

                                            card.valor.toLocaleString(
                                                "pt-BR",
                                                {
                                                    style: "currency",
                                                    currency: "BRL"
                                                }
                                            )

                                        }

                                    </h2>

                                </div>

                                <div
                                    className={`
                                        w-12
                                        h-12
                                        rounded-2xl
                                        flex
                                        items-center
                                        justify-center
                                        transition-transform
                                        group-hover:scale-110

                                        ${card.iconBg}
                                    `}
                                >

                                    <Icon
                                        size={22}
                                        className={card.iconColor}
                                    />

                                </div>

                            </div>

                            <div
                                className="
                                    mt-6
                                    pt-4
                                    border-t
                                    border-gray-100
                                "
                            >

                                <span
                                    className="
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    {card.descricao}
                                </span>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}