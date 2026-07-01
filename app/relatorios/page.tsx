"use client";

import {useEffect, useState} from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
    buscarRelatorioMensal,
    buscarRelatorioAnualMeses,
    buscarRelatorioCategoria
} from "@/services/relatorio.service";

import {
    RelatorioResponse,
    RelatorioAnualMesResponse,
    RelatorioCategoriaResponse,
} from "@/types/relatorio.types";

import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import RelatorioCards
    from "@/components/relatorios/RelatorioCards";

import RelatorioGrafico
    from "@/components/relatorios/RelatorioGrafico";

import RelatorioFiltros
    from "@/components/relatorios/RelatorioFiltros";

import CategoriasReport
    from "@/components/relatorios/CategoriasReport";

import EvolucaoReport from "@/components/relatorios/EvolucaoReport";

export default function RelatoriosPage() {

    const [relatorioMensal, setRelatorioMensal] =
        useState<RelatorioResponse | null>(null);

    const [relatorioMeses, setRelatorioMeses] =
        useState<RelatorioAnualMesResponse[]>([]);

    const [relatorioCategorias, setRelatorioCategorias] =
        useState<RelatorioCategoriaResponse[]>([]);

    const [ano, setAno] = useState(
        new Date().getFullYear()
    );

    const [mes, setMes] = useState(
        new Date().getMonth() + 1
    );

    const [loading, setLoading] =
        useState(true);

    const [abaAtiva, setAbaAtiva] = useState<
        "geral" | "categorias" | "evolucao"
    >("geral");

    const [evolucaoData, setEvolucaoData] =
        useState<RelatorioAnualMesResponse[]>([]);

    const [abaRender, setAbaRender] = useState(abaAtiva);

    useEffect(() => {
        carregarTudo();
    }, [ano, mes]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAbaRender(abaAtiva);
        }, 50);

        return () => clearTimeout(timeout);
    }, [abaAtiva]);

    async function carregarTudo() {

        try {

            setLoading(true);

            const [mensal, categorias, meses] = await Promise.all([
                buscarRelatorioMensal(ano, mes),
                buscarRelatorioCategoria(ano, mes),
                buscarRelatorioAnualMeses(ano)
            ]);

            setRelatorioMensal(mensal);
            setRelatorioCategorias(categorias);
            setRelatorioMeses(meses);
            setEvolucaoData(meses);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    }

    async function carregarRelatorioMensal() {
        const mensal =
            await buscarRelatorioMensal(
                ano,
                mes
            );

        const categorias =
            await buscarRelatorioCategoria(
                ano,
                mes
            );

        setRelatorioMensal(mensal);
        setRelatorioCategorias(categorias);

    }

    async function carregarRelatorioAnual() {
        try {
            setLoading(true);

            const mesesRelatorio =
                await buscarRelatorioAnualMeses(
                    ano
                );

            setRelatorioMeses(
                mesesRelatorio
            );
        } finally {
            setLoading(false)
        }

    }

    if (loading) {
        return (
            <ProtectedRoute>
                <AppLayout>
                    <div className="animate-pulse">
                        {loading && <p>Carregando relatórios...</p>}
                    </div>
                </AppLayout>
            </ProtectedRoute>
        );
    }
    return (
        <ProtectedRoute>
            <AppLayout>

                <div className="space-y-6">

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">
                            Relatórios
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Analise suas finanças por período.
                        </p>
                    </div>
                    <div className="
                            flex
                            overflow-x-auto
                            whitespace-nowrap
                            gap-6
                            border-b
                            mb-6
                            scrollbar-hide
                        "
                    >

                        <button
                            onClick={() => setAbaAtiva("geral")}
                            className={`
                                    pb-3
                                    text-sm
                                    font-medium
                                    border-b-2
                                    transition
                                    ${
                                abaAtiva === "geral"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-500"}
                            `}
                        >
                            Visão Geral
                        </button>

                        <button
                            onClick={() => setAbaAtiva("categorias")}
                            className={`
                                pb-3
                                text-sm
                                font-medium
                                border-b-2
                                transition
                                ${
                                abaAtiva === "categorias"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-500"
                            }
                            `}
                        >
                            Categorias
                        </button>

                        <button
                            onClick={() => setAbaAtiva("evolucao")}
                            className={`
                                pb-3
                                text-sm
                                font-medium
                                border-b-2
                                transition
                                ${
                                abaAtiva === "evolucao"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-500"
                            }
                            `}
                        >
                            Evolução
                        </button>

                    </div>

                    <AnimatePresence mode="wait">
                        {abaAtiva === "geral" && (

                            <motion.div
                                key="geral"
                                initial={{
                                    opacity: 0,
                                    y: 10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10
                                }}
                                transition={{
                                    duration: 0.25
                                }}
                            >
                                <RelatorioFiltros
                                    ano={ano}
                                    mes={mes}
                                    onAnoChange={setAno}
                                    onMesChange={setMes}
                                    mostrarAno={true}
                                    mostrarMes={true}
                                />
                                <div className="space-y-6">

                                    {relatorioMensal && (
                                        <RelatorioCards relatorio={relatorioMensal} />
                                    )}

                                    <div className="
                                            bg-white
                                            border
                                            rounded-2xl
                                            p-4
                                            md:p-6
                                            shadow-sm
                                        "
                                    >

                                        <RelatorioGrafico
                                            key={`grafico-${ano}-${mes}`}
                                            dados={relatorioMeses}
                                        />

                                    </div>

                                </div>
                            </motion.div>
                        )}

                        {abaAtiva === "categorias" && (
                            <motion.div
                                key="categorias"
                                initial={{
                                    opacity: 0,
                                    y: 10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10
                                }}
                                transition={{
                                    duration: 0.25
                                }}
                            >
                                <RelatorioFiltros
                                    ano={ano}
                                    mes={mes}
                                    onAnoChange={setAno}
                                    onMesChange={setMes}
                                    mostrarAno={false}
                                    mostrarMes={true}
                                />
                                <div className="min-h-[420px]">
                                    <CategoriasReport
                                        key={`categorias-${ano}-${mes}`}
                                        categorias={relatorioCategorias}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {abaRender === "evolucao" && (
                            <motion.div
                                key="evolucao"
                                initial={{
                                    opacity: 0,
                                    y: 10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10
                                }}
                                transition={{
                                    duration: 0.25
                                }}
                            >
                                <RelatorioFiltros
                                    ano={ano}
                                    mes={mes}
                                    onAnoChange={setAno}
                                    onMesChange={setMes}
                                    mostrarAno={true}
                                    mostrarMes={false}
                                />
                                <div className="min-w-0">
                                    <EvolucaoReport
                                        key={`evolucao-${ano}`}
                                        dados={evolucaoData}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </AppLayout>
        </ProtectedRoute>
    );

}