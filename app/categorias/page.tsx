"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

import CategoriaFormModal from "@/components/categorias/CategoriaFormModal";
import CategoriaCard from "@/components/categorias/CategoriaCard";

import {
    buscarCategorias,
    criarCategoria,
    excluirCategoria,
    atualizarCategoria,
} from "@/services/categoria.service";

import {
    CategoriaRequest,
    CategoriaResponse,
} from "@/types/categoria.types";

import {
    RelatorioCategoriaResponse,
} from "@/types/relatorio.types";

import {
    buscarRelatorioCategoria,
} from "@/services/relatorio.service";

import {
    FolderOpen,
    ChartPie,
} from "lucide-react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function CategoriasPage() {

    // =========================
    // STATES (CRUD real)
    // =========================
    const [categorias, setCategorias] =
        useState<CategoriaResponse[]>([]);

    const [categoriaEditando, setCategoriaEditando] =
        useState<CategoriaResponse | null>(null);

    const [modalAberto, setModalAberto] =
        useState(false);

    // =========================
    // STATES (VISUAL / RELATÓRIO)
    // =========================
    const [resumoCategorias, setResumoCategorias] =
        useState<RelatorioCategoriaResponse[]>([]);

    const hoje = new Date();

    const [mesSelecionado, setMesSelecionado] = useState(
        hoje.getMonth() + 1
    );

    useEffect(() => {
        carregarDados();
    }, [mesSelecionado]);

    const [modalDeleteAberto, setModalDeleteAberto] = useState(false);

    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState<number | null>(null);

    const [loadingDelete, setLoadingDelete] = useState(false);

    async function carregarDados() {

        const ano = new Date().getFullYear();

        const [categoriasRes, resumo] = await Promise.all([
            buscarCategorias(),
            buscarRelatorioCategoria(
                ano,
                mesSelecionado
            ),
        ]);

        setCategorias(categoriasRes);
        setResumoCategorias(resumo);
    }

    // =========================
    // CREATE / UPDATE
    // =========================
    async function handleSalvarCategoria(
        categoria: CategoriaRequest
    ) {

        if (categoriaEditando) {

            const updated = await atualizarCategoria(
                categoriaEditando.id,
                categoria
            );

            setCategorias((prev) =>
                prev.map((item) =>
                    item.id === updated.id ? updated : item
                )
            );

        } else {

            const created = await criarCategoria(categoria);

            setCategorias((prev) => [...prev, created]);
        }

        setModalAberto(false);
        setCategoriaEditando(null);
    }

    // =========================
    // DELETE
    // =========================
    function handleDelete(id: number) {

        setCategoriaSelecionada(id);

        setModalDeleteAberto(true);

    }

    async function confirmarDelete() {

        if (categoriaSelecionada === null) return;

        try {

            setLoadingDelete(true);

            await excluirCategoria(categoriaSelecionada);

            setCategorias((prev) =>
                prev.filter((c) => c.id !== categoriaSelecionada)
            );

            setResumoCategorias((prev) =>
                prev.filter((c) => c.categoriaId !== categoriaSelecionada)
            );

        } finally {

            setLoadingDelete(false);

            setModalDeleteAberto(false);

            setCategoriaSelecionada(null);

        }

    }

    // =========================
    // EDIT
    // =========================
    function handleEdit(categoria: RelatorioCategoriaResponse) {
        setCategoriaEditando({
            id: categoria.categoriaId,
            nome: categoria.categoria,
            tipo: categoria.tipo,
            categoriaDoSistema: categoria.categoriaDoSistema,
        });

        setModalAberto(true);
    }

    function abrirCriacao() {
        setCategoriaEditando(null);
        setModalAberto(true);
    }

    // =========================
    // SPLIT VISUAL (RELATÓRIO)
    // =========================
    const despesas = resumoCategorias.filter(
        (c) => c.tipo === "DESPESA"
    );

    const rendas = resumoCategorias.filter(
        (c) => c.tipo === "RENDA"
    );

    // =========================
    // UI
    // =========================
    return (
        <ProtectedRoute>
            <AppLayout>
                <div className="pb-8">

                {/* HEADER */}
                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-5
                        mb-8
                    "
                >

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Categorias
                        </h1>
                        <p className="text-sm text-gray-500">
                            Gerencie suas categorias financeiras
                        </p>
                    </div>

                    <button
                        onClick={abrirCriacao}
                        className="
                            w-full
                            sm:w-auto
                            px-4
                            py-3
                            bg-black
                            text-white
                            rounded-xl
                            hover:bg-gray-800
                            transition

                        "
                    >
                        + Nova Categoria
                    </button>

                </div>

                    <div className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-4
                            mb-8
                        ">

                        <select
                            value={mesSelecionado}
                            onChange={(e) =>
                                setMesSelecionado(Number(e.target.value))
                            }
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                                bg-white
                            "
                        >
                            {[
                                "Janeiro",
                                "Fevereiro",
                                "Março",
                                "Abril",
                                "Maio",
                                "Junho",
                                "Julho",
                                "Agosto",
                                "Setembro",
                                "Outubro",
                                "Novembro",
                                "Dezembro",
                            ].map((mes, index) => (

                                <option
                                    key={index}
                                    value={index + 1}
                                >
                                    {mes}
                                </option>

                            ))}
                        </select>

                    </div>

                {/* CATEGORIAS EM USO */}
                <div className="flex items-center gap-3 mt-8 mb-6">

                    <div className="
                            w-10
                            h-10
                            sm:w-11
                            sm:h-11
                            rounded-2xl
                            bg-[#1E7A3C]/10
                            flex
                            items-center
                            justify-center">

                        <ChartPie
                            size={22}
                            className="text-[#1E7A3C]"
                        />

                    </div>

                    <h2 className="
                            text-xl
                            sm:text-2xl
                            font-bold
                            text-gray-900">
                        Em uso
                    </h2>

                </div>

                {/* DESPESAS EM USO */}
                <h3 className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                    mb-3
                ">
                    Despesas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    {despesas.length > 0 ? (

                        despesas.map(categoria => (
                            <CategoriaCard
                                key={categoria.categoriaId}
                                categoria={categoria}
                                onEdit={() => handleEdit(categoria)}
                                onDelete={() => handleDelete(categoria.categoriaId)}
                            />
                        ))

                    ) : (

                        <div className="
                            md:col-span-3
                            bg-white
                            rounded-2xl
                            border
                            border-dashed
                            border-gray-300
                            py-10
                            sm:py-14
                            px-5
                            sm:px-8
                            text-center
                        "
                        >
                            <div className="mx-auto w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                                <span className="text-2xl">💸</span>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-gray-800">
                                Nenhuma categoria de despesa utilizada
                            </h3>

                            <p className="mt-2 text-gray-500 max-w-md mx-auto">
                                Assim que você registrar uma despesa,
                                ela aparecerá aqui junto com seu valor acumulado.
                            </p>
                        </div>

                    )}

                </div>

                {/* RENDAS EM USO */}
                <h3 className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                    mb-3
                ">
                    Receitas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

                    {rendas.length > 0 ? (

                        rendas.map(categoria => (
                            <CategoriaCard
                                key={categoria.categoriaId}
                                categoria={categoria}
                                onEdit={() => handleEdit(categoria)}
                                onDelete={() => handleDelete(categoria.categoriaId)}
                            />
                        ))

                    ) : (

                        <div className="
                            md:col-span-3
                            bg-white
                            rounded-2xl
                            border
                            border-dashed
                            border-gray-300
                            py-10
                            sm:py-14
                            px-5
                            sm:px-8
                            text-center
                        "
                        >
                            <div className="mx-auto w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-gray-800">
                                Nenhuma categoria de receita utilizada
                            </h3>

                            <p className="mt-2 text-gray-500 max-w-md mx-auto">
                                Quando você registrar uma receita,
                                ela aparecerá aqui automaticamente.
                            </p>
                        </div>

                    )}

                </div>

                {/* CATEGORIAS SEM MOVIMENTAÇÃO */}
                <div className="border-t my-8 sm:my-10" />

                <div className="flex items-center gap-3 mb-8">

                    <div className="
                            w-10
                            h-10
                            sm:w-11
                            sm:h-11
                            rounded-2xl
                            bg-[#1E7A3C]/10
                            flex
                            items-center
                            justify-center">

                        <FolderOpen
                            size={22}
                            className="text-gray-700"
                        />

                    </div>

                    <h2 className="
                            text-xl
                            sm:text-2xl
                            font-bold
                            text-gray-900
                        "
                    >
                        Disponíveis
                    </h2>

                </div>

                {/* DESPESAS SEM USO */}
                <h3 className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                    mb-3
                ">
                    Despesas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {categorias
                        .filter(c => {
                            const resumo = resumoCategorias.find(r => r.categoriaId === c.id);
                            return c.tipo === "DESPESA" && (!resumo || resumo.total === 0);
                        })
                        .map(categoria => (
                            <CategoriaCard
                                key={categoria.id}
                                categoria={{
                                    categoriaId: categoria.id,
                                    categoria: categoria.nome,
                                    tipo: categoria.tipo,
                                    total: 0,
                                    categoriaDoSistema: categoria.categoriaDoSistema
                                }}
                                onEdit={() => handleEdit({
                                    categoriaId: categoria.id,
                                    categoria: categoria.nome,
                                    tipo: categoria.tipo,
                                    total: 0,
                                    categoriaDoSistema: categoria.categoriaDoSistema
                                })}
                                onDelete={() => handleDelete(categoria.id)}
                            />
                        ))
                    }
                </div>

                {/* RENDAS SEM USO */}
                <h3 className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                    mb-3
                ">
                    Receitas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categorias
                        .filter(c => {
                            const resumo = resumoCategorias.find(r => r.categoriaId === c.id);
                            return c.tipo === "RENDA" && (!resumo || resumo.total === 0);
                        })
                        .map(categoria => (
                            <CategoriaCard
                                key={categoria.id}
                                categoria={{
                                    categoriaId: categoria.id,
                                    categoria: categoria.nome,
                                    tipo: categoria.tipo,
                                    total: 0,
                                    categoriaDoSistema: categoria.categoriaDoSistema
                                }}
                                onEdit={() => handleEdit({
                                    categoriaId: categoria.id,
                                    categoria: categoria.nome,
                                    tipo: categoria.tipo,
                                    total: 0,
                                    categoriaDoSistema: categoria.categoriaDoSistema
                                })}
                                onDelete={() => handleDelete(categoria.id)}
                            />
                        ))
                    }
                </div>

                {/* MODAL (CRUD REAL) */}
                {modalAberto && (
                    <CategoriaFormModal
                        categoriaEditando={categoriaEditando}
                        onSubmit={handleSalvarCategoria}
                        onClose={() => {
                            setModalAberto(false);
                            setCategoriaEditando(null);
                        }}
                    />
                )}

                    <ConfirmationModal
                        open={modalDeleteAberto}
                        title="Excluir categoria"
                        description="Tem certeza que deseja excluir esta categoria? Esta ação não poderá ser desfeita."
                        confirmText="Excluir"
                        cancelText="Cancelar"
                        confirmVariant="danger"
                        loading={loadingDelete}
                        onCancel={() => {

                            setModalDeleteAberto(false);

                            setCategoriaSelecionada(null);

                        }}
                        onConfirm={confirmarDelete}
                    />
                </div>
            </AppLayout>
        </ProtectedRoute>
    );
}