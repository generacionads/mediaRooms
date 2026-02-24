"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(useGSAP);

export type BtnPryProps = {
    className?: string;
    theme?: "cyan" | "dark";
    text?: string;
    onClick?: () => void;
};

const PATH_ARROW = "M6 18V8H9V12.75L15.8 5.95L18 8.15L11.15 15H16V18H6Z";

export default function BtnPry({ className, theme = "cyan", text = "Calcula tu Ahorro", onClick }: BtnPryProps) {
    const parentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    // Use a ref to store the timeline so we can control it on enter/leave
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isHoveredRef = useRef(false);

    // Cyan Theme (Default) -> Bg: Cyan, Text: Dark
    // Dark Theme -> Bg: Dark, Text: Cyan
    // Colors do not invert anymore.
    const isCyanTheme = theme === "cyan";
    const defaultBg = isCyanTheme ? "#48d7de" : "#083e45";
    const defaultFg = isCyanTheme ? "#083e45" : "#48d7de";

    useGSAP(() => {
        // Create a paused timeline that animates the button collapsing into a circle
        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                // When finishing the collapse, if the user already moved away, reverse it
                if (!isHoveredRef.current) {
                    tl.reverse();
                }
            }
        });

        // Easing for the container
        tl.to(containerRef.current, {
            paddingLeft: 24,
            paddingRight: 24,
            gap: 0,
            ease: "power3.inOut",
            duration: 0.5,
        }, 0);

        // Easing for the text to disappear
        if (textRef.current) {
            tl.to(textRef.current, {
                opacity: 0,
                width: 0,
                ease: "power3.inOut",
                duration: 0.4,
            }, 0);
        }

        tlRef.current = tl;
    }, []);

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
        if (tlRef.current) {
            tlRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        if (tlRef.current) {
            // Only reverse if the timeline is already done playing forward
            if (tlRef.current.progress() === 1) {
                tlRef.current.reverse();
            }
            // If it's still playing forward (progress < 1), we let the onComplete handle it
        }
    };

    // We add an outer wrapper that keeps the original width, 
    // ensuring the mouse hit area doesn't shrink when the inner button collapses.
    const [wrapperWidth, setWrapperWidth] = useState<number | "auto">("auto");

    useEffect(() => {
        // On mount, measure the natural width and lock it so the wrapper doesn't shrink
        if (parentRef.current) {
            setWrapperWidth(parentRef.current.offsetWidth);
        }
    }, [text]);

    return (
        <motion.div
            whileTap={{ scale: 0.93 }}
            ref={parentRef}
            className={`relative flex items-center cursor-pointer ${className || ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ width: wrapperWidth !== "auto" ? wrapperWidth : "max-content", height: "100%" }}
        >
            <div
                ref={containerRef}
                className="flex items-center justify-center relative rounded-[99px] h-[56px] lg:h-[73px] overflow-hidden px-[24px] lg:px-[32px] py-[16px] lg:py-[24px] gap-[8px] lg:gap-[12px]"
                style={{ backgroundColor: defaultBg }}
            >
                <p
                    ref={textRef}
                    className="font-['Gebuk'] leading-[normal] not-italic relative shrink-0 text-[24px] lg:text-[32px] whitespace-nowrap overflow-hidden"
                    style={{ color: defaultFg }}
                >
                    {text}
                </p>

                <div className="relative shrink-0 w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d={PATH_ARROW} fill={defaultFg} />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}
