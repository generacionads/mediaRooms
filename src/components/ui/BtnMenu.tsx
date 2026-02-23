"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(useGSAP);

export type BtnMenuProps = {
    className?: string;
    variant?: "btn_close" | "btn_open";
    onClick?: () => void;
};

// Original Material Design SVG paths imported from Figma
const PATH_MENU = "M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z";
const PATH_CLOSE = "M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z";

export default function BtnMenu({ className, variant = "btn_close", onClick }: BtnMenuProps) {
    const isBtnOpen = variant === "btn_open";
    const containerRef = useRef<HTMLButtonElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isHoveredRef = useRef(false);

    useGSAP(() => {
        // Paused timeline for expansion on hover or state change
        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                // When finishing the expansion, if the user already moved away and it's not open, reverse it
                if (!isHoveredRef.current && !isBtnOpen) {
                    tl.reverse();
                }
            }
        });

        tl.to(containerRef.current, {
            gap: 16,
            paddingLeft: 32,
            paddingRight: 32,
            ease: "power3.inOut",
            duration: 0.5,
        }, 0);

        if (textRef.current) {
            tl.to(textRef.current, {
                opacity: 1,
                width: "auto",
                ease: "power3.inOut",
                duration: 0.4,
            }, 0);
        }

        tlRef.current = tl;
    }, []);

    useGSAP(() => {
        // Icon morph animation mapped directly to state (not hover)
        gsap.to(pathRef.current, {
            attr: { d: isBtnOpen ? PATH_CLOSE : PATH_MENU },
            ease: "power3.inOut",
            duration: 0.5,
        });

        // Trigger or reverse expansion depending on state
        // if user opens menu (isBtnOpen=true), play if not played
        // if user closes menu (isBtnOpen=false), reverse ONLY IF not hovered
        // Added small check to avoid reacting before tl is ready
        if (tlRef.current) {
            if (isBtnOpen) {
                tlRef.current.play();
            } else if (!isHoveredRef.current) {
                if (tlRef.current.progress() === 1) {
                    tlRef.current.reverse();
                }
            }
        }
    }, [isBtnOpen]);

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
        if (tlRef.current && !isBtnOpen) {
            tlRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        if (tlRef.current && !isBtnOpen) {
            if (tlRef.current.progress() === 1) {
                tlRef.current.reverse();
            }
        }
    };

    return (
        <motion.button
            whileTap={{ scale: 0.93 }}
            ref={containerRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`bg-white text-[#083e45] flex flex-row items-center justify-center relative rounded-[99px] h-[72px] overflow-hidden px-[24px] cursor-pointer w-fit ${className || ""}`}
            style={{ gap: "0px" }}
        >
            <p
                ref={textRef}
                className="font-['Gebuk'] not-italic relative shrink-0 text-[#083e45] text-[28px] whitespace-nowrap overflow-hidden leading-[32px] h-[32px]"
                style={{ width: 0, opacity: 0 }}
            >
                Menú
            </p>

            <div className="relative shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        ref={pathRef}
                        d={isBtnOpen ? PATH_CLOSE : PATH_MENU}
                        fill="#083e45"
                    />
                </svg>
            </div>
        </motion.button>
    );
}
