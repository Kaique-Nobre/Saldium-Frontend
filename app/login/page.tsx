"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {Wallet} from "lucide-react";
import axios from "axios";

function LoginContent() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [erroLogin, setErroLogin] = useState("");

    const resetSuccess = searchParams.get("reset") === "success";

    // Mês dinâmico do mockup
    const mesAtual = useMemo(() => {
        return new Date().toLocaleString("pt-BR", {
            month: "long",
        });
    }, []);

    const handleLogin = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        setErroLogin("");

        try {
            setLoading(true);

            await login({
                email,
                senha,
            });

            router.push("/dashboard");

        } catch (error) {

            if (axios.isAxiosError(error)) {

                if (error.response?.status === 401) {

                    setErroLogin(
                        "Email ou senha inválidos."
                    );

                    return;
                }
            }

            setErroLogin(
                "Não foi possível realizar o login."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4">

            {/* ===================== */}
            {/* PAINEL ESQUERDO */}
            {/* ===================== */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex flex-col justify-between bg-[#1E7A3C] text-white p-8 col-span-1"
            >

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                        <Wallet className="text-white" size={20} />
                    </div>

                    <h1 className="text-2xl font-semibold">
                        Saldium
                    </h1>

                </div>

                <div className="mt-6">
                    <h2 className="text-4xl font-bold leading-snug">
                        Sua vida financeira, mais clara do que nunca.
                    </h2>

                    <p className="mt-5 text-white/85 text-base leading-relaxed">
                        Registre, organize e entenda suas receitas e despesas sem complicação.
                    </p>

                    <div className="space-y-4 mt-10">
                        {[
                            "Veja exatamente para onde seu dinheiro vai",
                            "Controle receitas e despesas em segundos",
                            "Relatórios claros e automáticos",
                            "Sem planilhas, sem complicação",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 hover:translate-x-1 transition-all duration-200"
                            >
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:bg-white/30">
                                    ✓
                                </div>
                                <span className="text-white/90 text-sm leading-snug">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOCKUP */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <p className="text-sm text-white/70 capitalize">
                        saldo de {mesAtual}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        R$ 3.240,00
                    </h2>

                    {/* MINI CARDS */}
                    <div className="mt-5 grid grid-cols-2 gap-3">

                        {/* RECEITAS */}
                        <div className="bg-white/10 rounded-xl p-3 border border-white/10 hover:bg-white/15 transition-all duration-300">
                            <p className="text-[11px] text-white/70">
                                Receita
                            </p>

                            <p className="text-lg font-semibold mt-1">
                                R$ 5.000,00
                            </p>
                        </div>

                        {/* DESPESAS */}
                        <div className="bg-white/10 rounded-xl p-3 border border-white/10 hover:bg-white/15 transition-all duration-300">
                            <p className="text-[11px] text-white/70">
                                Despesas
                            </p>

                            <p className="text-lg font-semibold mt-1">
                                R$ 1.760,00
                            </p>
                        </div>

                    </div>
                </div>

            </motion.div>

            {/* ===================== */}
            {/* PAINEL DIREITO */}
            {/* ===================== */}
            <div className="lg:col-span-3 flex items-center justify-center p-8 bg-[#F7F8F5]">

                <div className="w-full max-w-md">

                    <h2 className="text-3xl font-bold">
                        Bem-vindo de volta
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Entre para acessar seu painel financeiro
                    </p>

                    {resetSuccess && (
                        <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                            Senha alterada com sucesso! Faça login novamente.
                        </div>
                    )}

                    {/* EMAIL */}
                    <form onSubmit={handleLogin}>
                        <div className="mt-6">
                            <label className="text-sm font-medium flex justify-between">
                                Email
                                <a href="/forgot-password" className="text-xs text-[#1E7A3C]">
                                    Esqueceu a senha?
                                </a>
                            </label>

                            <input
                                type="email"
                                required
                                autoComplete="email"
                                className="w-full mt-2 p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3C]/30 transition"
                                placeholder="seuemail@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* SENHA */}
                        <div className="mt-4">
                            <label className="text-sm font-medium">
                                Senha
                            </label>

                            <div className="relative mt-2">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    className="w-full p-3 rounded-lg border bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-[#1E7A3C]/30 transition"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />

                                {
                                    erroLogin && (

                                        <div className="
                                            mt-4
                                            rounded-xl
                                            border
                                            border-red-200
                                            bg-red-50
                                            p-3
                                            text-sm
                                            text-red-600
                                        ">
                                            {erroLogin}
                                        </div>

                                    )
                                }

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMostrarSenha(!mostrarSenha)
                                    }
                                    className="absolute right-3 top-3 text-sm text-gray-500"
                                >
                                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>


                        {/* BOTÃO */}
                        <button type="submit"
                                disabled={loading}
                                className="
                            w-full
                            mt-6
                            bg-[#1E7A3C]
                            text-white
                            py-3
                            rounded-lg
                            hover:bg-[#176430]
                            transition-all duration-300
                            hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                        ">
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    {/* SEPARADOR */}
                    <div className="flex items-center my-6 gap-4">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span className="text-xs text-gray-500">ou</span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

                    {/* CADASTRO */}
                    <p className="text-center text-sm text-gray-600">
                        Não tem conta?{" "}
                        <a href="/register" className="text-[#1E7A3C] font-medium">
                            Criar conta
                        </a>
                    </p>

                </div>
            </div>

        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div />}>
            <LoginContent />
        </Suspense>
    );
}