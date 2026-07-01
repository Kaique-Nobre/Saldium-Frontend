import { api } from "@/lib/api";

import {
    DeletarContaRequest
} from "@/types/user.types";

export interface UserResponse {
    nome: string;
    email: string;
    createdAt: string;
}

export async function deletarConta(request: DeletarContaRequest): Promise<void> {
    await api.delete(
        "/user",
        {
            data: request
        }
    );
}

export async function buscarUsuario(): Promise<UserResponse> {

    const { data } = await api.get<UserResponse>("/user");

    return data;
}