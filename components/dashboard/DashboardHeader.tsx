"use client";

interface DashboardHeaderProps {
    ano: number;
    mes: number;
}

export default function DashboardHeader({
                                            ano,
                                            mes,
                                        }: DashboardHeaderProps) {

    const meses = [
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
    ];

    return (

        <div className="flex justify-between items-center mb-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Dashboard

                </h1>

                <p className="text-gray-500 mt-1">

                    {meses[mes - 1]} de {ano} - visão geral financeira

                </p>

            </div>

        </div>

    );
}