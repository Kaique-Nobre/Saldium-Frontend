export interface RelatorioResponse {
    totalRenda: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioAnualMesResponse {
    mes: number;
    totalRenda: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioCategoriaResponse {
    categoriaDoSistema: boolean;
    categoriaId: number;
    categoria: string;
    tipo: string;
    total: number;
}