"use client";

import { RelatorioCategoriaResponse }
    from "@/types/relatorio.types";

interface Props {
    dados: RelatorioCategoriaResponse[];
}

export default function GastosPorCategoria({
                                               dados
                                           }: Props) {

    const despesas = dados
        .filter(
            categoria =>
                categoria.tipo === "DESPESA"
        )
        .sort(
            (a, b) =>
                b.total - a.total
        );

    const maiorValor =
        despesas.length > 0
            ? despesas[0].total
            : 0;

    return (
        <div className="bg-white border rounded-lg p-6">

            <h2 className="text-xl font-semibold mb-6">
                Gastos por categoria
            </h2>

            <p className="text-sm text-gray-500 mb-6">
                Mês atual
            </p>

            <div className="space-y-5">

                {
                    despesas.map(categoria => {

                        const porcentagem =
                            (categoria.total / maiorValor) * 100;

                        return (

                            <div
                                key={categoria.categoria}
                            >

                                <div className="
                                    flex
                                    justify-between
                                    mb-2
                                ">

                                    <span className="font-medium">
                                        {categoria.categoria}
                                    </span>

                                    <span>
                                        {
                                            categoria.total
                                                .toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL"
                                                    }
                                                )
                                        }
                                    </span>

                                </div>

                                <div className="
                                    w-full
                                    h-3
                                    bg-gray-200
                                    rounded-full
                                ">

                                    <div
                                        className="
                                            h-3
                                            bg-blue-600
                                            rounded-full
                                        "
                                        style={{
                                            width: `${porcentagem}%`
                                        }}
                                    />

                                </div>

                            </div>

                        );
                    })
                }

            </div>

        </div>
    );
}