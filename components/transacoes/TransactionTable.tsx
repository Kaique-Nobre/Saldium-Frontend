"use client";

import {TransacaoResponse} from "@/types/transacao.types";

interface TransactionTableProps {
    transacoes: TransacaoResponse[];
    onDelete: (id: number) => void;
    onEdit: (
        transacao: TransacaoResponse
    ) => void;
}

export default function TransactionTable({transacoes, onDelete, onEdit}: TransactionTableProps) {

    return (
        <>
            {/* DESKTOP */}
            <div
                className="
                hidden
                lg:block
                overflow-x-auto
                bg-white
                border
                rounded-xl
                shadow-sm
            "
            >

                <table className="w-full border-collapse">

                    <thead>

                    <tr className="border-b bg-gray-50">

                        <th className="text-left p-3">
                            Descrição
                        </th>

                        <th className="text-left p-3">
                            Categoria
                        </th>

                        <th className="text-left p-3">
                            Tipo
                        </th>

                        <th className="text-left p-3">
                            Data
                        </th>

                        <th className="text-left p-3">
                            Valor
                        </th>

                        <th className="text-left p-3">
                            Ações
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {transacoes.map((transacao) => (

                        <tr
                            key={transacao.id}
                            className="
                            border-b
                            hover:bg-gray-50
                            transition-colors
                        "
                        >

                            <td className="p-4">
                                <div className="
                                        max-w-[280px]
                                        truncate
                                        font-medium
                                    "
                                    title={transacao.descricao}
                                >
                                    {transacao.descricao}
                                </div>
                            </td>

                            <td className="p-4">
                            <span
                                className="
                                    px-3
                                    py-1
                                    rounded-md
                                    bg-gray-100
                                    text-gray-700
                                    text-sm
                                    font-medium
                                "
                            >
                                {transacao.categoria}
                            </span>
                            </td>

                            <td className="p-4">

                                {transacao.tipoTransacao === "RENDA" ? (

                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                    Receita
                                </span>

                                ) : (

                                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                                    Despesa
                                </span>

                                )}

                            </td>

                            <td className="p-4 text-gray-600">
                                {new Date(transacao.dataTransacao).toLocaleDateString("pt-BR")}
                            </td>

                            <td
                                className={`
                                p-4
                                font-semibold
                                ${
                                    transacao.tipoTransacao === "RENDA"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            `}
                            >
                                {transacao.tipoTransacao === "RENDA" ? "+" : "-"}
                                R$
                                {transacao.valor.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                })}
                            </td>

                            <td className="p-4">

                                <div className="flex gap-2">

                                    <button
                                        onClick={() => onEdit(transacao)}
                                        className="px-3 py-1 rounded-md border hover:bg-gray-100"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => onDelete(transacao.id)}
                                        className="px-3 py-1 rounded-md border text-red-600 hover:bg-red-50"
                                    >
                                        Excluir
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

            {/* MOBILE */}
            <div className="lg:hidden space-y-4">

                {transacoes.map((transacao) => (

                    <div
                        key={transacao.id}
                        className="
                        bg-white
                        border
                        rounded-2xl
                        p-4
                        shadow-sm
                    "
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <h3 className="
                                    font-semibold
                                    text-gray-900
                                    break-all
                                "
                                >
                                    {transacao.descricao}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(
                                        transacao.dataTransacao
                                    ).toLocaleDateString("pt-BR")}
                                </p>

                            </div>

                            <span
                                className={`
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ${
                                    transacao.tipoTransacao === "RENDA"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }
                            `}
                            >
                            {transacao.tipoTransacao === "RENDA"
                                ? "Receita"
                                : "Despesa"}
                        </span>

                        </div>

                        <div className="mt-4">

                        <span className="text-sm text-gray-500">
                            Categoria
                        </span>

                            <div className="mt-1">

                            <span
                                className="
                                    px-3
                                    py-1
                                    rounded-md
                                    bg-gray-100
                                    text-sm
                                "
                            >
                                {transacao.categoria}
                            </span>

                            </div>

                        </div>

                        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <span
                            className={`
                                text-xl
                                font-bold
                                whitespace-nowrap
                                ${
                                transacao.tipoTransacao === "RENDA"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                            `}
                        >
                            {transacao.tipoTransacao === "RENDA" ? "+" : "-"}
                            R$
                            {transacao.valor.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })}
                        </span>

                            <div className="flex gap-2">

                                <button
                                    onClick={() => onEdit(transacao)}
                                    className="
                                    px-3
                                    py-2
                                    rounded-lg
                                    border
                                    text-sm
                                "
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => onDelete(transacao.id)}
                                    className="
                                    px-3
                                    py-2
                                    rounded-lg
                                    border
                                    text-red-600
                                    text-sm
                                "
                                >
                                    Excluir
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>
        </>
    );
}