"use client";

import { useEffect, useState } from "react";
import {
    CategoriaRequest,
    CategoriaResponse,
} from "@/types/categoria.types";

interface CategoriaFormModalProps {
    onClose: () => void;
    onSubmit: (categoria: CategoriaRequest) => Promise<void>;
    categoriaEditando?: CategoriaResponse | null;
}

export default function CategoriaFormModal({
                                               onClose,
                                               onSubmit,
                                               categoriaEditando,
                                           }: CategoriaFormModalProps) {

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("DESPESA");

    useEffect(() => {
        if (categoriaEditando) {
            setNome(categoriaEditando.nome);
            setTipo(categoriaEditando.tipo);
        } else {
            setNome("");
            setTipo("DESPESA");
        }
    }, [categoriaEditando]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await onSubmit({
            nome,
            tipo,
        });

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">

                <h2 className="text-xl font-semibold mb-4">
                    {categoriaEditando
                        ? "Editar Categoria"
                        : "Nova Categoria"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <label
                        className="
                        block
                        text-sm
                        font-medium
                        mb-2"
                    >
                        Tipo
                    </label>

                    <div className="flex gap-2">

                        <button
                            type="button"
                            onClick={() => setTipo("DESPESA")}
                            className={`flex-1 p-2 border rounded ${
                                tipo === "DESPESA"
                                    ? "bg-black text-white"
                                    : "bg-white"
                            }`}
                        >
                            Despesa
                        </button>

                        <button
                            type="button"
                            onClick={() => setTipo("RENDA")}
                            className={`flex-1 p-2 border rounded ${
                                tipo === "RENDA"
                                    ? "bg-black text-white"
                                    : "bg-white"
                            }`}
                        >
                            Renda
                        </button>

                    </div>

                    <label
                        className="
                        block
                        text-sm
                        font-medium
                        mb-2"
                    >
                        Nome
                    </label>

                    <input
                        type="text"
                        placeholder="Digite o nome..."
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full border p-2"
                        required
                    />



                    <div className="flex justify-end gap-2 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded"
                        >
                            Salvar
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}