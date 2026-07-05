"use client";

import { useState } from "react";
import axios from "axios";
import AppLayout from "@/components/layout/AppLayout";
import { Lock, ShieldAlert, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {deletarConta} from "@/services/user.service";
import {useAuth} from "@/contexts/AuthContext";

export default function SettingsPage() {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

    const [erro, setErro] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [erroSenhaAtual, setErroSenhaAtual] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);

    const [modalDeleteAberto, setModalDeleteAberto] = useState(false);
    const [senhaDelete, setSenhaDelete] = useState("");
    const [erroDelete, setErroDelete] = useState("");
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { logout } = useAuth();

    const [loadingLogout, setLoadingLogout] = useState(false);

    const router = useRouter();



    async function handleAlterarSenha(
        e: React.FormEvent
    ) {
        e.preventDefault();

        setErro("");
        setErroSenha("");
        setErroSenhaAtual("");
        setSucesso("");

        if (
            !senhaAtual ||
            !novaSenha ||
            !confirmarNovaSenha
        ) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (novaSenha.length < 8) {
            setErro(
                "A nova senha deve possuir no mínimo 8 caracteres."
            );
            return;
        }

        if (novaSenha !== confirmarNovaSenha) {
            setErroSenha("As senhas não coincidem.");
            return;
        }

        try {
            setLoading(true);

            const token =
                localStorage.getItem("accessToken");

            await axios.patch(
                "https://api.saldium.com.br/auth/alterar-senha",
                {
                    senhaAtual,
                    novaSenha,
                    confirmarNovaSenha,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSucesso(
                "Senha alterada com sucesso."
            );

            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarNovaSenha("");

            setTimeout(() => {
                router.push("/login?reset=success");
            }, 200);

        } catch (error: any) {

            if (
                error.response?.status === 400 ||
                error.response?.status === 401
            ) {
                setErroSenhaAtual(
                    "Senha atual incorreta."
                );
            } else {
                setErro(
                    "Erro inesperado ao alterar senha."
                );
            }

        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteAccount() {

        try {

            setErroDelete("");
            setLoadingDelete(true);

            await deletarConta({
                senha: senhaDelete
            });

            await logout("/?accountDeleted=true");

        } catch (error: any) {

            if (
                error.response?.status === 400 ||
                error.response?.status === 401
            ) {

                setErroDelete("Senha incorreta.");

            } else {

                setErroDelete(
                    "Não foi possível excluir sua conta."
                );

            }

        } finally {

            setLoadingDelete(false);

        }

    }
    async function handleLogout() {

        setLoadingLogout(true);

        await logout("/?accountDeleted=true");

    }

    return (
        <AppLayout>
            <div className="h-full p-8">

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Configurações
                        </h1>

                        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                            Gerencie a segurança da sua conta.
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        disabled={loadingLogout}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-4 sm:px-5
                            py-2.5 sm:py-3
                            rounded-2xl
                            border
                            w-full sm:w-auto
                            border-gray-200
                            bg-white
                            hover:bg-gray-50
                            hover:shadow-md
                            transition-all
                            duration-200
                            disabled:opacity-50
                        "
                    >
                        <LogOut
                            size={18}
                            className="text-gray-600"
                        />

                        <span className="font-medium">
                            {
                                loadingLogout
                                    ? "Saindo..."
                                    : "Sair"
                            }
                        </span>
                    </button>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                    {/* ALTERAR SENHA */}

                    <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-5 sm:p-8">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#1E7A3C]/10 flex items-center justify-center">
                                <Lock
                                    size={22}
                                    className="text-[#1E7A3C]"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold">
                                    Alterar senha
                                </h2>

                                <p className="text-gray-500 text-sm sm:text-base">
                                    Atualize sua senha para manter sua conta protegida.
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={handleAlterarSenha}
                            className="space-y-5"
                        >

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Senha atual
                                </label>

                                <input
                                    type="password"
                                    value={senhaAtual}
                                    onChange={(e) => {

                                        setSenhaAtual(e.target.value);

                                        if (erroSenhaAtual) {
                                            setErroSenhaAtual("");
                                        }

                                    }}
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        p-3 sm:p-3.5
                                        text-sm sm:text-base
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#1E7A3C]/30
                                    "
                                />

                                {erroSenhaAtual && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {erroSenhaAtual}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Nova senha
                                </label>

                                <input
                                    type="password"
                                    value={novaSenha}
                                    onChange={(e) => {

                                        const valor = e.target.value;

                                        setNovaSenha(valor);

                                        if (
                                            confirmarNovaSenha &&
                                            valor !== confirmarNovaSenha
                                        ) {
                                            setErroSenha("As senhas não coincidem.");
                                        } else {
                                            setErroSenha("");
                                        }
                                    }}
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        p-3 sm:p-3.5
                                        text-sm sm:text-base
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#1E7A3C]/30
                                    "
                                />

                                {novaSenha.length > 0 &&
                                    novaSenha.length < 8 && (
                                        <p className="text-red-500 text-sm mt-2">
                                            A senha precisa ter pelo menos 8 caracteres.
                                        </p>
                                    )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Confirmar nova senha
                                </label>

                                <input
                                    type="password"
                                    value={confirmarNovaSenha}
                                    onChange={(e) => {

                                        const valor = e.target.value;

                                        setConfirmarNovaSenha(valor);

                                        if (
                                            valor &&
                                            novaSenha &&
                                            valor !== novaSenha
                                        ) {
                                            setErroSenha("As senhas não coincidem.");
                                        } else {
                                            setErroSenha("");
                                        }
                                    }}
                                    className={`
                                        w-full
                                        rounded-xl
                                        border
                                        p-3 sm:p-3.5
                                        text-sm sm:text-base
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#1E7A3C]/30
                                    `}
                                />

                                {erroSenha && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {erroSenha}
                                    </p>
                                )}
                            </div>

                            {erro && (
                                <div className="text-red-600 text-sm">
                                    {erro}
                                </div>
                            )}

                            {sucesso && (
                                <div className="text-green-600 text-sm">
                                    {sucesso}
                                </div>
                            )}

                            <button
                                disabled={loading}
                                className="
                                    bg-[#1E7A3C]
                                    text-white
                                    px-4 sm:px-6
                                    py-2.5 sm:py-3
                                    rounded-xl
                                    w-full sm:w-auto
                                    hover:bg-[#176430]
                                    transition
                                    disabled:opacity-50
                                "
                            >
                                {loading
                                    ? "Atualizando..."
                                    : "Atualizar senha"}
                            </button>

                        </form>
                    </div>

                    {/* ZONA DE PERIGO */}

                    <div className="bg-white rounded-3xl border border-red-200 shadow-sm p-5 sm:p-8 h-fit">

                        <div className="flex items-center gap-3 mb-4">

                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                <ShieldAlert
                                    size={22}
                                    className="text-red-500"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-red-600">
                                    Zona de perigo
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Ações irreversíveis.
                                </p>
                            </div>

                        </div>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            Ao excluir sua conta perderá todas as suas categorias, transações e relatórios.
                        </p>

                        <button
                            onClick={() => setModalDeleteAberto(true)}
                            className="
                            mt-6
                            w-full
                            py-3
                            rounded-xl
                            border
                            border-red-300
                            text-red-600
                            hover:bg-red-50
                            transition
                            text-sm sm:text-base
                        "
                        >
                            Excluir conta
                        </button>
                    </div>
                </div>
                {modalDeleteAberto && (

                    <div className="fixed inset-0 min-h-screen bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                        <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

                            <h2 className="text-2xl font-bold text-red-600">
                                Excluir conta
                            </h2>

                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Esta ação é permanente e não poderá ser desfeita.
                                Todos os seus dados serão removidos.
                            </p>

                            <div className="mt-6">

                                <label className="text-sm font-medium">
                                    Confirme sua senha
                                </label>

                                <input
                                    type="password"
                                    value={senhaDelete}
                                    onChange={(e) => {

                                        setSenhaDelete(e.target.value);

                                        if (erroDelete)
                                            setErroDelete("");

                                    }}
                                    className="
                                            mt-2
                                            w-full
                                            rounded-xl
                                            border
                                            p-3
                                        "
                                />

                            </div>

                            {erroDelete && (

                                <p className="text-red-500 text-sm mt-3">
                                    {erroDelete}
                                </p>

                            )}

                            <div className="flex justify-end gap-3 mt-8">

                                <button
                                    onClick={() => {

                                        setModalDeleteAberto(false);
                                        setSenhaDelete("");
                                        setErroDelete("");

                                    }}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        border
                                    "
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={loadingDelete}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-red-600
                                        text-white
                                        hover:bg-red-700
                                        transition
                                        disabled:opacity-50
                                    "
                                >
                                    {
                                        loadingDelete
                                            ? "Excluindo..."
                                            : "Excluir conta"
                                    }
                                </button>

                            </div>

                        </div>

                    </div>

                )}
            </div>
        </AppLayout>
    );
}