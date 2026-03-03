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
    action?: "collapse" | "expand";
    onClick?: () => void;
};

const PATH_ARROW = "M6 18V8H9V12.75L15.8 5.95L18 8.15L11.15 15H16V18H6Z";

export default function BtnPry({ className, theme = "cyan", text = "Calcula tu Ahorro", action = "collapse", onClick }: BtnPryProps) {
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

    // Magnetic Tracking Refs
    const mouseXRef = useRef(0);
    const xTo = useRef<gsap.QuickToFunc | null>(null);

    useGSAP(() => {
        if (action === "collapse" && containerRef.current) {
            // Setup a high-performance instant tracker specific for X coordinates
            xTo.current = gsap.quickTo(containerRef.current, "x", { duration: 0.15, ease: "power2.out" });
        }

        // Create a paused timeline that animates the button collapsing
        const tl = gsap.timeline({
            paused: true,
            onUpdate: () => {
                // The magic formula: as the padding smoothly collapses (progress 0 -> 1)
                // We proportionally unlock the tracked X coordinate (100px * 0.5) = 50px
                // Which means the container never physically shoots out of its boundary limits.
                if (action === "collapse" && xTo.current) {
                    xTo.current(mouseXRef.current * tl.progress());
                }
            },
            onComplete: () => {
                // When finishing the collapse/expand, if the user already moved away, 
                // and it's NOT the collapse action (which handles leaving dynamically), reverse it
                if (!isHoveredRef.current && action !== "collapse") {
                    tl.reverse();
                }
            }
        });

        if (action === "collapse") {
            // Easing for the container to collapse padding
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
        } else if (action === "expand") {
            // Revert logic: Start collapsed, animate to natural flex dimensions
            const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
            const circlePad = isDesktop ? 24.5 : 18;

            tl.from(containerRef.current, {
                paddingLeft: circlePad,
                paddingRight: circlePad,
                gap: 0,
                ease: "power3.inOut",
                duration: 0.5,
            }, 0);

            if (textRef.current) {
                tl.from(textRef.current, {
                    opacity: 0,
                    width: 0,
                    ease: "power3.inOut",
                    duration: 0.4,
                }, 0);
            }
        }

        tlRef.current = tl;
    }, [action]);

    const calculateTargetX = (e: React.MouseEvent | MouseEvent) => {
        if (!parentRef.current) return 0;
        const rect = parentRef.current.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const centerX = rect.width / 2;
        let targetX = cursorX - centerX;

        const finalWidth = window.innerWidth >= 1024 ? 73 : 56;
        const maxOffset = Math.max(0, (rect.width - finalWidth) / 2);

        if (targetX > maxOffset) targetX = maxOffset;
        if (targetX < -maxOffset) targetX = -maxOffset;

        return targetX;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        isHoveredRef.current = true;

        if (action === "collapse") {
            mouseXRef.current = calculateTargetX(e);
        }

        if (tlRef.current) {
            tlRef.current.play();
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isHoveredRef.current || action !== "collapse") return;

        // Continuously update the mathematical target relative to the cursor
        mouseXRef.current = calculateTargetX(e);

        // If the timeline finished (progress=1), we actively send coordinates to the tracker.
        // If progressing, tl's onUpdate handles it proportionally to prevent layout stretching!
        if (tlRef.current && tlRef.current.progress() === 1 && xTo.current) {
            xTo.current(mouseXRef.current);
        }
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;

        // Rather than strictly locking pointer-events (which swallows fast clicks),
        // we just smoothly let the tracker return to 0 through the timeline progress.
        if (tlRef.current) {
            tlRef.current.reverse();
        }
    };

    // We add an outer wrapper that keeps the original width, 
    // ensuring the mouse hit area doesn't shrink when the inner button collapses.
    const [wrapperWidth, setWrapperWidth] = useState<number | "auto">("auto");

    useEffect(() => {
        // On mount, measure the natural width and lock it so the wrapper doesn't shrink
        // We only do this for the collapse variant so the click area remains stable
        if (parentRef.current && action === "collapse") {
            setWrapperWidth(parentRef.current.offsetWidth);
        }
    }, [text, action]);

    return (
        <div
            ref={parentRef}
            className={`relative flex items-center justify-center cursor-pointer ${className || ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ width: wrapperWidth !== "auto" ? wrapperWidth : "max-content", height: "100%" }}
        >
            <motion.div
                whileTap={{ scale: 0.93 }}
                className="w-full h-full flex items-center justify-center"
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
        </div>
    );
}
