"use client";

import { CategoriaResponse }
    from "@/types/categoria.types";

interface CategoriaTableProps {
    categorias: CategoriaResponse[];
    onEdit: (categoria: CategoriaResponse) => void;
    onDelete: (id: number) => void;
}

export default function CategoriaTable({
                                           categorias,
                                            onDelete,
                                            onEdit
                                       }: CategoriaTableProps) {

    return (

        <div className="bg-white border rounded-lg">

            <table className="w-full">

                <thead>


                <tr className="border-b">

                    <th className="text-left p-4">
                        Nome
                    </th>

                    <th className="text-left p-4">
                        Tipo
                    </th>

                    <th className="text-left p-4">
                        Origem
                    </th>

                    <th className="text-left p-4">
                        Ações
                    </th>
                </tr>

                </thead>

                <tbody>

                {
                    categorias.map(
                        (categoria) => (

                            <tr
                                key={categoria.id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {categoria.nome}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            font-medium
                                
                                            ${
                                            categoria.tipo === "RENDA"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }
                                        `}
                                    >
                                        {categoria.tipo}
                                    </span>

                                </td>

                                <td className="p-4">

                                    <span
                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            font-medium
                                
                                            ${
                                            categoria.categoriaDoSistema
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-700"
                                        }
                                        `}
                                    >
                                        {
                                            categoria.categoriaDoSistema
                                                ? "Sistema"
                                                : "Usuário"
                                        }
                                    </span>

                                </td>
                                <td className="p-4">

                                    {
                                        categoria.categoriaDoSistema
                                            ? (
                                                <span className="text-gray-400">

                                                </span>
                                            )
                                            : (
                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            onEdit(
                                                                categoria
                                                            )
                                                        }
                                                        className="
                                                        px-3
                                                        py-1
                                                        border
                                                        rounded-lg
                                                        hover:bg-gray-100"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            onDelete(
                                                                categoria.id
                                                            )
                                                        }
                                                        className="
                                                        px-3
                                                        py-1
                                                        border
                                                        border-red-200
                                                        text-red-600
                                                        rounded-lg
                                                        hover:bg-red-50"
                                                    >
                                                        Excluir
                                                    </button>

                                                </div>
                                            )
                                    }

                                </td>

                            </tr>
                        )
                    )
                }

                </tbody>

            </table>

        </div>
    );
}