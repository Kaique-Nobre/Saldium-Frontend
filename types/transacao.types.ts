export interface TransacaoResponse {
    id: number;
    descricao: string;
    valor: number;
    tipoTransacao: string;
    usuario: string;
    categoria: string;
    categoriaId: number;
    dataTransacao: string;
    dataCriacao: string;
}

export interface CriarTransacaoRequest {
    descricao: string;
    valor: number;
    tipoTransacao: string;
    dataTransacao: string;
    categoria_id: number;
}

export interface TransacaoFilterRequest {
    page: number;
    size: number;

    tipo?: string;
    categoriaId?: number;
    dataInicial?: string;
    dataFinal?: string;
    descricao?: string;

    sort?: string; // ex: "dataTransacao,desc"
}
export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
}