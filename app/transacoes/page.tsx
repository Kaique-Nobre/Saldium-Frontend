"use client";

import TransactionFormModal from "@/components/transacoes/TransactionFormModal";
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import TransactionTable from "@/components/transacoes/TransactionTable";
import {
    buscarTransacoes,
    excluirTransacao
} from "@/services/transacao.service";
import { TransacaoResponse } from "@/types/transacao.types";
import TransacaoFilters from "@/components/transacoes/TransacaoFilters";
import Pagination from "@/components/transacoes/Pagination";
import {RelatorioResponse} from "@/types/relatorio.types";
import {buscarRelatorioMensal} from "@/services/relatorio.service";
import ResumoTransacoesCards from "@/components/transacoes/ResumoTransacaoCards";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function TransacoesPage() {

    const [resumo, setResumo] =
        useState<RelatorioResponse | null>(null);

    const [loading, setLoading] = useState(true);

    const [modalAberto, setModalAberto] = useState(false);

    const [transacaoSelecionada, setTransacaoSelecionada] =
        useState<TransacaoResponse | undefined>(undefined);

    const [tipoFiltro, setTipoFiltro] = useState("");
    const [mesFiltro, setMesFiltro] = useState(
        (new Date().getMonth() + 1).toString()
    );

    const [anoFiltro, setAnoFiltro] = useState(
        new Date().getFullYear().toString()
    );

    const [transacoes, setTransacoes] =
        useState<TransacaoResponse[]>([]);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const [ordenacao, setOrdenacao] =
        useState("dataTransacao,desc");

    const [modalDeleteAberto, setModalDeleteAberto] =
        useState(false);

    const [transacaoSelecionadaDelete, setTransacaoSelecionadaDelete] =
        useState<number | null>(null);

    const [loadingDelete, setLoadingDelete] =
        useState(false);

    function criarIntervaloData(
        mes: string,
        ano: string
    ) {

        const inicio = new Date(
            Number(ano),
            Number(mes) - 1,
            1
        );

        const fim = new Date(
            Number(ano),
            Number(mes),
            0
        );

        return {
            dataInicial:
                inicio.toISOString().split("T")[0],

            dataFinal:
                fim.toISOString().split("T")[0],
        };
    }

    async function carregarTransacoes() {

        try {
            setLoading(true);

            const { dataInicial, dataFinal } =
                criarIntervaloData(mesFiltro, anoFiltro);

            const response = await buscarTransacoes({
                page: paginaAtual - 1,
                size: 10,
                tipo: tipoFiltro || undefined,
                descricao: undefined,
                dataInicial,
                dataFinal,
                sort: ordenacao,
            });

            if (mesFiltro && anoFiltro) {

                const relatorio =
                    await buscarRelatorioMensal(
                        Number(anoFiltro),
                        Number(mesFiltro)
                    );

                setResumo(relatorio);

            } else {
                setResumo(null);
            }

            setTransacoes(response.content);
            setTotalPaginas(response.totalPages);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarTransacoes();
    }, [
        paginaAtual,
        tipoFiltro,
        mesFiltro,
        anoFiltro,
        ordenacao
    ]);

    useEffect(() => {
        setPaginaAtual(1);
    }, [
        tipoFiltro,
        mesFiltro,
        anoFiltro,
        ordenacao
    ]);

    function handleDelete(id: number) {

        setTransacaoSelecionadaDelete(id);

        setModalDeleteAberto(true);

    }

    async function confirmarDelete() {

        if (transacaoSelecionadaDelete === null) return;

        try {

            setLoadingDelete(true);

            await excluirTransacao(transacaoSelecionadaDelete);

            await carregarTransacoes();

        } catch (error) {

            console.error(error);

        } finally {

            setLoadingDelete(false);

            setModalDeleteAberto(false);

            setTransacaoSelecionadaDelete(null);

        }

    }

    function handleEdit(transacao: TransacaoResponse) {
        setTransacaoSelecionada(transacao);
        setModalAberto(true);
    }

    return (
        <AppLayout>
            <div className="p-4 md:p-6 space-y-6">

                {/* HEADER */}
                <div
                    className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
                >

                    <div>
                        <h1 className="text-2xl font-bold">
                            Transações
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Gerencie suas receitas e despesas
                        </p>


                    </div>



                    <button
                        onClick={() => {
                            setTransacaoSelecionada(undefined);
                            setModalAberto(true);
                        }}
                        className="
                            w-full
                            sm:w-auto

                            px-4
                            py-2

                            rounded-xl

                            bg-black
                            text-white

                            hover:bg-gray-800
                            transition
                        "
                    >
                        + Nova Transação
                    </button>
                </div>

                {resumo && (

                    <ResumoTransacoesCards
                        receitas={resumo.totalRenda}
                        despesas={resumo.totalDespesas}
                        saldo={resumo.saldo}
                    />

                )}

                {/* FILTROS */}
                <TransacaoFilters
                    tipo={tipoFiltro}
                    mes={mesFiltro}
                    ano={anoFiltro}
                    ordenacao={ordenacao}
                    onTipoChange={setTipoFiltro}
                    onMesChange={setMesFiltro}
                    onAnoChange={setAnoFiltro}
                    onOrdenacaoChange={setOrdenacao}
                />

                {/* TABELA */}
                <div
                    className="
                        bg-white
                        border
                        rounded-2xl
                        shadow-sm

                        p-3
                        sm:p-4

                        overflow-hidden
                    "
                >

                    {loading ? (
                        <div className="py-10 text-center text-gray-500">
                            Carregando transações...
                        </div>
                    ) : transacoes.length === 0 ? (
                        <div className="py-10 text-center text-gray-500">
                            Nenhuma transação encontrada
                        </div>
                    ) : (
                        <TransactionTable
                            transacoes={transacoes}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )}

                    <Pagination
                        paginaAtual={paginaAtual}
                        totalPaginas={totalPaginas}
                        onPageChange={setPaginaAtual}
                    />
                </div>
            </div>

            {/* MODAL */}
            {modalAberto && (
                <TransactionFormModal
                    transacao={transacaoSelecionada}
                    onClose={() => {
                        setModalAberto(false);
                        setTransacaoSelecionada(undefined);
                    }}
                    onSuccess={() => {
                        carregarTransacoes();
                        setTransacaoSelecionada(undefined);
                    }}
                />
            )}
            <ConfirmationModal
                open={modalDeleteAberto}
                title="Excluir transação"
                description="
                    Tem certeza que deseja excluir esta transação?
                    Esta ação não poderá ser desfeita.
                "
                confirmText="Excluir"
                cancelText="Cancelar"
                confirmVariant="danger"
                loading={loadingDelete}
                onCancel={() => {

                    setModalDeleteAberto(false);

                    setTransacaoSelecionadaDelete(null);

                }}
                onConfirm={confirmarDelete}
            />
        </AppLayout>
    );
}