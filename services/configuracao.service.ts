import { api } from "@/services/api";
import { AlterarSenhaRequest } from "@/types/alterarSenhaRequest";

export async function alterarSenha(
    dados: AlterarSenhaRequest
) {
    await api.patch(
        "/auth/alterar-senha",
        dados
    );
}