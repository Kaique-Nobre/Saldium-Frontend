"use client";

interface Props {
    tipo: string;
    mes: string;
    ano: string;
    ordenacao: string;

    onTipoChange: (value: string) => void;
    onMesChange: (value: string) => void;
    onAnoChange: (value: string) => void;
    onOrdenacaoChange: (value: string) => void;
}

export default function TransacaoFilters({
                                             tipo,
                                             mes,
                                             ano,
                                                ordenacao,
                                             onTipoChange,
                                             onMesChange,
                                             onAnoChange,
                                            onOrdenacaoChange
                                         }: Props) {
    const meses = [
        { value: "1", label: "Jan" },
        { value: "2", label: "Fev" },
        { value: "3", label: "Mar" },
        { value: "4", label: "Abr" },
        { value: "5", label: "Mai" },
        { value: "6", label: "Jun" },
        { value: "7", label: "Jul" },
        { value: "8", label: "Ago" },
        { value: "9", label: "Set" },
        { value: "10", label: "Out" },
        { value: "11", label: "Nov" },
        { value: "12", label: "Dez" },
    ];

    return (
        <div className="flex gap-4 flex-wrap">

            <div className="flex
                gap-1
                p-1
                bg-gray-100
                rounded-xl
                w-fit">
                <button
                    onClick={() => onTipoChange("")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${
                        tipo === ""
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-600 hover:bg-white"
                    }`}>
                    Todos
                </button>

                <button
                    onClick={() => onTipoChange("RENDA")}
                    className={` px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${
                        tipo === "RENDA"
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-600 hover:bg-white"
                    }`}>
                    Receitas
                </button>

                <button
                    onClick={() => onTipoChange("DESPESA")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${
                        tipo === "DESPESA"
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-600 hover:bg-white"
                    }`}>
                    Despesas
                </button>
            </div>

            {/* MÊS */}
            <select
                value={mes}
                onChange={(e) => onMesChange(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white">

                {meses.map((m) => (
                    <option
                        key={m.value}
                        value={m.value}
                    >
                        {m.label}
                    </option>
                ))}
            </select>

            {/* ANO */}
            <input
                type="number"
                value={ano}
                onChange={(e) => onAnoChange(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-24"
            />

            <div className="flex flex-col gap-1">


                <select
                    value={ordenacao}
                    onChange={(e) =>
                        onOrdenacaoChange(e.target.value)
                    }
                    className="
            border
            rounded-lg
            px-3
            py-2
            bg-white
        "
                >
                    <option value="dataTransacao,desc">
                        Mais recentes
                    </option>

                    <option value="dataTransacao,asc">
                        Mais antigas
                    </option>

                    <option value="valor,desc">
                        Maior valor
                    </option>

                    <option value="valor,asc">
                        Menor valor
                    </option>
                </select>
            </div>

        </div>
    );
}