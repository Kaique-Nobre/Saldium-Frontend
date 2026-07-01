import { api } from "@/lib/api";
import { RelatorioResponse,
    RelatorioAnualMesResponse,
    RelatorioCategoriaResponse,
} from "@/types/relatorio.types";

export async function buscarRelatorioMensal(
    ano: number,
    mes: number
): Promise<RelatorioResponse> {

    const response =
        await api.get<RelatorioResponse>(
            "/relatorios/mes",
            {
                params: {
                    ano,
                    mes,
                },
            }
        );

    return response.data;
}

export async function buscarRelatorioAnual(
    ano: number
): Promise<RelatorioResponse> {

    const response =
        await api.get<RelatorioResponse>(
            "/relatorios/ano",
            {
                params: { ano },
            }
        );

    return response.data;
}

export async function buscarRelatorioAnualMeses(
    ano: number
): Promise<RelatorioAnualMesResponse[]> {

    const response =
        await api.get<
            RelatorioAnualMesResponse[]
        >(
            "/relatorios/ano/meses",
            {
                params: { ano },
            }
        );

    return response.data;
}

export async function buscarRelatorioCategoria(
    ano: number,
    mes: number
): Promise<RelatorioCategoriaResponse[]> {

    const response =
        await api.get<
            RelatorioCategoriaResponse[]
        >(
            "/relatorios/categoria",
            {
                params: {
                    ano,
                    mes,
                },
            }
        );

    return response.data;
}