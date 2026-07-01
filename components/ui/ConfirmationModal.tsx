"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "danger" | "primary";
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({
                                              open,
                                              title,
                                              description,
                                              confirmText = "Confirmar",
                                              cancelText = "Cancelar",
                                              confirmVariant = "danger",
                                              loading = false,
                                              onCancel,
                                              onConfirm,
                                          }: ConfirmationModalProps) {

    if (!open) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                backdrop-blur-sm
                p-4
            "
        >
            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    bg-white
                    shadow-2xl
                    p-6
                    sm:p-8
                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                "
            >

                <div className="flex items-center gap-4">

                    <div
                        className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-red-50
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <AlertTriangle
                            className="text-red-500"
                            size={28}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">
                            {title}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    </div>

                </div>

                <div
                    className="
                        flex
                        flex-col-reverse
                        sm:flex-row
                        justify-end
                        gap-3
                        mt-8
                    "
                >

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            w-full
                            sm:w-auto
                            px-5
                            py-3
                            rounded-xl
                            border
                            hover:bg-gray-50
                            transition
                        "
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`
                            w-full
                            sm:w-auto
                            px-5
                            py-3
                            rounded-xl
                            text-white
                            transition
                            disabled:opacity-50
                            ${
                            confirmVariant === "danger"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-[#1E7A3C] hover:bg-[#176430]"
                        }
                        `}
                    >
                        {loading
                            ? "Processando..."
                            : confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
}