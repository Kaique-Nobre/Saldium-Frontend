"use client";

import { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { buscarRelatorioMensal } from "@/services/relatorio.service";
import { RelatorioResponse } from "@/types/relatorio.types";

export default function DashboardSummary() {

    const [dados, setDados] =
        useState<RelatorioResponse | null>(null);

    useEffect(() => {

        async function carregarDados() {

            const hoje = new Date();

            const ano = hoje.getFullYear();

            const mes = hoje.getMonth() + 1;

            try {

                const response =
                    await buscarRelatorioMensal(
                        ano,
                        mes
                    );

                setDados(response);

            } catch (error) {

                console.error(error);

            }
        }

        carregarDados();

    }, []);

    if (!dados) {
        return <p>Carregando...</p>;
    }

    return (
        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-4
            "
        >

            <SummaryCard
                titulo="Receitas"
                valor={dados.totalRenda}
            />

            <SummaryCard
                titulo="Despesas"
                valor={dados.totalDespesas}
            />

            <SummaryCard
                titulo="Saldo"
                valor={dados.saldo}
            />

        </div>
    );
}