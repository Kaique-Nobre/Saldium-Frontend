"use client";

interface CardProps {
    title: string;
    value: number;
    type?: "success" | "danger" | "primary" | "neutral";
}

export default function Card({
                                 title,
                                 value,
                                 type = "neutral"
                             }: CardProps) {

    const colorMap = {
        success: "text-green-600",
        danger: "text-red-600",
        primary: "text-blue-600",
        neutral: "text-gray-800",
    };

    return (
        <div className="p-4 border rounded-lg bg-white">

            <p className="text-sm text-gray-500">
                {title}
            </p>

            <p className={`text-xl font-bold ${colorMap[type]}`}>
                {value}
            </p>

        </div>
    );
}