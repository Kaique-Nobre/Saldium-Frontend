"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

import { RelatorioAnualMesResponse } from "@/types/relatorio.types";
import {BarChart3} from "lucide-react";

interface RelatorioGraficoProps {
    dados: RelatorioAnualMesResponse[];
}

const nomesMeses = [
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

export default function RelatorioGrafico({
                                             dados,
                                         }: RelatorioGraficoProps) {

    const dadosFormatados = Array.from(
        { length: 12 },
        (_, index) => {

            const numeroMes = index + 1;

            const dadoMes =
                dados.find(
                    item =>
                        item.mes === numeroMes
                );

            return {
                mes: nomesMeses[numeroMes],
                renda:
                    dadoMes?.totalRenda ?? 0,
                despesas:
                    dadoMes?.totalDespesas ?? 0,
            };
        }
    );

    const possuiDados = dadosFormatados.some(
        item =>
            item.renda > 0 ||
            item.despesas > 0
    );

    return (
        <div
            className="
            bg-white
            border
            border-gray-100
            rounded-2xl
            shadow-sm
            p-4
            sm:p-6
        "
        >

            <div className="mb-5">

                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    Receitas vs Despesas
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Comparação mensal das suas movimentações.
                </p>

            </div>

            {possuiDados ? (

                <div className="w-full overflow-x-auto">
                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <BarChart
                            data={dadosFormatados}
                        >

                            <CartesianGrid
                                strokeDasharray="4 4"
                                opacity={0.15}
                            />

                            <XAxis
                                dataKey="mes"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 11 }}
                                interval={0}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 11 }}
                                width={40}
                            />

                            <Tooltip />

                            <Legend
                                wrapperStyle={{
                                    fontSize: 12,
                                    paddingTop: 12,
                                }}
                            />

                            <Bar
                                dataKey="renda"
                                name="Receitas"
                                fill="#22C55E"
                                radius={[6,6,0,0]}
                                isAnimationActive={true}
                                animationDuration={900}
                                animationBegin={0}
                            />

                            <Bar
                                dataKey="despesas"
                                name="Despesas"
                                fill="#EF4444"
                                radius={[6,6,0,0]}
                                isAnimationActive={true}
                                animationDuration={900}
                                animationBegin={0}
                            />

                        </BarChart>

                    </ResponsiveContainer>
                </div>

            ) : (

                <div
                    className="
                    h-[260px]
                    sm:h-[320px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                "
                >

                    <div
                        className="
                        w-14
                        h-14
                        sm:w-16
                        sm:h-16
                        rounded-2xl
                        bg-[#1E7A3C]/10
                        flex
                        items-center
                        justify-center
                        mb-5
                    "
                    >
                        <BarChart3
                            size={30}
                            className="text-[#1E7A3C]"
                        />
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold">
                        Ainda não há dados suficientes
                    </h3>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-2
                        max-w-sm
                        px-4
                        sm:px-0
                    "
                    >
                        Assim que você registrar receitas ou despesas,
                        este gráfico mostrará a evolução financeira ao longo
                        dos meses.
                    </p>

                </div>

            )}

        </div>
    );
}