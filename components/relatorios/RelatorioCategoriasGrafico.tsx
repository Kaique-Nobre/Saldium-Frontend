"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

interface Categoria {
    categoria: string;
    total: number;
}

interface Props {
    dados: Categoria[];
}

export default function RelatorioCategoriasGrafico({
                                                       dados
                                                   }: Props) {

    return (
        <div className="bg-white border rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-4">
                Gastos por Categoria
            </h2>

            <div style={{ width: "100%", height: 350 }}>

                <ResponsiveContainer width="99%"
                                     height={350}>

                    <BarChart data={dados}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="categoria" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="total"
                            fill="#dc2626"
                            name="Total gasto"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}