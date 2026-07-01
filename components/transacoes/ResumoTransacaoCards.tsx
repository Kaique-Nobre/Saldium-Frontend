"use client";

import {
    TrendingUp,
    TrendingDown,
    Wallet
} from "lucide-react";

interface Props {
    receitas: number;
    despesas: number;
    saldo: number;
}

export default function ResumoTransacoesCards({
                                                  receitas,
                                                  despesas,
                                                  saldo,
                                              }: Props) {

    const cards = [

        {
            titulo: "Receitas",
            valor: receitas,
            icon: TrendingUp,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
            valueColor: "text-green-600"
        },

        {
            titulo: "Despesas",
            valor: despesas,
            icon: TrendingDown,
            iconBg: "bg-red-50",
            iconColor: "text-red-600",
            valueColor: "text-red-600"
        },

        {
            titulo: "Saldo",
            valor: saldo,
            icon: Wallet,
            iconBg: "bg-blue-50",
            iconColor:
                saldo >= 0
                    ? "text-blue-600"
                    : "text-red-600",
            valueColor:
                saldo >= 0
                    ? "text-blue-600"
                    : "text-red-600"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {

                cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={index}
                            className="
                                group
                                bg-white
                                border
                                border-gray-200
                                rounded-2xl
                                shadow-sm
                                px-5
                                py-4
                                transition-all
                                duration-300
                                hover:shadow-md
                                hover:-translate-y-0.5
                            "
                        >

                            <div className="flex justify-between items-start">

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

                                    <h3
                                        className={`
                                            mt-2
                                            text-2xl
                                            font-bold
                                            ${card.valueColor}
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

                                    </h3>
                                </div>

                                <div
                                    className={`
                                        w-10
                                        h-10
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        transition-transform
                                        group-hover:scale-110

                                        ${card.iconBg}
                                    `}
                                >

                                    <Icon
                                        size={18}
                                        className={card.iconColor}
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}