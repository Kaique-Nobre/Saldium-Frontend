"use client";

import { RelatorioCategoriaResponse }
    from "@/types/relatorio.types";

interface RelatorioCategoriasProps {
    dados: RelatorioCategoriaResponse[];
}

export default function RelatorioCategorias({
                                                dados,
                                            }: RelatorioCategoriasProps) {

    return (
        <div className="bg-white border rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-4">
                Categorias
            </h2>

            {
                dados.length === 0 ? (
                    <p className="text-gray-500">
                        Nenhuma categoria encontrada.
                    </p>
                ) : (
                    <table className="w-full">

                        <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">
                                Categoria
                            </th>

                            <th className="text-right py-3">
                                Total
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {
                            dados.map(
                                (item) => (
                                    <tr
                                        key={
                                            item.categoria
                                        }
                                        className="border-b"
                                    >

                                        <td className="py-3">
                                            {
                                                item.categoria
                                            }
                                        </td>

                                        <td className="py-3 text-right font-medium">
                                            {
                                                item.total.toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }
                                                )
                                            }
                                        </td>

                                    </tr>
                                )
                            )
                        }

                        </tbody>

                    </table>
                )
            }

        </div>
    );
}