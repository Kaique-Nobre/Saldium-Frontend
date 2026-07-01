export interface CategoriaResponse {
    id: number;
    nome: string;
    tipo: string;
    categoriaDoSistema: boolean;
}

export interface CategoriaRequest {
    nome: string;
    tipo: string;
}