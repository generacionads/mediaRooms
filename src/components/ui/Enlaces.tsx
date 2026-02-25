"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
        <motion.a
            href={href}
            className={`block relative w-full lg:w-[1320px] transition-colors duration-300 ${className || ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
            }}
        >
            <p className={`relative font-['Gebuk'] leading-[1.2] lg:leading-[90px] not-italic text-[40px] lg:text-[80px] transition-colors duration-300 ${isLinkHover ? "text-[#083e45]" : "text-white"}`}>
                {children}
            </p>
        </motion.a>
    );
}
