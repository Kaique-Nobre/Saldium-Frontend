"use client";

import { useEffect, useState } from "react";

import {
    CategoriaRequest, CategoriaResponse,
} from "@/types/categoria.types";

interface CategoriaFormProps {
    onSubmit: (
        categoria: CategoriaRequest
    ) => Promise<void>;
    categoriaEditando?: CategoriaResponse | null;

    onCancelarEdicao?: () => void;
}

export default function CategoriaForm({
                                          onSubmit,
                                            categoriaEditando,
                                            onCancelarEdicao
                                      }: CategoriaFormProps) {

    const [nome, setNome] =
        useState(
            categoriaEditando?.nome ?? ""
        );

    const [tipo, setTipo] =
        useState(
            categoriaEditando?.tipo ?? "DESPESA"
        );

    useEffect(() => {

        if (categoriaEditando) {

            setNome(
                categoriaEditando.nome
            );

            setTipo(
                categoriaEditando.tipo
            );

        } else {

            setNome("");

            setTipo("DESPESA");

        }

    }, [categoriaEditando]);

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        await onSubmit({
            nome,
            tipo,
        });

        setNome("");
        setTipo("DESPESA");
    }

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-lg p-6 mb-6"
        >

            <h2 className="text-lg font-semibold mb-4">
                Nova Categoria
            </h2>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Nome da categoria"
                    value={nome}
                    onChange={(event) =>
                        setNome(
                            event.target.value
                        )
                    }
                    className="w-full border rounded p-2"
                    required
                />

                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={() =>
                            setTipo("RENDA")
                        }
                        className={
                            tipo === "RENDA"
                                ? "px-4 py-2 border rounded bg-green-600 text-white"
                                : "px-4 py-2 border rounded"
                        }
                    >
                        Renda
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setTipo("DESPESA")
                        }
                        className={
                            tipo === "DESPESA"
                                ? "px-4 py-2 border rounded bg-red-600 text-white"
                                : "px-4 py-2 border rounded"
                        }
                    >
                        Despesa
                    </button>

                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {
                        categoriaEditando
                            ? "Salvar Alterações"
                            : "Criar Categoria"
                    }
                </button>

                {
                    categoriaEditando && (

                        <button
                            type="button"
                            onClick={
                                onCancelarEdicao
                            }
                            className="
                            ml-2
                            px-4 py-2
                            border
                            rounded"
                        >
                            Cancelar
                        </button>

                    )
                }

            </div>

        </form>
    );
}