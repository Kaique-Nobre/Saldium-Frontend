"use client";

interface PaginationProps {
    paginaAtual: number;
    totalPaginas: number;
    onPageChange: (
        pagina: number
    ) => void;
}

export default function Pagination({
                                       paginaAtual,
                                       totalPaginas,
                                       onPageChange
                                   }: PaginationProps) {

    if (totalPaginas <= 1) {
        return null;
    }

    return (

        <div
            className="
                flex
                justify-center
                gap-2
                mt-6
            "
        >

            <button
                disabled={
                    paginaAtual === 1
                }
                onClick={() =>
                    onPageChange(
                        paginaAtual - 1
                    )
                }
                className="
                    px-3
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                "
            >
                ←
            </button>

            {
                Array.from(
                    { length: totalPaginas },
                    (_, i) => i + 1
                ).map((pagina) => (

                    <button
                        key={pagina}
                        onClick={() =>
                            onPageChange(
                                pagina
                            )
                        }
                        className={`
                            px-3
                            py-2
                            rounded-lg
                            border

                            ${
                            paginaAtual === pagina
                                ? "bg-black text-white"
                                : ""
                        }
                        `}
                    >
                        {pagina}
                    </button>

                ))
            }

            <button
                disabled={
                    paginaAtual ===
                    totalPaginas
                }
                onClick={() =>
                    onPageChange(
                        paginaAtual + 1
                    )
                }
                className="
                    px-3
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                "
            >
                →
            </button>

        </div>

    );
}