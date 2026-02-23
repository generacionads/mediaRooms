"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BtnPry from "@/components/ui/BtnPry";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICIOS_DATA = [
    {
        id: "marketing",
        title: "Marketing Online",
        description: "Captar reservas directas a través de campañas segmentadas. Anuncios emocionales en Spotify y redes sociales que posicionan al hotel como una experiencia única.",
        image: "https://placehold.co/1512x419/1A1A1A/FFFFFF?text=Marketing+Online+Image",
    },
    {
        id: "desarrollo",
        title: "Desarrollo Web",
        description: "Páginas súper rápidas, visuales y con el motor de reservas totalmente integrado. Una experiencia de usuario optimizada para la conversión.",
        image: "https://placehold.co/1512x419/1A1A1A/FFFFFF?text=Desarrollo+Web+Image",
    },
    {
        id: "seo",
        title: "Posicionamiento Orgánico",
        description: "Aparece el primero en Google cuando los viajeros busquen hotel en tu ciudad. Estrategias SEO combinadas de largo recorrido.",
        image: "https://placehold.co/1512x419/1A1A1A/FFFFFF?text=SEO+Image",
    },
    {
        id: "analitica",
        title: "Analítica Web",
        description: "Datos precisos sobre el comportamiento de los clientes. Cada click de reserva se mide para escalar la inversión con mayor certeza.",
        image: "https://placehold.co/1512x419/1A1A1A/FFFFFF?text=Analitica+Image",
    },
];

export default function Services() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        if (!containerRef.current || !scrollTrackRef.current) return;

        const totalSlides = SERVICIOS_DATA.length;

        const tl = gsap.to(scrollTrackRef.current, {
            // Move left by the width of all slides except one
            xPercent: -100 * (totalSlides - 1) / totalSlides,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                // The pinning lasts for X amount of window heights
                end: () => `+=${window.innerWidth * (totalSlides - 1)}`,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const index = Math.min(
                        Math.floor(progress * totalSlides),
                        totalSlides - 1
                    );
                    setCurrentIndex(index);
                }
            }
        });

        return () => {
            tl.kill();
        };
    }, { scope: containerRef });

    const handleNextSlide = () => {
        const nextIndex = Math.min(currentIndex + 1, SERVICIOS_DATA.length - 1);
        if (nextIndex === currentIndex) return;

        // Force a native scroll down to trigger the scrub
        window.scrollBy({
            top: window.innerWidth,
            behavior: "smooth"
        });
    };

    return (
        <section ref={containerRef} id="servicios" className="relative w-full h-screen bg-[#083e45] text-white overflow-hidden">

            {/* The Horizontal Track */}
            <div ref={scrollTrackRef} className="flex h-full w-[400vw]">
                {SERVICIOS_DATA.map((service) => (
                    <div key={service.id} className="w-screen h-full flex-shrink-0 relative flex flex-col justify-end">

                        {/* Slide Info Content (Aligned Left) */}
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

                        {/* Slide Image Placeholder Box */}
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

        </section>
    );
}
