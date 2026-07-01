"use client";

import { TransacaoResponse } from "@/types/transacao.types";
import Link from "next/link";

interface UltimasTransacoesProps {
    transacoes: TransacaoResponse[];
}

export default function UltimasTransacoes({
                                              transacoes,
                                          }: UltimasTransacoesProps) {

    return (

        <div className="bg-white border rounded-lg">

            <div className="flex justify-between items-center p-4 border-b">

                <h2 className="font-semibold">
                    Últimas transações
                </h2>

                <Link
                    href="/transacoes"
                    className="
        text-sm
        text-blue-600
        hover:text-blue-700
    "
                >
                    Ver todas →
                </Link>

            </div>

            <table className="w-full">

                <thead>

                <tr className="text-left text-sm text-gray-500">

                    <th className="p-4">
                        Descrição
                    </th>

                    <th className="p-4">
                        Categoria
                    </th>

                    <th className="p-4">
                        Data
                    </th>

                    <th className="p-4 text-right">
                        Valor
                    </th>

                </tr>

                </thead>

                <tbody>

                {
                    transacoes.map((transacao) => (

                        <tr
                            key={transacao.id}
                            className="border-t"
                        >

                            <td className="p-4">

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            transacao.tipoTransacao === "RENDA"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    />

                                    <span>
                        {transacao.descricao}
                    </span>

                                </div>

                            </td>

                            <td className="p-4">

                <span className="
                    bg-gray-100
                    text-gray-700
                    px-2
                    py-1
                    rounded-md
                    text-xs
                ">
                    {transacao.categoria}
                </span>

                            </td>

                            <td className="p-4 text-gray-500">

                                {
                                    new Date(
                                        transacao.dataTransacao
                                    ).toLocaleDateString(
                                        "pt-BR"
                                    )
                                }

                            </td>

                            <td
                                className={`p-4 text-right font-semibold ${
                                    transacao.tipoTransacao === "RENDA"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >

                                {
                                    transacao.tipoTransacao === "RENDA"
                                        ? "+"
                                        : "-"
                                }

                                R$ {transacao.valor.toFixed(2)}

                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

        </div>

    );
}