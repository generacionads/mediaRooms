"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BtnPry from "@/components/ui/BtnPry";
import { AnimatePresence } from "framer-motion";
import ServiciosModal, { ServiceData } from "@/components/ui/ServiciosModal";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const IMG_IBIZA = "/images/Gibiza.jpg";

const CASOS_DATA = [
    {
        id: "ibiza",
        title: "Hotel 4* en Ibiza",
        description: "Creación de campañas de publicidad en Google, Meta y otras plataformas como Bing y Pinterest. Campañas orientadas a clientes en Reino Unido, Holanda, Alemania y Suiza.",
        modalTitle: "Resultados tras gestión integral de marketing y captación",
        modalDescription: "Maximizamos la visibilidad de su hotel y optimizamos el funnel de conversión para reducir drásticamente la dependencia de las OTAs y recuperar el control de sus huéspedes.",
        tags: ["Marketing online", "Revenue management", "Posicionamiento orgánico", "Desarrollo web"],
        image: IMG_IBIZA,
        stats: [
            { value: "+26%", label: "Ingresos anuales", desc: "Promedio de crecimiento anual en clientes." },
            { value: "+25%", label: "ROAS medio", desc: "Promedio de crecimiento anual en clientes." },
            { value: "+25%", label: "CPA medio", desc: "Promedio de crecimiento anual en clientes." }
        ]
    },
    {
        id: "madrid",
        title: "Hotel Boutique Madrid",
        description: "Rediseño completo de la experiencia digital y motor de reservas personalizado. Incremento del 45% en conversión móvil durante el primer trimestre.",
        modalTitle: "Resultados tras el rediseño digital integral",
        modalDescription: "Modernizamos la presencia online para capturar reservas directas y ofrecer una experiencia premium desde el primer click.",
        tags: ["Desarrollo web", "UX/UI Design", "CRO", "Analítica"],
        image: IMG_IBIZA, // Using available Ibiza image as placeholder until others uploaded
        stats: [
            { value: "+45%", label: "Conversión móvil", desc: "Incremento en tasa de reserva vía smartphone." },
            { value: "+30%", label: "Tráfico orgánico", desc: "Crecimiento de visitas en los primeros 3 meses." },
            { value: "-15%", label: "Tasa de rebote", desc: "Mejora en la retención de usuarios en la web." }
        ]
    },
    {
        id: "mallorca",
        title: "Resort 5* Mallorca",
        description: "Estrategia integral de captación B2C para temporada alta. Reducción drástica de la dependencia de OTAs mediante campañas directas de alto impacto.",
        modalTitle: "Resultados de la campaña B2C de captación directa",
        modalDescription: "Desarrollamos una estrategia multicanal enfocada en maximizar la ocupación en temporada alta sin depender de plataformas de terceros.",
        tags: ["Marketing online", "Estrategia 360", "CRM", "Email Marketing"],
        image: IMG_IBIZA, // Using available Ibiza image as placeholder until others uploaded
        stats: [
            { value: "+50%", label: "Reservas directas", desc: "Aumento de captación a través de canales propios." },
            { value: "+12%", label: "Ticket medio", desc: "Incremento del valor promedio por reserva." },
            { value: "-20%", label: "Comisiones OTAs", desc: "Reducción de dependencia de intermediarios." }
        ]
    }
];

export default function Exito() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCaso, setSelectedCaso] = useState<ServiceData | null>(null);

    const openModal = (caso: any) => {
        // Map the caso object to the ServiceData type expected by the modal
        setSelectedCaso(caso);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!triggerRef.current || !scrollTrackRef.current) return;

            // Get total scrollable distance based on track width vs viewport
            // Use the scrollWidth plus an arbitrary buffer for the block effect
            const scrollWidth = scrollTrackRef.current.scrollWidth - window.innerWidth;

            // A timeline approach to create the initial block and snap perfectly:
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    pinType: "transform", // This often smooths out the vertical pin catching
                    scrub: 1, // Reduced from 2 since Lenis provides the base inertia
                    end: () => `+=${scrollWidth}`,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    snap: {
                        snapTo: "labelsDirectional",
                        duration: { min: 0.2, max: 0.6 },
                        delay: 0.05,
                        ease: "power1.inOut"
                    },
                    onUpdate: (self) => {
                        // Keep the UI buttons updated based on raw linear progress
                        const index = Math.min(
                            Math.round(self.progress * (CASOS_DATA.length - 1)),
                            CASOS_DATA.length - 1
                        );
                        setCurrentIndex((prev: number) => {
                            if (prev !== index) return index;
                            return prev;
                        });
                    }
                }
            });

            // Start strictly at the beginning of the lateral scroll
            tl.addLabel("slide0");

            const numSlides = CASOS_DATA.length;
            for (let i = 1; i < numSlides; i++) {
                tl.to(scrollTrackRef.current, {
                    x: -(scrollWidth / (numSlides - 1)) * i,
                    ease: "none",
                    duration: 1
                });
                tl.addLabel(`slide${i}`);
            }
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
            <div ref={triggerRef} className="h-screen w-full overflow-hidden flex flex-col relative pt-[40px] lg:pt-[72px]">

                {/* Fixed Top Left Header Content (Now in normal flow so it doesn't overlap) */}
                <div className="w-full px-6 lg:px-[84px] z-30 shrink-0">
                    <div className="border border-[#48d7de] rounded-[99px] px-6 lg:px-[32px] py-3 lg:py-[24px] inline-block mb-8 lg:mb-12">
                        <span className="font-['Gebuk'] text-[24px] lg:text-[32px] leading-none text-white tracking-wide">
                            Hoteles que confiaron en nosotros
                        </span>
                    </div>
                </div>

                {/* The Horizontal Track */}
                <div ref={scrollTrackRef} className="flex flex-1 w-[300vw] will-change-transform">
                    {CASOS_DATA.map((caso) => (
                        <div key={caso.id} className="w-screen h-full flex-shrink-0 relative flex flex-col justify-end">

                            {/* Top Text Block */}
                            <div className="flex flex-col gap-[32px] w-full shrink-0 z-20 px-6 lg:px-[96px] max-w-[1200px] pb-[40px] lg:pb-[72px]">
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
                                    <BtnPry theme="cyan" text="Ver caso de éxito" onClick={() => openModal(caso)} />
                                </div>
                            </div>

                            {/* Bottom Full Width Image Layout Block */}
                            <div className="w-full h-[200px] lg:h-[300px] shrink-0 relative bg-[#1a4a52] overflow-hidden mt-auto">
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

            {/* Modal Portal */}
            <AnimatePresence>
                {isModalOpen && selectedCaso && (
                    <ServiciosModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        service={selectedCaso}
                        hideIcon={true}
                        hideButton={true}
                        maxWidth="max-w-[1043px]"
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
