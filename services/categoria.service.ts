import { api } from "@/lib/api";
import { CategoriaResponse , CategoriaRequest} from "@/types/categoria.types";

export async function buscarCategoriasPorTipo(
    tipoTransacao: string
): Promise<CategoriaResponse[]> {

    const response =
        await api.get<CategoriaResponse[]>(
            "/categorias/tipo",
            {
                params: {
                    tipoTransacao,
                },
            }
        );

    return response.data;
}

export async function buscarCategorias():
    Promise<CategoriaResponse[]> {

    const response =
        await api.get("/categorias");

    return response.data;
}

export async function criarCategoria(
    request: CategoriaRequest
): Promise<CategoriaResponse> {

    const response =
        await api.post(
            "/categorias",
            request
        );

    return response.data;
}

export async function atualizarCategoria(
    id: number,
    request: CategoriaRequest
): Promise<CategoriaResponse> {

    const response =
        await api.put(
            `/categorias/${id}`,
            request
        );

    return response.data;
}

export async function excluirCategoria(
    id: number
): Promise<void> {

    await api.delete(
        `/categorias/${id}`
    );
}