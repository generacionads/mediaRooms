"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";

interface BackgroundCirclesProps {
    className?: string;
    variant?: keyof typeof COLOR_VARIANTS;
}

// Adapted to MediaRooms brand:
// primary (cyan #48d7de theme) & secondary (dark #083e45 theme)
const COLOR_VARIANTS = {
    primary: {
        border: [
            "border-[#48d7de]/60",
            "border-[#48d7de]/50",
            "border-[#083e45]/30",
        ],
        gradient: "from-[#48d7de]/30",
        blurCenter: "#48d7de",
        blurOuter: "#083e45",
    },
    secondary: {
        border: [
            "border-[#083e45]/60",
            "border-[#083e45]/50",
            "border-[#48d7de]/30",
        ],
        gradient: "from-[#083e45]/30",
        blurCenter: "#083e45",
        blurOuter: "#48d7de",
    },
} as const;

export function BackgroundCircles({
    className,
    variant = "primary",
}: BackgroundCirclesProps) {
    const variantStyles = COLOR_VARIANTS[variant];

    return (
        <div
            className={clsx(
                "relative flex h-full w-full items-center justify-center overflow-hidden",
                className
            )}
        >
            <motion.div className="absolute h-[480px] w-[480px]">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={clsx(
                            "absolute inset-0 rounded-full",
                            "border-2 bg-gradient-to-br to-transparent",
                            variantStyles.border[i],
                            variantStyles.gradient
                        )}
                        animate={{
                            rotate: 360,
                            scale: [1, 1.05 + i * 0.05, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 5 + i * 2, // Slight offset for each ring
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <div
                            className={clsx(
                                "absolute inset-0 rounded-full mix-blend-screen",
                                `bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace(
                                    "from-",
                                    ""
                                )}/10%,transparent_70%)]`
                            )}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="relative z-10 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {/* Logo inside the circles */}
                {/* Figma Isologo */}
                <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px]">
                    <Image
                        src="/assets/Logo-isologo.svg"
                        alt="MediaRooms Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_16px_rgba(72,215,222,0.4)]"
                        priority
                    />
                </div>
            </motion.div>

            <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)] -z-10 pointer-events-none">
                <div className={clsx("absolute inset-0 blur-[120px] opacity-40", `bg-[radial-gradient(ellipse_at_center,${variantStyles.blurCenter},transparent_70%)]`)} />
                <div className={clsx("absolute inset-0 blur-[80px] opacity-30", `bg-[radial-gradient(ellipse_at_center,${variantStyles.blurOuter},transparent)]`)} />
            </div>
        </div>
    );
}
