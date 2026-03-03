"use client";

import { useEffect, useRef } from "react";
import { motion, ValueAnimationTransition } from "framer-motion";

interface UnderlineHoverLinkProps {
    label: string;
    href?: string;
    className?: string;
    transition?: ValueAnimationTransition;
    onClick?: () => void;
    targetTextColor?: string;
    underlineHeightRatio?: number;
    underlinePaddingRatio?: number;
    paddingX?: string;
    paddingY?: string;
    borderRadius?: string;
}

export default function UnderlineHoverLink({
    label,
    href = "#",
    className = "",
    onClick,
    transition = { type: "spring", damping: 30, stiffness: 300 },
    underlineHeightRatio = 0.1,
    underlinePaddingRatio = 0.05,
    targetTextColor = "#083e45", // Dark cyan (brand bg color) so text contrasts when bg fills
    paddingX = "12px",
    paddingY = "4px",
    borderRadius = "99px",
    ...props
}: UnderlineHoverLinkProps) {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const updateUnderlineStyles = () => {
            if (textRef.current) {
                const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize);
                const underlineHeight = fontSize * underlineHeightRatio;
                const underlinePadding = fontSize * underlinePaddingRatio;
                textRef.current.style.setProperty("--underline-height", `${underlineHeight}px`);
                textRef.current.style.setProperty("--underline-padding", `${underlinePadding}px`);
                textRef.current.style.setProperty("--custom-padding-x", paddingX);
                textRef.current.style.setProperty("--custom-padding-y", paddingY);
                textRef.current.style.setProperty("--custom-border-radius", borderRadius);
            }
        };

        updateUnderlineStyles();
        window.addEventListener("resize", updateUnderlineStyles);

        return () => window.removeEventListener("resize", updateUnderlineStyles);
    }, [underlineHeightRatio, underlinePaddingRatio, paddingX, paddingY, borderRadius]);

    const underlineVariants = {
        initial: {
            height: "var(--underline-height)",
            bottom: "calc(-1 * var(--underline-padding))",
            left: "0",
            width: "100%",
            borderRadius: "0px",
        },
        target: {
            height: "calc(100% + var(--custom-padding-y) * 2)",
            bottom: "calc(-1 * var(--custom-padding-y))",
            left: "calc(-1 * var(--custom-padding-x))",
            width: "calc(100% + var(--custom-padding-x) * 2)",
            borderRadius: "var(--custom-border-radius)",
            transition: transition,
        },
    };

    const textVariants = {
        initial: {
            color: "currentColor",
        },
        target: {
            color: targetTextColor,
            transition: transition,
        },
    };

    return (
        <a href={href} className="outline-none" onClick={onClick}>
            <motion.span
                className={`relative inline-block cursor-pointer ${className}`}
                initial="initial"
                whileHover="target"
                ref={textRef}
                {...props}
            >
                <motion.div
                    className="absolute bg-current z-[-1]"
                    variants={underlineVariants}
                    aria-hidden="true"
                />
                <motion.span variants={textVariants} className="text-current relative z-10">
                    {label}
                </motion.span>
            </motion.span>
        </a>
    );
}
