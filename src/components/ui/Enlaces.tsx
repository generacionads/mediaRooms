"use client";

import { useState } from "react";

export type EnlacesProps = {
    className?: string;
    variant?: "link_hover" | "link_default";
    children: React.ReactNode;
    href?: string;
};

export default function Enlaces({ className, variant = "link_default", children, href = "#" }: EnlacesProps) {
    const [isHovered, setIsHovered] = useState(false);
    const currentVariant = isHovered ? "link_hover" : variant;
    const isLinkHover = currentVariant === "link_hover";

    return (
        <a
            href={href}
            className={`block h-[90px] relative w-full lg:w-[1320px] transition-colors duration-300 ${className || ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p className={`absolute font-['Gebuk'] inset-0 leading-[90px] not-italic text-[80px] whitespace-pre-wrap transition-colors duration-300 ${isLinkHover ? "text-[#083e45]" : "text-white"}`}>
                {children}
            </p>
        </a>
    );
}
