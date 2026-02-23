"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BtnPry from "@/components/ui/BtnPry";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const IMG_PLACEHOLDER = "http://localhost:3845/assets/f07187352c7202b7e3c4a0d284d35b4cf7c66075.png";

const CASOS_DATA = [
    {
        id: "ibiza",
        title: "Hotel 4* en Ibiza",
        description: "Creación de campañas de publicidad en Google, Meta y otras plataformas como Bing y Pinterest. Campañas orientadas a clientes en Reino Unido, Holanda, Alemania y Suiza.",
        tags: ["Marketing online", "Revenue management", "Posicionamiento orgánico", "Desarrollo web"],
        image: IMG_PLACEHOLDER
    },
    {
        id: "madrid",
        title: "Hotel Boutique Madrid",
        description: "Rediseño completo de la experiencia digital y motor de reservas personalizado. Incremento del 45% en conversión móvil durante el primer trimestre.",
        tags: ["Desarrollo web", "UX/UI Design", "CRO", "Analítica"],
        image: IMG_PLACEHOLDER
    },
    {
        id: "mallorca",
        title: "Resort 5* Mallorca",
        description: "Estrategia integral de captación B2C para temporada alta. Reducción drástica de la dependencia de OTAs mediante campañas directas de alto impacto.",
        tags: ["Marketing online", "Estrategia 360", "CRM", "Email Marketing"],
        image: IMG_PLACEHOLDER
    }
];

export default function Exito() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!triggerRef.current || !scrollTrackRef.current) return;

            // Get total scrollable distance based on track width vs viewport
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
                            Math.floor(progress * CASOS_DATA.length),
                            CASOS_DATA.length - 1
                        );
                        setCurrentIndex((prev: number) => {
                            if (prev !== index) return index;
                            return prev;
                        });
                    }
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleNextSlide = () => {
        const nextIndex = Math.min(currentIndex + 1, CASOS_DATA.length - 1);
        if (nextIndex === currentIndex) return;

        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <section ref={sectionRef} id="exito" className="relative w-full bg-[#083e45] text-white">

            {/* The Trigger Element that gets Pinned */}
            <div ref={triggerRef} className="h-screen w-full overflow-hidden flex flex-col relative pt-[100px] lg:pt-[150px]">

                {/* Fixed Top Left Header Content (Fades in normally via scroll or starts visible) */}
                <div className="absolute top-[100px] lg:top-[192px] left-6 lg:left-[84px] z-30">
                    <div className="border border-[#48d7de] rounded-[99px] px-6 lg:px-[32px] py-3 lg:py-[24px] inline-block mb-12">
                        <span className="font-['Gebuk'] text-[24px] lg:text-[32px] leading-none text-white tracking-wide">
                            Hoteles que confiaron en nosotros
                        </span>
                    </div>
                </div>

                {/* The Horizontal Track */}
                <div ref={scrollTrackRef} className="flex h-full w-[300vw] will-change-transform mt-[100px] lg:mt-0">
                    {CASOS_DATA.map((caso) => (
                        <div key={caso.id} className="w-screen h-full flex-shrink-0 relative flex flex-col justify-start gap-[40px] lg:gap-[64px] pt-[180px] lg:pt-[160px]">

                            {/* Top Text Block */}
                            <div className="flex flex-col gap-[32px] w-full shrink-0 z-20 px-6 lg:px-[96px] max-w-[1200px]">
                                <div className="flex flex-col gap-[12px]">
                                    <h3 className="font-sans text-[48px] lg:text-[60px] text-[#48d7de] leading-[1.1]">
                                        {caso.title}
                                    </h3>
                                    <p className="font-sans text-[18px] lg:text-[20px] text-white leading-tight lg:leading-[normal]">
                                        {caso.description}
                                    </p>

                                    {/* Keyword Spans Block */}
                                    <div className="flex flex-wrap gap-4 lg:gap-[24px] mt-2 lg:mt-4">
                                        {caso.tags.map((tag, idx) => (
                                            <span key={idx} className="font-sans text-[16px] lg:text-[18px] text-[#48d7de] leading-[normal] truncate max-w-full block">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-fit">
                                    <BtnPry theme="cyan" text="Ver caso de éxito" />
                                </div>
                            </div>

                            {/* Bottom Full Width Image Layout Block */}
                            <div className="w-full flex-1 min-h-[300px] lg:min-h-[400px] shrink-0 relative bg-[#1a4a52] overflow-hidden mt-auto">
                                <img src={caso.image} alt={caso.title} className="w-full h-full object-cover" />
                            </div>

                        </div>
                    ))}
                </div>

                {/* Global Slider Next Button */}
                <div
                    className="absolute z-50 bottom-[40px] right-[40px] pointer-events-auto"
                    onClick={handleNextSlide}
                >
                    <div className={`bg-[#48d7de] w-[80px] h-[70px] lg:w-[105px] lg:h-[89px] rounded-[46px] flex items-center justify-center shadow-xl cursor-pointer hover:scale-95 transition-all ${currentIndex === CASOS_DATA.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] lg:w-[42px]">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#083e45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
}
