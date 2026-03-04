"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import BtnPry from "@/components/ui/BtnPry";
import ServiciosModal, { ServiceData } from "@/components/ui/ServiciosModal";

// Register ScrollTrigger outside components
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SERVICIOS_DATA: ServiceData[] = [
    {
        id: "marketing",
        title: "Marketing\nOnline",
        modalTitle: "Marketing Online que Convierte",
        description: "Multiplica tus reservas directas con campañas de alto impacto. Impactamos a tus huéspedes potenciales en el momento exacto de su decisión de compra.",
        modalDescription: "Diseñamos y ejecutamos campañas altamente rentables en las plataformas más efectivas (Google Ads, Meta, Bing, TripAdvisor). Optimizamos cada euro de tu presupuesto para asegurar que cada clic te acerque a una reserva directa, logrando reducir la dependencia de intermediarios y mejorando tus márgenes.",
        stats: [{
            value: "+25%",
            label: "Ingresos directos",
            desc: "Promedio de crecimiento anual en reservas propias."
        }],
        image: "/images/service_marketing.png"
    },
    {
        id: "desarrollo",
        title: "Desarrollo\nWeb",
        modalTitle: "Desarrollo Web Premium",
        description: "Tu web es el principal activo de tu hotel. Desarrollamos páginas ultra-rápidas, persuasivas y optimizadas al máximo para vender habitaciones.",
        modalDescription: "Creamos experiencias digitales exclusivas que enamoran al huésped desde el primer segundo. Integramos tu motor de reservas sin fricciones y aplicamos técnicas de CRO (optimización de conversión) para guiar al huésped hacia la compra de la forma más sencilla, segura e intuitiva posible.",
        stats: [{
            value: "+40%",
            label: "Tasa de conversión",
            desc: "Promedio de aumento en reservas desde la web oficial."
        }],
        image: "/images/service_desarrollo.png"
    },
    {
        id: "seo",
        title: "Posicionamiento\nOrgánico",
        modalTitle: "Estrategia SEO de Alto Retorno",
        description: "Domina las búsquedas en Google y atrae tráfico cualificado sin costes por clic. Destaca cuando los viajeros buscan un hotel en tu destino.",
        modalDescription: "Implementamos estrategias SEO locales y de nicho estructurando tu web para asegurar un flujo constante, orgánico y rentable de reservas directas.",
        stats: [{
            value: "Top 3",
            label: "Top Rankings en Google",
            desc: "Garantizamos visibilidad en las búsquedas clave más importantes."
        }],
        image: "/images/service_seo.png"
    },
    {
        id: "analitica",
        title: "Analítica\nWeb",
        modalTitle: "Analítica Avanzada y Datos",
        description: "Toma decisiones fundamentadas en datos reales. Comprendemos el comportamiento de tus huéspedes para detectar oportunidades y escalar la inversión.",
        modalDescription: "Configuramos sistemas de trackeo precisos (Google Analytics 4, Tag Manager) para trazar el embudo completo del huésped. Medimos cada interacción de reserva para identificar exactamente qué canales generan más rentabilidad y dónde estás perdiendo ventas potenciales.",
        stats: [{
            value: "100%",
            label: "Control de Datos",
            desc: "Trazabilidad completa para optimizar cada punto del embudo."
        }],
        image: "/images/service_analitica.png"
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

    // GSAP Timeline reference for external navigation events
    const [timelineRef, setTimelineRef] = useState<gsap.core.Timeline | null>(null);

    const openModal = (service: ServiceData) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useLayoutEffect(() => {
        // Wait for DOM to paint completely before attaching ScrollTrigger
        const ctx = gsap.context(() => {
            if (!triggerRef.current || !scrollTrackRef.current) return;

            // Get total scrollable distance based on track width
            // Use the scrollWidth plus an arbitrary buffer for the block effect
            // We use 'power2.inOut' ease: starts slow (the block feeling), accelerates, decelerates.
            const scrollWidth = scrollTrackRef.current.scrollWidth - window.innerWidth;

            ScrollTrigger.matchMedia({
                // Desktop
                "(min-width: 1024px)": function () {
                    createScrollTrigger(true, scrollWidth);
                },
                // Mobile
                "(max-width: 1023px)": function () {
                    createScrollTrigger(false, scrollWidth);
                }
            });

            function createScrollTrigger(isDesktop: boolean, distance: number) {
                // A timeline approach to create the initial block and snap perfectly:
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        pin: true,
                        pinType: isDesktop ? "transform" : "fixed", // transform fixes jump on desktop, fixed stops rubber banding on iOS
                        scrub: 1, // Reduced from 2 since Lenis provides the base inertia
                        end: () => `+=${distance}`,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        snap: {
                            snapTo: "labels",
                            duration: { min: 0.2, max: 0.6 },
                            delay: 0.05,
                            ease: "power1.inOut"
                        },
                        onUpdate: (self) => {
                            // Keep the UI buttons updated based on raw linear progress
                            const index = Math.round(self.progress * (SERVICIOS_DATA.length - 1));
                            setCurrentIndex((prev) => {
                                if (prev !== index) return Math.min(index, SERVICIOS_DATA.length - 1);
                                return prev;
                            });
                        }
                    }
                });

                // Start strictly at the beginning of the lateral scroll
                tl.addLabel("slide0");

                // Build the segments label by label for precision tracking
                const numSlides = SERVICIOS_DATA.length;
                for (let i = 1; i < numSlides; i++) {
                    tl.to(scrollTrackRef.current, {
                        x: -(distance / (numSlides - 1)) * i,
                        ease: "none", // Linear mapping between snap points
                        duration: 1
                    });
                    tl.addLabel(`slide${i}`);
                }

                // Expose timeline explicitly to React state for external listeners
                setTimelineRef(tl);
            }
        }, sectionRef);

        return () => ctx.revert(); // Proper React cleanup for GSAP
    }, []); // Only run once on mount to prevent GSAP timeline resets when currentIndex changes

    // External Navigation Event Listener (from Strategy.tsx)
    useLayoutEffect(() => {
        const handleNavigate = (e: Event) => {
            const customEvent = e as CustomEvent<{ index: number }>;
            const targetIndex = customEvent.detail.index;

            if (timelineRef && timelineRef.scrollTrigger) {
                const st = timelineRef.scrollTrigger;
                // Get absolute time position of label on timeline (0 to duration)
                const labelTime = timelineRef.labels[`slide${targetIndex}`] || 0;
                // Calculate proportional progress
                const progress = labelTime / timelineRef.duration();
                // Determine raw pixel destination using ScrollTrigger boundaries
                const destinationScrollY = st.start + (st.end - st.start) * progress;

                if (window.lenis) {
                    window.lenis.scrollTo(destinationScrollY, {
                        duration: 1.5,
                        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                } else {
                    window.scrollTo({
                        top: destinationScrollY,
                        behavior: "smooth"
                    });
                }
            }
        };

        window.addEventListener("navigateToService", handleNavigate);
        return () => window.removeEventListener("navigateToService", handleNavigate);
    }, [timelineRef]);

    const handleNextSlide = () => {
        const isLastSlide = currentIndex === SERVICIOS_DATA.length - 1;

        if (isLastSlide) {
            // Scroll down past the section
            const windowHeight = window.innerHeight;
            window.scrollBy({
                top: windowHeight * 0.8, // Scroll down a solid chunk
                behavior: "smooth"
            });
            return;
        }

        const nextIndex = Math.min(currentIndex + 1, SERVICIOS_DATA.length - 1);
        if (nextIndex === currentIndex) return;

        if (scrollTrackRef.current) {
            // Calculate the exact pixel distance to scroll to hit the next snap point.
            // Since the entire scroll distance is mapped to scrollWidth, one slide = scrollWidth / 3.
            const scrollWidth = scrollTrackRef.current.scrollWidth - window.innerWidth;
            const slideDistance = scrollWidth / (SERVICIOS_DATA.length - 1);

            window.scrollBy({
                top: slideDistance,
                behavior: "smooth"
            });
        }
    };

    return (
        <section ref={sectionRef} id="servicios" className="relative w-full bg-[#083e45] text-white">

            {/* The Trigger Element that gets Pinned */}
            <div ref={triggerRef} className="h-screen w-full overflow-hidden flex flex-col relative touch-pan-y">

                {/* The Horizontal Track */}
                <div ref={scrollTrackRef} className="flex h-full w-[400vw] will-change-transform">
                    {SERVICIOS_DATA.map((service) => (
                        <div key={service.id} className="w-screen h-full flex-shrink-0 relative flex flex-col justify-end">

                            {/* Slide Info Content (Left Aligned) */}
                            <div className="w-full relative z-20 pb-[40px] lg:pb-[72px]">
                                <div className="grid-desktop">
                                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-[32px] items-start text-left">
                                        <div className="flex flex-col gap-[12px]">
                                            <h3 className="font-sans text-[48px] lg:text-[60px] text-[#48d7de] leading-[1.1] text-left whitespace-pre-wrap">
                                                {service.title}
                                            </h3>
                                            <p className="font-sans text-[18px] lg:text-[20px] text-white max-w-[800px] text-left">
                                                {service.description}
                                            </p>
                                        </div>
                                        <BtnPry
                                            theme="cyan"
                                            text="Ver info"
                                            onClick={() => openModal(service)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Slide Image Placeholder or Actual Image */}
                            <div className="w-full h-[200px] lg:h-[300px] shrink-0 bg-[#1a4a52] flex items-center justify-center border-t border-[#48d7de]/20 relative z-10 overflow-hidden">
                                {service.image ? (
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[#48d7de]/30 text-[18px] lg:text-[24px] font-sans tracking-widest uppercase font-bold text-center px-4">
                                        {`[ IMAGEN ${service.title.toUpperCase()} ]`}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Global Slider Next Button */}
                <div
                    className="absolute z-50 bottom-[40px] right-[40px] pointer-events-auto"
                    onClick={handleNextSlide}
                >
                    <div
                        className={`
                            rounded-[46px] flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 ease-out
                            ${currentIndex === SERVICIOS_DATA.length - 1
                                ? 'bg-white w-[80px] h-[70px] lg:w-[105px] lg:h-[89px] hover:scale-95'
                                : 'bg-[#48d7de] w-[60px] h-[50px] lg:w-[80px] lg:h-[65px] hover:scale-105'
                            }
                        `}
                    >
                        <svg
                            width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className={`w-[30px] lg:w-[42px] transition-transform duration-300 ease-out ${currentIndex === SERVICIOS_DATA.length - 1 ? 'rotate-90' : ''}`}
                        >
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#083e45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>

            {/* Modal Portal */}
            <AnimatePresence>
                {isModalOpen && (
                    <ServiciosModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        service={selectedService}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
