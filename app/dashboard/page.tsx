"use client";

import AppLayout from "@/components/layout/AppLayout";
import {RelatorioAnualMesResponse, RelatorioCategoriaResponse, RelatorioResponse} from "@/types/relatorio.types";
import {useEffect, useState} from "react";
import {buscarRelatorioAnualMeses, buscarRelatorioCategoria, buscarRelatorioMensal} from "@/services/relatorio.service";
import DashboardCards from "@/components/dashboard/DashboardCards";
import {TransacaoResponse} from "@/types/transacao.types";
import {buscarTransacoes}
    from "@/services/transacao.service";
import UltimasTransacoes from "@/components/dashboard/UltimasTransacoes";
import GastosPorCategoria from "@/components/dashboard/GastosPorCategoria";

import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";

export default function DashboardPage() {
    const [relatorioMensal, setRelatorioMensal] =
        useState<RelatorioResponse | null>(null);

    const [relatorioMeses, setRelatorioMeses] =
        useState<RelatorioAnualMesResponse[]>([]);

    const [categorias, setCategorias] =
        useState<RelatorioCategoriaResponse[]>([]);

    const [ultimasTransacoes, setUltimasTransacoes] =
        useState<TransacaoResponse[]>([]);

    const [loading, setLoading] = useState(true);

    async function carregarDashboard() {
        try {
            setLoading(true);

            const ano = new Date().getFullYear();
            const mes = new Date().getMonth() + 1;

            const [mensal, categoriasRes, meses, transacoes] =
                await Promise.all([
                    buscarRelatorioMensal(ano, mes),
                    buscarRelatorioCategoria(ano, mes),
                    buscarRelatorioAnualMeses(ano),
                    buscarTransacoes({
                        page: 0,
                        size: 5,
                        sort: "dataTransacao,desc"
                    })
                ]);

            setRelatorioMensal(mensal);
            setCategorias(categoriasRes);
            setRelatorioMeses(meses);

            const recentes = transacoes.content
                .sort(
                    (a, b) =>
                        new Date(b.dataTransacao).getTime() -
                        new Date(a.dataTransacao).getTime()
                )
                .slice(0, 5);

            setUltimasTransacoes(recentes);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarDashboard();
    }, []);

    const semDadosIniciais =
        !relatorioMensal &&
        ultimasTransacoes.length === 0 &&
        categorias.length === 0;

    return (
        <AppLayout>
            <div className="
            w-full
                space-y-6
                px-4
                sm:px-6
                lg:px-8
                py-4
            ">

                {/* LOADING STATE */}
                {loading && (
                    <div className="text-gray-500 animate-pulse">
                        Carregando dashboard...
                    </div>
                )}

                {/* EMPTY STATE GLOBAL */}
                {!loading && semDadosIniciais ? (
                    <DashboardEmptyState />
                ) : (
                    <>
                        {/* CARDS */}
                        <DashboardCards
                            relatorio={relatorioMensal}
                        />

                        {/* GRID PRINCIPAL */}
                        <div className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-6
                            items-start
                        ">

                            {/* ÚLTIMAS TRANSAÇÕES */}
                            <div className="w-full">
                                {ultimasTransacoes.length === 0 ? (
                                    <div className="
                                        bg-white
                                        border
                                        rounded-2xl
                                        p-6
                                        text-center
                                        text-gray-500
                                    ">
                                        Nenhuma transação registrada ainda.
                                    </div>
                                ) : (
                                    <UltimasTransacoes
                                        transacoes={ultimasTransacoes}
                                    />
                                )}
                            </div>

                            {/* GASTOS POR CATEGORIA */}
                            <div className="w-full">
                                {categorias.length === 0 ? (
                                    <div className="
                                        bg-white
                                        border
                                        rounded-2xl
                                        p-6
                                        text-center
                                        text-gray-500
                                    ">
                                        Nenhuma categoria com movimentação.
                                    </div>
                                ) : (
                                    <GastosPorCategoria
                                        dados={categorias}
                                    />
                                )}
                            </div>

                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}