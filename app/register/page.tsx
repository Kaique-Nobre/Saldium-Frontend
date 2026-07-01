"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [loading, setLoading] = useState(false);

    const [erroNome, setErroNome] = useState("");
    const [erroEmail, setErroEmail] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [erroGeral, setErroGeral] = useState("");

    // Mês dinâmico do mockup
    const mesAtual = useMemo(() => {
        return new Date().toLocaleString("pt-BR", {
            month: "long",
        });
    }, []);

    function validarFormulario() {

        setErroNome("");
        setErroEmail("");
        setErroSenha("");
        setErroGeral("");

        let valido = true;

        if (!nome.trim()) {
            setErroNome("Informe seu nome.");
            valido = false;
        }

        if (!email.trim()) {
            setErroEmail("Informe seu email.");
            valido = false;
        }

        if (!senha.trim()) {
            setErroSenha("Informe sua senha.");
            valido = false;
        } else if (senha.length < 8) {
            setErroSenha(
                "A senha deve possuir no mínimo 8 caracteres."
            );
            valido = false;
        }

        return valido;
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/cadastro", {
                nome,
                email,
                senha,
            });

            sessionStorage.setItem(
                "verificationEmail",
                email
            );

            router.push(
                `/verify-email?email=${encodeURIComponent(email)}`
            );

        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 409) {

                    setErroEmail(
                        "Já existe uma conta cadastrada com este email."
                    );

                    return;
                }
            }

            setErroGeral(
                "Não foi possível criar sua conta."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-4">

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

                <form
                    onSubmit={handleRegister}
                    className="w-full max-w-md"
                >

                    <h2 className="text-3xl font-bold">
                        Criar conta
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Comece em poucos segundos
                    </p>

                    {/* NOME */}
                    <div className="mt-6">
                        <label className="text-sm font-medium">
                            Nome
                        </label>

                        <input
                            type="text"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full mt-2 p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3C]/30 transition"
                            placeholder="Seu nome"
                        />
                        {
                            erroNome && (
                                <p className="text-red-500 text-sm mt-1">
                                    {erroNome}
                                </p>
                            )
                        }
                    </div>

                    {/* EMAIL */}
                    <div className="mt-4">
                        <label className="text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3C]/30 transition"
                            placeholder="seuemail@exemplo.com"
                        />
                        {
                            erroEmail && (
                                <p className="text-red-500 text-sm mt-1">
                                    {erroEmail}
                                </p>
                            )
                        }
                    </div>

                    {/* SENHA */}
                    <div className="mt-4">
                        <label className="text-sm font-medium">
                            Senha
                        </label>

                        <input
                            type="password"
                            minLength={8}
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full mt-2 p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3C]/30 transition"
                            placeholder="••••••••"
                        />
                        {
                            erroSenha && (
                                <p className="text-red-500 text-sm mt-1">
                                    {erroSenha}
                                </p>
                            )
                        }
                    </div>

                    {/* BOTÃO */}
                    {
                        erroGeral && (
                            <div className="
                                mt-4
                                rounded-lg
                                bg-red-50
                                border
                                border-red-200
                                p-3
                                text-sm
                                text-red-600
                            ">
                                                    {erroGeral}
                            </div>
                        )
                    }
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            mt-6
                            bg-[#1E7A3C]
                            text-white
                            py-3
                            rounded-lg
                            hover:bg-[#176430]
                            transition-all
                            duration-300
                            disabled:opacity-60
                        "
                    >
                        {loading ? "Criando conta..." : "Criar conta"}
                    </button>

                    {/* LINK LOGIN */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Já tem conta?{" "}
                        <a href="/login" className="text-[#1E7A3C] font-medium">
                            Entrar
                        </a>
                    </p>

                </form>
            </div>

        </div>
    );
}