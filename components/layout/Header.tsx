"use client";

import { buscarUsuario, UserResponse } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function Header() {

    const [usuario, setUsuario] =
        useState<UserResponse | null>(null);

    useEffect(() => {

        async function carregarUsuario() {
            try {
                const data = await buscarUsuario();
                setUsuario(data);
            } catch (error) {
                console.error(error);
            }
        }

        carregarUsuario();

    }, []);

    return (

        <header className="
                flex-1
                h-16
                sm:h-20
                px-4
                sm:px-8
                flex
                items-center
                justify-end
            "
        >

            {/* AVATAR */}
            <div
                className="
                    w-8
                    h-8
                    sm:w-10
                    sm:h-10
                    rounded-full
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                    font-semibold
                    text-blue-700
                    text-sm
                "
            >
                {usuario?.nome?.charAt(0).toUpperCase() ?? "?"}
            </div>

        </header>

    );
}