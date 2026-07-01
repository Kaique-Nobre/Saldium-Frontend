"use client";

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel: string;
    onAction: () => void;
}

export default function EmptyState({
                                       icon: Icon,
                                       title,
                                       description,
                                       actionLabel,
                                       onAction,
                                   }: EmptyStateProps) {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                border
                border-dashed
                border-gray-300
                p-12
                flex
                flex-col
                items-center
                justify-center
                text-center
                shadow-sm
                h-full
                min-h-[420px]
            "
        >

            <div
                className="
                    w-20
                    h-20
                    rounded-full
                    bg-[#1E7A3C]/10
                    flex
                    items-center
                    justify-center
                    mb-6
                "
            >
                <Icon
                    size={40}
                    className="text-[#1E7A3C]"
                />
            </div>

            <h2 className="text-2xl font-semibold">
                {title}
            </h2>

            <p className="mt-3 text-gray-500 max-w-sm leading-relaxed">
                {description}
            </p>

            <button
                onClick={onAction}
                className="
                    mt-8
                    px-6
                    py-3
                    rounded-xl
                    bg-[#1E7A3C]
                    text-white
                    hover:bg-[#176430]
                    transition
                "
            >
                {actionLabel}
            </button>

        </div>

    );

}