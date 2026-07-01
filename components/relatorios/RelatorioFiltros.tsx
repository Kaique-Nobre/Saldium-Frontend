"use client";

interface RelatorioFiltrosProps {
    ano: number;
    mes: number;

    onAnoChange: (ano: number) => void;
    onMesChange: (mes: number) => void;

    mostrarAno?: boolean;
    mostrarMes?: boolean;
}

const meses = [
    {valor: 1, nome: "Janeiro"},
    {valor: 2, nome: "Fevereiro"},
    {valor: 3, nome: "Março"},
    {valor: 4, nome: "Abril"},
    {valor: 5, nome: "Maio"},
    {valor: 6, nome: "Junho"},
    {valor: 7, nome: "Julho"},
    {valor: 8, nome: "Agosto"},
    {valor: 9, nome: "Setembro"},
    {valor: 10, nome: "Outubro"},
    {valor: 11, nome: "Novembro"},
    {valor: 12, nome: "Dezembro"},
];

export default function RelatorioFiltros({
                                             ano,
                                             mes,
                                             onAnoChange,
                                             onMesChange,
                                             mostrarAno,
                                             mostrarMes
                                         }: RelatorioFiltrosProps) {

    const anoAtual = new Date().getFullYear();

    return (
        <div className="bg-white border rounded-lg p-4 mb-6">

            <div className="flex flex-col sm:flex-row gap-4">

                <div  className="w-full sm:w-auto">
                    {mostrarAno && (
                        <div>
                            <label className="block text-sm mb-1">
                                Ano
                            </label>
                            <select
                                value={ano}
                                onChange={(event) =>
                                    onAnoChange(
                                        Number(event.target.value)
                                    )
                                }
                                className="
                                    w-full
                                    sm:w-auto
                                    border
                                    rounded-lg
                                    px-3
                                    py-2
                                    bg-white
                                ">
                                {
                                    Array.from(
                                        {length: 5},
                                        (_, index) => (
                                            <option
                                                key={index}
                                                value={
                                                    anoAtual - index
                                                }
                                            >
                                                {anoAtual - index}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                    )}

                </div>

                <div  className="w-full sm:w-auto">

                    {mostrarMes && (
                        <div>
                            <label className="block text-sm mb-1">
                                Mês
                            </label>
                            <select
                                value={mes}
                                onChange={(event) =>
                                    onMesChange(
                                        Number(event.target.value)
                                    )
                                }
                                className="
                                    w-full
                                    sm:w-auto
                                    border
                                    rounded-lg
                                    px-3
                                    py-2
                                    bg-white
                                "
                                >
                                {
                                    meses.map((mes) => (
                                        <option
                                            key={mes.valor}
                                            value={mes.valor}
                                        >
                                            {mes.nome}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        )}

                </div>

            </div>

        </div>
    );
}