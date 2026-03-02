"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BtnPry from "@/components/ui/BtnPry";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

const TEAM_MEMBERS = [
    {
        id: "miembro1",
        name: "Patri",
        role: "Especialista en Publi",
        position: { top: "45%", left: "23%" } // Left girl
    },
    {
        id: "miembro2",
        name: "Javi",
        role: "Especialista SEO",
        position: { top: "60%", left: "33%" } // Middle-left sitting guy
    },
    {
        id: "miembro3",
        name: "Mario",
        role: "Hace cosas",
        position: { top: "38%", left: "45%" } // Middle standing guy
    },
    {
        id: "miembro4",
        name: "Isa",
        role: "Desarrolladora Web",
        position: { top: "54%", left: "62%" } // Right sitting girl
    },
    {
        id: "miembro5",
        name: "Antonio",
        role: "Especialist en Marketing",
        position: { top: "56%", left: "71.5%" } // Far-right sitting guy
    }
];

function TeamMemberTag({ member }: { member: typeof TEAM_MEMBERS[0] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const closedTextRef = useRef<HTMLDivElement>(null);
    const openTextRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<SVGPathElement>(null);

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isHoveredRef = useRef(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                if (!isHoveredRef.current) tl.reverse();
            }
        });

        // Easing for the container (expand bg color and padding)
        tl.to(containerRef.current, {
            backgroundColor: "#ffffff",
            ease: "power4.inOut",
            duration: 0.55,
        }, 0);

        // Icon stroke color to #083e45
        if (iconRef.current) {
            tl.to(iconRef.current, {
                stroke: "#083e45",
                ease: "power4.inOut",
                duration: 0.55,
            }, 0);
        }

        // Hide inner static name text
        if (closedTextRef.current) {
            tl.to(closedTextRef.current, {
                width: 0,
                opacity: 0,
                paddingLeft: 0,
                paddingRight: 0,
                ease: "power4.inOut",
                duration: 0.55,
            }, 0);
        }

        // Show expanded role text
        if (openTextRef.current) {
            tl.to(openTextRef.current, {
                width: () => {
                    const el = openTextRef.current!;
                    const prevW = el.style.width;
                    el.style.width = "max-content"; // Force natural text width
                    const textWidth = el.offsetWidth; // Measures text because padding is 0 here
                    el.style.width = prevW;
                    // Adding 24px to total width because box-sizing: border-box demands 
                    // extra width for the 12px left and 12px right padding we are adding.
                    return textWidth + 24;
                },
                opacity: 1,
                paddingLeft: 12,
                paddingRight: 12, // Symmetrical padding identical to the closed state
                ease: "power4.inOut",
                duration: 0.55,
            }, 0);
        }

        tlRef.current = tl;
    }, { scope: containerRef });

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
        if (tlRef.current) {
            // invalidate() ensures GSAP recalculates width on the fly, avoiding dead space if fonts load late
            tlRef.current.invalidate();
            tlRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        if (tlRef.current && tlRef.current.progress() === 1) {
            tlRef.current.reverse();
        }
    };

    return (
        <div
            ref={containerRef}
            className="absolute flex items-center justify-center p-[12px] bg-[#083e45] rounded-[99px] shadow-lg cursor-pointer pointer-events-auto overflow-hidden h-[40px] z-20 hover:z-30 origin-left"
            style={{
                top: member.position.top,
                left: member.position.left,
                transform: "translateY(-100%)" // Anchor bottom edge to sit directly ON coordinate
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center whitespace-nowrap overflow-hidden">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 relative top-[-1px]">
                    <path ref={iconRef} d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="#48d7de" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div
                    ref={openTextRef}
                    className="font-['Gebuk'] text-[16px] text-[#083e45] leading-[16px] overflow-hidden"
                    style={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0, whiteSpace: "nowrap", willChange: "width, opacity, padding" }}
                >
                    {member.role}
                </div>

                <div
                    ref={closedTextRef}
                    className="font-['Gebuk'] text-[16px] text-[#48d7de] leading-[16px] overflow-hidden"
                    style={{ opacity: 1, paddingLeft: 12, paddingRight: 12, whiteSpace: "nowrap", willChange: "width, opacity, padding" }}
                >
                    {member.name}
                </div>
            </div>
        </div>
    );
}

export default function SobreNosotros() {
    return (
        <section id="nosotros" className="relative w-full bg-[#083e45] text-white pt-[100px] pb-[100px] lg:pt-[200px] lg:pb-[150px]">
            <div className="grid-desktop">

                {/* Header Content */}
                <div className="col-span-12 flex flex-col items-center lg:items-start mb-[60px] lg:mb-[100px] z-10 relative">
                    <div className="border border-[#48d7de] rounded-[99px] px-6 lg:px-[32px] py-3 lg:py-[24px] inline-block mb-12">
                        <span className="font-['Gebuk'] text-[24px] lg:text-[32px] leading-none text-white tracking-wide">
                            mediaRooms somos nosotros
                        </span>
                    </div>

                    <h2 className="font-sans text-[48px] lg:text-[60px] text-[#48d7de] leading-[1.1] max-w-[1320px] text-center lg:text-left w-full">
                        Soluciones digitales de marketing y desarrollo para hoteles
                    </h2>
                </div>

                {/* Team Image Interactive Container */}
                <div className="col-span-12 lg:col-span-10 lg:col-start-3 relative w-full aspect-[1043/517] min-h-[400px] rounded-[40px] lg:rounded-[99px] overflow-hidden ml-auto mr-auto">

                    {/* Shadow overlay matching Figma design layer */}
                    <div className="absolute inset-0 z-10 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_124px_40px_rgba(0,0,0,0.55)]" />

                    {/* Main Team Background Image */}
                    <img
                        src="/images/nosotros_mediaRooms.jpg"
                        alt="MediaRooms Team"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Interactive Team Member Tags Container */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {TEAM_MEMBERS.map((member) => (
                            <TeamMemberTag key={member.id} member={member} />
                        ))}
                    </div>
                </div>

                {/* CTA Button placed directly below the image container */}
                <div className="col-span-12 lg:col-span-10 flex justify-center lg:justify-end lg:col-start-3 mt-[40px] lg:mt-[60px]">
                    <Link href="/calculadora" className="w-fit cursor-pointer">
                        <BtnPry theme="cyan" text="Infórmate gratis" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
