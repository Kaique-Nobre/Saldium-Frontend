"use client";

import { useEffect, useRef, useState } from "react";
import { RelatorioCategoriaResponse } from "@/types/relatorio.types";
import { MoreHorizontal } from "lucide-react";

interface CategoriaCardProps {
    categoria: RelatorioCategoriaResponse;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CategoriaCard({
                                          categoria,
                                          onEdit,
                                          onDelete,
                                      }: CategoriaCardProps) {

    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const podeEditarExcluir =
        categoria.categoriaDoSistema === false &&
        categoria.total === 0;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className="
            w-full
            relative
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-5
            sm:p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:border-[#1E7A3C]/20
        "
        >

            {/* HEADER */}
            <div className="
                    flex
                    justify-between
                    items-start
                    gap-3
                "
            >

                <div>
                    <p className="
                        text-base
                        sm:text-lg
                        font-semibold
                        text-gray-900
                        break-words
                    "
                    >
                        {categoria.categoria}
                    </p>
                </div>

                {/* BADGE + MENU */}
                <div className="flex items-center gap-2">

                    {/* BADGE ORIGEM */}
                    <span
                        className={`
                        inline-flex
                        items-center
                        rounded-full
                        font-semibold
                        px-2.5
                        py-1
                        text-[11px]
                        sm:px-3
                        sm:text-xs
                        ${
                            categoria.categoriaDoSistema
                                ? "bg-gray-100 text-gray-600"
                                : "bg-[#1E7A3C]/10 text-[#1E7A3C]"
                        }
                        `}
                                >
                        {categoria.categoriaDoSistema
                            ? "Sistema"
                            : "Usuário"}
                    </span>

                    {/* MENU */}
                    {podeEditarExcluir && (
                        <div className="relative" ref={menuRef}>

                            <button
                                onClick={() => setMenuAberto(!menuAberto)}
                                className="
                                    w-10
                                    h-10
                                    sm:w-9
                                    sm:h-9
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-gray-100
                                    transition
                                "
                            >

                                <MoreHorizontal size={18} />

                            </button>

                            {menuAberto && (
                                <div className="
                                        absolute
                                        right-0
                                        mt-2
                                        w-44
                                        rounded-2xl
                                        border
                                        bg-white
                                        shadow-xl
                                        overflow-hidden
                                        z-20
                                        ">
                                    <button
                                        onClick={() => {
                                            setMenuAberto(false);
                                            onEdit();
                                        }}
                                        className="
                                        w-full
                                        px-4
                                        py-3
                                        text-left
                                        text-sm
                                        min-h-[48px]
                                        flex
                                        items-center
                                        hover:bg-gray-50
                                        transition
                                        "
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMenuAberto(false);
                                            onDelete();
                                        }}
                                        className="
                                        w-full
                                        px-4
                                        py-3
                                        text-left
                                        text-sm
                                        text-red-600
                                        hover:bg-red-50
                                        transition
                                        "
                                    >
                                        Excluir
                                    </button>

                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>

            {/* VALOR */}
            <div className="mt-6 sm:mt-8">

                <p className="text-xs uppercase tracking-wide text-gray-500">
                    {
                        categoria.tipo === "DESPESA"
                            ? "Total gasto"
                            : "Total recebido"
                    }
                </p>

                <p
                    className={`
                        mt-2
                        text-2xl
                        sm:text-3xl
                        font-semibold

                        ${
                        categoria.tipo === "DESPESA"
                            ? "text-black-600"
                            : "text-[#1E7A3C]"
                    }
                        `}
                        >

                    {categoria.total.toLocaleString(
                        "pt-BR",
                        {
                            style: "currency",
                            currency: "BRL",
                        }
                    )}

                </p>

            </div>

        </div>
    );
}