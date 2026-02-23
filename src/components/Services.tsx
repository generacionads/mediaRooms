"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BtnPry from "@/components/ui/BtnPry";

// Register ScrollTrigger outside components
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SERVICIOS_DATA = [
    {
        id: "marketing",
        title: "Marketing Online",
        description: "Captar reservas directas a través de campañas segmentadas. Anuncios emocionales en Spotify y redes sociales que posicionan al hotel como una experiencia única.",
    },
    {
        id: "desarrollo",
        title: "Desarrollo Web",
        description: "Páginas súper rápidas, visuales y con el motor de reservas totalmente integrado. Una experiencia de usuario optimizada para la conversión.",
    },
    {
        id: "seo",
        title: "Posicionamiento Orgánico",
        description: "Aparece el primero en Google cuando los viajeros busquen hotel en tu ciudad. Estrategias SEO combinadas de largo recorrido.",
    },
    {
        id: "analitica",
        title: "Analítica Web",
        description: "Datos precisos sobre el comportamiento de los clientes. Cada click de reserva se mide para escalar la inversión con mayor certeza.",
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useLayoutEffect(() => {
        // Wait for DOM to paint completely before attaching ScrollTrigger
        const ctx = gsap.context(() => {
            if (!triggerRef.current || !scrollTrackRef.current) return;

            // Get total scrollable distance based on track width
            const scrollWidth = scrollTrackRef.current.scrollWidth - window.innerWidth;

            // Animate horizontally
            gsap.to(scrollTrackRef.current, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${scrollWidth}`,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const index = Math.min(
                            Math.floor(progress * SERVICIOS_DATA.length),
                            SERVICIOS_DATA.length - 1
                        );
                        setCurrentIndex((prev) => {
                            if (prev !== index) return index;
                            return prev;
                        });
                    }
                }
            });
        }, sectionRef);

        return () => ctx.revert(); // Proper React cleanup for GSAP
    }, []); // Only run once on mount to prevent GSAP timeline resets when currentIndex changes

    const handleNextSlide = () => {
        const nextIndex = Math.min(currentIndex + 1, SERVICIOS_DATA.length - 1);
        if (nextIndex === currentIndex) return;

        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <section ref={sectionRef} id="servicios" className="relative w-full bg-[#083e45] text-white">

            {/* The Trigger Element that gets Pinned */}
            <div ref={triggerRef} className="h-screen w-full overflow-hidden flex flex-col relative">

                {/* The Horizontal Track */}
                <div ref={scrollTrackRef} className="flex h-full w-[400vw] will-change-transform">
                    {SERVICIOS_DATA.map((service) => (
                        <div key={service.id} className="w-screen h-full flex-shrink-0 relative flex flex-col justify-end">

                            {/* Slide Info Content (Left Aligned) */}
                            <div className="w-full relative z-20 pb-[40px] lg:pb-[72px]">
                                <div className="grid-desktop">
                                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-[32px] items-start text-left">
                                        <div className="flex flex-col gap-[12px]">
                                            <h3 className="font-sans text-[48px] lg:text-[60px] text-[#48d7de] leading-[1.1] text-left">
                                                {service.title}
                                            </h3>
                                            <p className="font-sans text-[18px] lg:text-[20px] text-white max-w-[800px] text-left">
                                                {service.description}
                                            </p>
                                        </div>
                                        <BtnPry theme="cyan" text="Ver info" />
                                    </div>
                                </div>
                            </div>

                            {/* Slide Image Placeholder */}
                            <div className="w-full h-[300px] lg:h-[419px] shrink-0 bg-[#1a4a52] flex items-center justify-center border-t border-[#48d7de]/20 relative z-10">
                                <span className="text-[#48d7de]/30 text-[18px] lg:text-[24px] font-sans tracking-widest uppercase font-bold text-center px-4">
                                    {`[ IMAGEN ${service.title.toUpperCase()} ]`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Global Slider Next Button */}
                <div
                    className="absolute z-50 bottom-[40px] right-[40px] pointer-events-auto"
                    onClick={handleNextSlide}
                >
                    <div className={`bg-[#48d7de] w-[80px] h-[70px] lg:w-[105px] lg:h-[89px] rounded-[46px] flex items-center justify-center shadow-xl cursor-pointer hover:scale-95 hover:bg-white transition-all ${currentIndex === SERVICIOS_DATA.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] lg:w-[42px]">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#083e45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
}
