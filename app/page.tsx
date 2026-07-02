"use client";

import Image from "next/image";
import { Wallet, FolderKanban, BarChart3, CreditCard } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="relative overflow-x-hidden bg-[#F7F8F5] text-gray-900">
            {/* HEADER */}
            <header className="
                    fixed
                    top-0
                    left-0
                    right-0
                    z-50
                    backdrop-blur-xl
                    bg-[#F7F8F5]/80
                    border-b
                    border-black/5
                "
                        >
                <div className="
                        max-w-7xl
                        mx-auto
                        px-4 sm:px-6
                        h-16 sm:h-20
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div className="
                        flex
                        items-center
                        gap-3
                        transition-all
                        duration-300
                        hover:scale-105
                    "
                                    >
                        <div className="w-8 h-8rounded-md" />

                        <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-[#1E7A3C]
                                shadow-lg
                                shadow-[#1E7A3C]/20
                                flex
                                items-center
                                justify-center
                                "
                        >
                            <Wallet
                                size={20}
                                className="text-white"
                            />
                        </div>
                        Saldium
                    </div>

                    <nav className="hidden md:flex gap-8 text-sm text-gray-600">
                        <a href="#features" className="hover:text-black">
                            Funcionalidades
                        </a>
                        <a href="#how" className="hover:text-black">
                            Como funciona
                        </a>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <a href="/login" className="text-sm hover:underline">
                            Entrar
                        </a>
                        <a
                            href="/register"
                            className="
                                    hidden
                                    sm:inline-flex
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    border
                                    hover:bg-white
                                    transition
                                "
                        >
                            Começar grátis
                        </a>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="
                    pt-24
                    sm:pt-32
                    pb-16
                    sm:pb-20
                    px-4
                    sm:px-6
                    max-w-6xl
                    mx-auto
                    text-center
                    "
            >
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#1E7A3C]/10 text-[#1E7A3C] text-xs font-semibold tracking-widest">
                    CONTROLE FINANCEIRO SIMPLES E DIRETO
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold mt-4 leading-tight">
                    Entenda para onde <br />
                    <span className="text-[#1E7A3C]"> seu dinheiro vai.</span>
                </h1>

                <p className="mt-5 px-2 sm:px-0 text-gray-600 max-w-2xl mx-auto">
                    Registre suas receitas e despesas, organize por categorias e visualize seus relatórios mensais — sem complicação, sem jargão financeiro.
                </p>

                <div className="
                        mt-8
                        flex
                        justify-center
                        "
                >
                    <a href="/register"
                        className="
                        bg-green-700
                        text-white
                        w-full
                        sm:w-auto
                        max-w-xs
                        px-6
                        py-3
                        rounded-full
                        font-medium
                        hover:bg-green-800
                        transition
                        "
                    >
                        Criar conta grátis →
                    </a>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 justify-center text-sm text-gray-500 font-light">

                    <div className="flex items-center gap-2">
                        <span className="text-[#1E7A3C]">✓</span>
                        <span>Sem necessidade de cartão de crédito</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[#1E7A3C]">✓</span>
                        <span>100% Gratuito</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[#1E7A3C]">✓</span>
                        <span>Comece em menos de 2 minutos</span>
                    </div>

                </div>

                {/* MOCKUP */}
                <div className="relative flex justify-center mt-12">

                    <div
                        className="
                            relative
                            w-full
                            max-w-5xl
                            rounded-2xl
                            overflow-hidden
                            border
                            shadow-2xl
                            bg-white
                            scale-100
                            sm:scale-[1.05]
                            hover:sm:scale-[1.07]
                            transition-all
                            duration-500
                        "
                                        >
                        <Image
                            src="/images/img.png"
                            alt="Dashboard Saldium"
                            width={1400}
                            height={900}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                </div>
            </section>
            <div className="
                    absolute
                    top-0
                    left-1/2
                    -translate-x-1/2
                    w-[450px]
                    h-[450px]
                    sm:w-[900px]
                    sm:h-[900px]
                    rounded-full
                    bg-[#1E7A3C]/5
                    blur-3xl
                    -z-10
                "
            />
            {/* FEATURES */}
            <section id="features" className="bg-white px-4 sm:px-6 py-24">
                <div className="text-center max-w-6xl mx-auto px-6">
                  <span className=" text-[#1E7A3C] text-sm font-semibold tracking-wide uppercase">
                    Funcionalidades
                  </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">
                        Tudo que você precisa.
                    </h2>

                    <p className="text-gray-600 mt-3 mb-16 max-w-xl mx-auto">
                        Organize suas finanças, acompanhe sua evolução e tome decisões melhores com dados claros.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* CARD 1 */}
                        <div className="
                            bg-[#FCFCFA]
                            border
                            border-gray-200
                            rounded-2xl
                            p-6
                            sm:p-8
                            min-h-[240px]
                            sm:min-h-[280px]
                            hover:shadow-2xl
                            hover:border-[#1E7A3C]/20
                            hover:-translate-y-3
                            hover:scale-[1.02]
                            transition-all
                            duration-300
                            ">
                            <div
                                className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-[#1E7A3C]/10
                                text-[#1E7A3C]
                                flex
                                items-center
                                justify-center
                                mb-6
                                transition-all
                                duration-300
                                group-hover:bg-[#1E7A3C]
                                group-hover:text-white
                            "
                            >
                                <CreditCard
                                    className="text-[#1E7A3C]"
                                    size={28}
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Registrar gastos e receitas</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Anote qualquer movimentação financeira em segundos. Defina o valor, a data e uma breve descrição — sem formulários complicados.
                            </p>
                            <span className="text-sm text-500 text-[#1E7A3C]">
                              Organize tudo em um só lugar
                            </span>
                        </div>

                        {/* CARD 2 */}
                        <div className="
                            bg-[#FCFCFA]
                            border
                            border-gray-200
                            rounded-2xl
                            p-6
                            sm:p-8
                            min-h-[240px]
                            sm:min-h-[280px]
                            hover:shadow-2xl
                            hover:border-[#1E7A3C]/20
                            hover:-translate-y-3
                            hover:scale-[1.02]
                            transition-all
                            duration-300
                            ">
                            <div
                                className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-[#1E7A3C]/10
                                text-[#1E7A3C]
                                flex
                                items-center
                                justify-center
                                mb-6
                                transition-all
                                duration-300
                                group-hover:bg-[#1E7A3C]
                                group-hover:text-white
                            "
                            >
                                <FolderKanban
                                    className="text-[#1E7A3C]"
                                    size={28}
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Categorias personalizadas</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Separe suas transações por categorias que fazem sentido para você: Alimentação, Transporte, Lazer, Saúde e muito mais.
                            </p>
                            <span className="text-sm text-500 text-[#1E7A3C]">
                              Crie, renomeie e organize as categorias do jeito que quiser.
                            </span>
                        </div>

                        {/* CARD 3 */}
                        <div className="
                            bg-[#FCFCFA]
                            border
                            border-gray-200
                            rounded-2xl
                            p-6
                            sm:p-8
                            min-h-[240px]
                            sm:min-h-[280px]
                            hover:shadow-2xl
                            hover:border-[#1E7A3C]/20
                            hover:-translate-y-3
                            hover:scale-[1.02]
                            transition-all
                            duration-300
                            ">
                            <div
                                className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-[#1E7A3C]/10
                                text-[#1E7A3C]
                                flex
                                items-center
                                justify-center
                                mb-6
                                transition-all
                                duration-300
                                group-hover:bg-[#1E7A3C]
                                group-hover:text-white
                            "
                            >
                                <BarChart3
                                    className="text-[#1E7A3C]"
                                    size={28}
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Relatórios inteligentes</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Visualize gráficos e tabelas que mostram exatamente quanto você ganhou, gastou e economizou em cada período.
                            </p>
                            <span className="text-sm text-500 text-[#1E7A3C]">
                              Compare meses, identifique padrões e tome decisões mais conscientes.
                            </span>
                        </div>
                    </div>
                </div>


            </section>

            {/* HOW IT WORKS */}
            <section id="how" className="max-w-6xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
                    {/* COLUNA ESQUERDA */}
                    <div>
                        <span className="text-[#1E7A3C] text-sm font-semibold uppercase tracking-wide">
                            Como funciona
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">
                            Comece a organizar sua vida financeira em minutos.
                        </h2>

                        <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-md">
                            O Saldium foi criado para simplificar o controle financeiro.
                            Em poucos passos você registra suas movimentações e acompanha
                            sua evolução com clareza.
                        </p>
                    </div>

                    {/* COLUNA DIREITA */}
                    <div className="relative">

                        <div
                            className="
                            absolute
                            left-[19px]
                            top-5
                            bottom-5
                            w-px
                            bg-[#1E7A3C]/20
                            "
                        />

                        <div className="space-y-10">

                            {[
                                {
                                    titulo: "Crie sua conta",
                                    descricao:
                                        "Cadastro gratuito em menos de 2 minutos. Sem cartão de crédito necessário."
                                },
                                {
                                    titulo: "Registre suas movimentações",
                                    descricao:
                                        "Adicione receitas e despesas conforme elas acontecem no seu dia a dia."
                                },
                                {
                                    titulo: "Organize por categorias",
                                    descricao:
                                        "Entenda exatamente para onde seu dinheiro está indo mês após mês."
                                },
                                {
                                    titulo: "Acompanhe sua evolução",
                                    descricao:
                                        "Visualize gráficos e relatórios que mostram sua evolução financeira."
                                }
                            ].map((item, index) => (

                                <div
                                    key={index}
                                    className="flex items-start gap-5"
                                >

                                    <div
                                        className="
                            flex-shrink-0
                            w-10
                            h-10
                            rounded-full
                            bg-[#1E7A3C]
                            text-white
                            flex
                            items-center
                            justify-center
                            font-semibold
                            "
                                    >
                                        {index + 1}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {item.titulo}
                                        </h3>

                                        <p className="text-gray-600 mt-1 leading-relaxed">
                                            {item.descricao}
                                        </p>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="px-6 py-20 sm:py-28 text-center bg-[#F3F7F2] border-t">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
                    Pare de adivinhar para onde seu dinheiro está indo.
                </h2>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 leading-relaxed">
                    Junte-se a quem já decidiu parar de controlar finanças em planilhas
                    e começou a entender exatamente para onde vai cada centavo.
                </p>

                <a
                    href="/register"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        mt-8
                        bg-[#1E7A3C]
                        text-white
                        w-full
                        max-w-sm
                        sm:w-auto
                        px-8
                        py-4
                        rounded-full
                        font-medium
                        hover:bg-[#176430]
                        transition-all
                        duration-300
                        hover:scale-105
                        shadow-lg
                        shadow-[#1E7A3C]/25
                        hover:shadow-xl
                        hover:shadow-[#1E7A3C]/40
                    "
                >
                    Criar conta gratuitamente
                </a>
            </section>

            <footer className="border-t border-gray-200 py-8">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-6
                            text-center
                            md:text-left">

                        {/* LOGO */}
                        <div className="
                                flex
                                items-center
                                justify-center
                                md:justify-start
                                gap-3
                                ">

                            <div
                                className="
                                w-10
                                h-10
                                rounded-xl
                                bg-[#1E7A3C]
                                flex
                                items-center
                                justify-center
                                hover:opacity-80
                                transition
                                cursor-pointer
                                "
                            >
                                <Wallet
                                    size={20}
                                    className="text-white"
                                />
                            </div>

                            <span className="font-semibold text-lg">
                                Saldium
                            </span>

                        </div>

                        <p className="text-center text-sm text-gray-500">
                            © 2026 Saldium. Feito para simplificar sua vida financeira.
                        </p>
                    </div>

                </div>
            </footer>
        </div>
    );
}