"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface EvolucaoItem {
    mes: number;
    saldo: number;
}

interface EvolucaoReportProps {
    dados: EvolucaoItem[];
}

export default function EvolucaoReport({
                                           dados,
                                       }: EvolucaoReportProps) {

    const MES_LABELS = [
        "",
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ];

    const dadosFormatados = dados.map((item) => ({
        ...item,
        mes: MES_LABELS[item.mes],
    }));

    const possuiDados =
        dados.some(item => item.saldo !== 0);

    const [isMobile, setIsMobile] =
        useState(false);

    const [showChart, setShowChart] =
        useState(false);

    useEffect(() => {

        const update = () => {
            setIsMobile(window.innerWidth < 640);
        };

        update();

        window.addEventListener(
            "resize",
            update
        );

        return () =>
            window.removeEventListener(
                "resize",
                update
            );

    }, []);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setShowChart(true);
        }, 350);

        return () => clearTimeout(timeout);

    }, []);

    return (

        <div
            className="
                bg-white
                border
                rounded-2xl
                p-6
                shadow-sm
                min-w-0
            "
        >

            <h2 className="text-lg font-semibold mb-3">
                Evolução do Saldo
            </h2>

            <h3 className="text-sm text-gray-500 mb-6">
                Saldo acumulado ao longo do ano
            </h3>

            {possuiDados ? (

                showChart && (

                    <div className="w-full h-[260px] sm:h-[300px] min-w-0">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <LineChart
                                data={dadosFormatados}
                                margin={{
                                    top: 10,
                                    right: isMobile ? 5 : 20,
                                    left: isMobile ? -25 : 0,
                                    bottom: 5,
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    opacity={0.15}
                                />

                                <XAxis
                                    dataKey="mes"
                                    tickLine={false}
                                    axisLine={false}
                                    interval={0}
                                    tick={{
                                        fontSize:
                                            isMobile
                                                ? 11
                                                : 13,
                                    }}
                                />

                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    width={
                                        isMobile
                                            ? 45
                                            : 60
                                    }
                                    tick={{
                                        fontSize:
                                            isMobile
                                                ? 10
                                                : 12,
                                    }}
                                    tickFormatter={(value) =>
                                        isMobile
                                            ? `R$${Math.round(Number(value))}`
                                            : Number(value).toLocaleString(
                                                "pt-BR",
                                                {
                                                    style: "currency",
                                                    currency: "BRL",
                                                    maximumFractionDigits: 0,
                                                }
                                            )
                                    }
                                />

                                <Tooltip
                                    formatter={(value) =>
                                        Number(value).toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL",
                                            }
                                        )
                                    }
                                />

                                <Line
                                    type="monotone"
                                    dataKey="saldo"
                                    stroke="#1E7A3C"
                                    strokeWidth={3}
                                    dot={{
                                        r: isMobile ? 3 : 4,
                                        fill: "#1E7A3C",
                                    }}
                                    activeDot={{
                                        r: isMobile ? 4 : 5,
                                    }}
                                    isAnimationActive
                                    animationDuration={900}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                )

            ) : (

                <div
                    className="
                        h-[300px]
                        flex
                        flex-col
                        items-center
                        justify-center
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
                            mb-5
                        "
                    >

                        <TrendingUp
                            size={30}
                            className="text-[#1E7A3C]"
                        />

                    </div>

                    <h3 className="text-lg font-semibold">
                        Ainda não há evolução para mostrar
                    </h3>

                    <p className="text-gray-500 mt-2 max-w-sm">
                        Conforme você registrar receitas e despesas,
                        será possível acompanhar a evolução do seu saldo
                        ao longo do ano.
                    </p>

                </div>

            )}

        </div>

    );

}