"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";

gsap.registerPlugin(useGSAP);

export type BtnRoundedProps = {
    className?: string;
    variant?: "telf-closed" | "telf-open" | "mail-closed" | "mail-open" | "name_closed" | "name_open" | "instagram" | "linkedin";
    interactive?: boolean;
    isForcedOpen?: boolean;
};

export default function BtnRounded({ className, variant = "telf-closed", interactive = true, isForcedOpen = false }: BtnRoundedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const closedTextRef = useRef<HTMLParagraphElement>(null);
    const openTextRef = useRef<HTMLParagraphElement>(null);

    // Use a ref to store the timeline so we can control it on enter/leave
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isHoveredRef = useRef(false);

    // Track the external forced state in a ref to bypass GSAP's stale closures
    const isForcedOpenRef = useRef(isForcedOpen);
    useEffect(() => {
        isForcedOpenRef.current = isForcedOpen;
    }, [isForcedOpen]);

    // Initial styling Setup based on variant
    const isName = variant === "name_closed" || variant === "name_open";
    const isInstagram = variant === "instagram";
    const isLinkedin = variant === "linkedin";

    const closedTextContent = isName ? "Isa" : "";
    let openTextContent = "Un mail";
    if (variant.startsWith("telf")) openTextContent = "Llámanos";
    if (isName) openTextContent = "PPC Specialist";
    if (isInstagram) openTextContent = "Instagram";
    if (isLinkedin) openTextContent = "LinkedIn";

    const closedBg = isName || isInstagram || isLinkedin ? "#083e45" : "#48d7de";
    const openBg = "#ffffff";
    const closedTextColor = isName || isInstagram || isLinkedin ? "#48d7de" : "#083e45";
    const openTextColor = "#083e45";

    const getIconSrc = () => {
        if (isName) return "/assets/btn-arrow-light.svg";
        if (variant.startsWith("telf")) return "/assets/phone.svg";
        return "/assets/frame3.svg";
    };

    useGSAP(() => {
        // Create a paused timeline that animates the button expanding
        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                // Read from the ref to avoid stale closures catching the initial 'false' render state
                if (!isHoveredRef.current && !isForcedOpenRef.current) {
                    tl.reverse();
                }
            }
        });

        // Easing for the container
        tl.to(containerRef.current, {
            backgroundColor: openBg,
            gap: 12,
            ease: "power3.inOut",
            duration: 0.5,
        }, 0);

        // Hide inner static text if it has one (like "Isa" in name_closed)
        if (closedTextRef.current) {
            tl.to(closedTextRef.current, {
                width: 0,
                opacity: 0,
                ease: "power3.inOut",
                duration: 0.4,
            }, 0);
        }

        // Show expanded text (like "Llámanos", "Un mail", "PPC Specialist")
        if (openTextRef.current) {
            tl.to(openTextRef.current, {
                width: "auto",
                opacity: 1,
                ease: "power3.inOut",
                duration: 0.4,
            }, 0);
        }

        tlRef.current = tl;
    }, []);

    // Effect to monitor external forced triggers
    useEffect(() => {
        if (!tlRef.current) return;
        if (isForcedOpen) {
            tlRef.current.play();
        } else if (!isHoveredRef.current) {
            // Only reverse to close if the user isn't physically hovering over it
            tlRef.current.reverse();
        }
    }, [isForcedOpen]);

    const handleMouseEnter = () => {
        if (!interactive || isForcedOpen) return;
        isHoveredRef.current = true;
        if (tlRef.current) {
            tlRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (!interactive || isForcedOpen) return;
        isHoveredRef.current = false;
        if (tlRef.current) {
            // Only reverse if the timeline is already done playing forward
            if (tlRef.current.progress() === 1) {
                tlRef.current.reverse();
            }
            // If it's still playing forward (progress < 1), we let the onComplete handle it
        }
    };

    return (
        <motion.div
            whileTap={{ scale: 0.93 }}
            ref={containerRef}
            className={`flex flex-row items-center justify-center relative rounded-[99px] h-[40px] lg:h-[56px] overflow-hidden px-[13px] lg:px-[18px] cursor-pointer w-fit ${className || ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundColor: closedBg,
                gap: isName ? "10px" : "0px",
            }}
        >
            <div className="relative shrink-0 w-[14px] h-[14px] lg:w-[20px] lg:h-[20px] flex items-center justify-center">
                {isInstagram ? (
                    <Instagram color={closedTextColor} className="w-full h-full" strokeWidth={1.5} />
                ) : isLinkedin ? (
                    <Linkedin color={closedTextColor} className="w-full h-full" strokeWidth={1.5} />
                ) : (
                    <Image alt="icon" fill className="object-contain" src={getIconSrc()} />
                )}
            </div>

            {closedTextContent && (
                <p
                    ref={closedTextRef}
                    className="font-['Gebuk'] not-italic relative shrink-0 text-[16px] lg:text-[24px] whitespace-nowrap overflow-hidden leading-[16px] lg:leading-[24px] h-[16px] lg:h-[24px]"
                    style={{ color: closedTextColor, width: "auto", opacity: 1 }}
                >
                    {closedTextContent}
                </p>
            )}

            <p
                ref={openTextRef}
                className="font-['Gebuk'] not-italic relative shrink-0 text-[16px] lg:text-[24px] whitespace-nowrap overflow-hidden leading-[16px] lg:leading-[24px] h-[16px] lg:h-[24px]"
                style={{ color: openTextColor, width: 0, opacity: 0 }}
            >
                {openTextContent}
            </p>
        </motion.div>
    );
}
