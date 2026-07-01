"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buscarUsuario, UserResponse } from "@/services/user.service";

import {
    LayoutDashboard,
    Receipt,
    Tags,
    BarChart3,
    Settings,
    TrendingUp
} from "lucide-react";

export default function Sidebar({
                                    onNavigate,
                                }: {
                                    onNavigate?: () => void;
                                }) {

    const pathname =
        usePathname();

    const [usuario, setUsuario] =
        useState<UserResponse | null>(null);

    const menuItems = [
        {
            nome: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard
        },
        {
            nome: "Transações",
            href: "/transacoes",
            icon: Receipt
        },
        {
            nome: "Categorias",
            href: "/categorias",
            icon: Tags
        },
        {
            nome: "Relatórios",
            href: "/relatorios",
            icon: BarChart3
        },
        {
            nome: "Configurações",
            href: "/settings",
            icon: Settings
        }
    ];

    useEffect(() => {

        async function carregarUsuario() {

            try {
                const data =
                    await buscarUsuario();
                setUsuario(data);
            } catch (error) {
                console.error(error);
            }
        }
        carregarUsuario();

    }, []);

    return (

        <aside
            className="
                w-64
                min-h-screen
                border-r
                bg-white
                flex
                flex-col
                p-6
            "
        >

            <div className="flex items-center gap-3 mb-10">

                <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-black
                    flex
                    items-center
                    justify-center
                    shadow-sm
                    "
                    >
                    <TrendingUp
                        size={20}
                        className="text-white"
                        strokeWidth={2.5}
                    />
                </div>

                <div className="leading-tight">

                    <h1 className="
                        text-xl
                        font-bold
                        tracking-tight
                        text-gray-900
                        "
                        >
                        Saldium
                    </h1>

                    <p className="
                        text-xs
                        text-gray-500
                        font-medium
                        "
                        >
                        Controle Financeiro
                    </p>

                </div>

            </div>

            <nav
                className="
                    flex
                    flex-col
                    gap-2
                    "
                >

                {
                    menuItems.map(item => {

                        const Icon =
                            item.icon;

                        const ativo =
                            pathname === item.href;

                        return (

                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className={`
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-lg
                                    transition-colors

                                    ${
                                    ativo
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-100"
                                }
                                `}
                            >

                                <Icon
                                    size={18}
                                />

                                {item.nome}

                            </Link>

                        );

                    })
                }

            </nav>

            <div className="mt-auto">

                <div
                    className="
                        border-t
                        pt-4
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <div>

                            <p
                                className="
                                    font-medium
                                "
                            >
                                {usuario?.nome ?? "Carregando..."}
                            </p>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                "
                            >
                                {usuario?.email ?? ""}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </aside>

    );
}