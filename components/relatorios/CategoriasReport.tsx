"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

import {
    RelatorioCategoriaResponse
} from "@/types/relatorio.types";
import {useEffect, useState} from "react";
import {PieChartIcon, Receipt} from "lucide-react";

interface CategoriasReportProps {
    categorias: RelatorioCategoriaResponse[];
}

const COLORS = [
    "#2563EB",
    "#F59E0B",
    "#10B981",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
];

export default function CategoriasReport({
                                             categorias
                                         }: CategoriasReportProps) {

    const categoriasOrdenadas =
        [...categorias].sort(
            (a, b) => b.total - a.total
        );

    const categoriasDespesas = categorias.filter(
        (categoria) => categoria.tipo === "DESPESA"
    );

    const possuiDespesas =
        categoriasDespesas.some(
            categoria => categoria.total > 0
        );

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <div className="
                    bg-white
                    border
                    border-gray-100
                    rounded-2xl
                    p-4
                    sm:p-6
                    shadow-sm
                "
            >

                <div className="mb-5">

                    <h2 className="font-semibold text-base sm:text-lg">
                        Distribuição por categoria
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Visualize como suas despesas estão distribuídas.
                    </p>

                </div>

                {possuiDespesas ? (

                    mounted && (

                            <div className="w-full h-[260px] sm:h-[300px] min-w-0">
                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <PieChart>

                                        <Pie
                                            data={categoriasDespesas}
                                            dataKey="total"
                                            nameKey="categoria"
                                            innerRadius={70}
                                            outerRadius={110}
                                            isAnimationActive={true}
                                            animationDuration={900}
                                            animationBegin={0}
                                        >

                                            {categoriasDespesas.map((_, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                            ]
                                                    }
                                                />

                                            ))}

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>
                            </div>

                    )

                ) : (

                    <div className="
                            h-[240px]
                            sm:h-[300px]
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        "
                    >

                        <div className="
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
                            <PieChartIcon
                                size={30}
                                className="text-[#1E7A3C]"
                            />
                        </div>

                        <h3 className="text-lg font-semibold">
                            Nenhuma despesa registrada
                        </h3>

                        <p className="text-gray-500 mt-2 max-w-xs">
                            Assim que você registrar despesas,
                            o gráfico mostrará a distribuição entre
                            suas categorias.
                        </p>

                    </div>

                )}

            </div>

            <div className="
                    bg-white
                    border
                    border-gray-100
                    rounded-2xl
                    shadow-sm
                    overflow-hidden
                    overflow-x-auto
                "
            >

                <div className="p-5 border-b border-gray-100">

                    <h3 className="font-semibold">
                        Detalhamento
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Gastos por categoria.
                    </p>

                </div>

                {possuiDespesas ? (
                    <>
                        <div className="
                                grid
                                px-4
                                sm:px-5
                                py-3
                                text-xs
                                uppercase
                                font-semibold
                                tracking-wide
                                text-gray-500
                                border-b
                            "
                        >

                            <span>Categoria</span>

                            <span className="text-right">
                                Valor
                            </span>

                        </div>

                        {categoriasDespesas.map((item, index) => (

                            <div
                                key={item.categoriaId}
                                className="
                                grid
                                grid-cols-2
                                px-4
                                sm:px-5
                                py-3
                                sm:py-4
                                border-b
                                last:border-b-0
                                hover:bg-gray-50
                                transition
                            "
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor:
                                                COLORS[
                                                index %
                                                COLORS.length
                                                    ]
                                        }}
                                    />

                                    <span className="
                                            font-medium
                                            text-sm
                                            sm:text-base
                                            truncate
                                        "
                                    >
                                        {item.categoria}
                                    </span>

                                </div>

                                <span className="
                                        text-right
                                        font-semibold
                                        text-sm
                                        sm:text-base
                                        whitespace-nowrap
                                    "
                                >
                                    {item.total.toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL"
                                        }
                                    )}
                                </span>

                            </div>

                        ))}

                    </>

                ) : (

                    <div
                        className="
                        h-[240px]
                        sm:h-[300px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        px-8
                        "
                        >

                        <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-[#1E7A3C]/10
                                flex
                                items-center
                                justify-center
                                mb-5
                            "
                            >
                            <Receipt
                                size={26}
                                className="text-[#1E7A3C]"
                            />
                        </div>

                        <h3 className="font-semibold text-lg">
                            Nada para detalhar
                        </h3>

                        <p className="text-gray-500 mt-2">
                            As categorias aparecerão aqui conforme
                            você registrar despesas.
                        </p>

                    </div>

                )}

            </div>
        </div>
    );
}