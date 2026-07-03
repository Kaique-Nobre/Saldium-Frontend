import { api } from "@/services/api";

import {
    TransacaoResponse,
    CriarTransacaoRequest, PageResponse, TransacaoFilterRequest,
} from "@/types/transacao.types";

export async function buscarTransacoes(
    params: TransacaoFilterRequest
): Promise<PageResponse<TransacaoResponse>> {

    const response = await api.get("/transacoes", {
        params
    });

    return response.data;
}

export async function criarTransacao(
    request: CriarTransacaoRequest
): Promise<TransacaoResponse> {

    const response =
        await api.post<TransacaoResponse>(
            "/transacoes",
            request
        );

    return response.data;
}

export async function excluirTransacao(
    id: number
): Promise<void> {

    await api.delete(
        `/transacoes/${id}`
    );
}

export async function atualizarTransacao(
    id: number,
    request: CriarTransacaoRequest
): Promise<TransacaoResponse> {
    console.log("Atualizando transação:", id);

    const response =
        await api.put<TransacaoResponse>(
            `/transacoes/${id}`,
            request
        );

    return response.data;
}