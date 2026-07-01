"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Menu, X } from "lucide-react";

export default function AppLayout({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {

    const [menuAberto, setMenuAberto] =
        useState(false);

    function toggleMenu() {
        setMenuAberto(prev => !prev);
    }

    function fecharMenu() {
        setMenuAberto(false);
    }

    return (
        <div className="flex min-h-screen bg-[#F7F8F5]">

            {/* SIDEBAR DESKTOP */}
            <div className="hidden lg:flex">
                <Sidebar />
            </div>

            {/* MOBILE OVERLAY */}
            {menuAberto && (
                <div
                    onClick={fecharMenu}
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        z-40
                        lg:hidden
                    "
                />
            )}

            {/* SIDEBAR MOBILE (DRAWER) */}
            <div
                className={`
                    fixed
                    top-0
                    left-0
                    h-full
                    w-72
                    bg-white
                    z-50
                    shadow-xl
                    transform
                    transition-transform
                    duration-300
                    lg:hidden
                    ${menuAberto
                    ? "translate-x-0"
                    : "-translate-x-full"}
                `}
            >
                <Sidebar onNavigate={fecharMenu} />
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex-1 flex flex-col">

                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border-b lg:px-6">

                    {/* BOTÃO MENU MOBILE */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden"
                    >
                        {menuAberto
                            ? <X size={22} />
                            : <Menu size={22} />
                        }
                    </button>

                    {/* HEADER ORIGINAL */}
                    <Header />

                </div>

                {/* CONTEÚDO */}
                <main className="flex-1 p-4 lg:p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}