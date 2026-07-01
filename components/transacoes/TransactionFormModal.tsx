"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    buscarCategoriasPorTipo,
} from "@/services/categoria.service";

import {
    atualizarTransacao,
    criarTransacao,
} from "@/services/transacao.service";

import {
    CategoriaResponse,
} from "@/types/categoria.types";

import { TransacaoResponse }
    from "@/types/transacao.types";

interface TransactionFormModalProps {
    onClose: () => void;
    onSuccess: () => void;

    transacao?: TransacaoResponse;
}

export default function TransactionFormModal({
                                                   onClose,
                                                   onSuccess,
                                                    transacao
                                               }: TransactionFormModalProps) {

    const [descricao, setDescricao] =
        useState(
            transacao?.descricao ?? ""
        );

    const [valor, setValor] =
        useState(
            transacao?.valor.toString() ?? ""
        );

    const [tipoTransacao, setTipoTransacao] =
        useState(
            transacao?.tipoTransacao ?? "DESPESA"
        );

    const [dataTransacao, setDataTransacao] =
        useState(
            transacao?.dataTransacao ??
            new Date().toISOString().split("T")[0]
        );

    const [categoriaId, setCategoriaId] =
        useState(
            transacao?.categoriaId.toString() ?? ""
        );

    const [categorias, setCategorias] =
        useState<CategoriaResponse[]>([]);

    useEffect(() => {

        async function carregarCategorias() {

            if (!tipoTransacao) {
                setCategorias([]);
                return;
            }

            try {

                const dados =
                    await buscarCategoriasPorTipo(
                        tipoTransacao
                    );

                setCategorias(dados);

            } catch (error) {

                console.error(error);

            }
        }

        carregarCategorias();

    }, [tipoTransacao]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        try {

            if (transacao) {

                console.log("Transação selecionada:", transacao);
                console.log("ID enviado:", transacao?.id);
                await atualizarTransacao(
                    transacao.id,
                    {
                        descricao,
                        valor: Number(valor),
                        tipoTransacao,
                        dataTransacao,
                        categoria_id: Number(categoriaId),
                    }
                );

            } else {

                await criarTransacao({
                    descricao,
                    valor: Number(valor),
                    tipoTransacao,
                    dataTransacao,
                    categoria_id: Number(categoriaId),
                });

            }

            onSuccess();
            onClose();

        } catch (error) {

            console.error(error);

        }
    }

    return (
        <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                bg-white
                p-8
                rounded-2xl
                shadow-xl
                w-full
                max-w-lg
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        mb-6
                    "
                >
                    {transacao
                        ? "Editar Transação"
                        : "Nova Transação"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
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
                            onClick={() =>
                                setTipoTransacao("DESPESA")
                            }
                            className={`
                                flex-1
                                p-2
                                border
                                rounded
                                ${
                                tipoTransacao === "DESPESA"
                                    ? "bg-black text-white"
                                    : "bg-white"
                            }
                            `}
                        >
                            Despesa
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setTipoTransacao("RENDA")
                            }
                            className={`
                                flex-1
                                p-2
                                border
                                rounded
                                ${
                                tipoTransacao === "RENDA"
                                    ? "bg-black text-white"
                                    : "bg-white"
                            }   
                            `}
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
                        Descrição
                    </label>

                    <input
                        type="text"
                        placeholder="Digite a descrição..."
                        value={descricao}
                        onChange={(event) =>
                            setDescricao(
                                event.target.value
                            )
                        }
                        className="
                            w-full
                            bg-gray-50
                            border
                            border-gray-200
                            rounded-lg
                            px-3
                            py-2"
                    />

                    <label
                        className="
                        block
                        text-sm
                        font-medium
                        mb-2"
                    >
                        Valor
                    </label>

                    <input
                        type="number"
                        placeholder="0,00"
                        value={valor}
                        onChange={(event) =>
                            setValor(
                                event.target.value
                            )
                        }
                        className="
                            w-full
                            bg-gray-50
                            border
                            border-gray-200
                            rounded-lg
                            px-3
                            py-2"
                    />

                    <label
                        className="
                        block
                        text-sm
                        font-medium
                        mb-2"
                    >
                        Categoria
                    </label>

                    <select
                        value={categoriaId}
                        onChange={(event) =>
                            setCategoriaId(
                                event.target.value
                            )
                        }
                        disabled={!tipoTransacao}
                        className="
                        w-full
                        bg-gray-50
                        border
                        border-gray-200
                        rounded-lg
                        px-3
                        py-2"
                    >

                        <option value="">
                            Selecione a categoria
                        </option>

                        {categorias.map(
                            (categoria) => (

                                <option
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.nome}
                                </option>

                            )
                        )}

                    </select>

                    <label
                        className="
                        block
                        text-sm
                        font-medium
                        mb-2"
                    >
                        Data
                    </label>

                    <input
                        type="date"
                        value={dataTransacao}
                        onChange={(event) =>
                            setDataTransacao(
                                event.target.value
                            )
                        }
                        className="
                            w-full
                            bg-gray-50
                            border
                            border-gray-200
                            rounded-lg
                            px-3
                            py-2"
                    />

                    <div
                        className="
                            flex
                            justify-end
                            gap-2
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                px-4
                                py-2
                                border
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="
                                px-4
                                py-2
                                bg-black
                                text-white
                            "
                        >
                            Salvar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}