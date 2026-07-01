"use client";

interface SummaryCardProps {
    titulo: string;
    valor: number;
}

export default function SummaryCard({
                                        titulo,
                                        valor,
                                    }: SummaryCardProps) {

    return (
        <div className="border rounded-lg p-4">

            <h3 className="text-sm text-gray-500">
                {titulo}
            </h3>

            <p className="text-2xl font-bold mt-2">
                R$ {valor.toFixed(2)}
            </p>

        </div>
    );
}