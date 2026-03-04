"use client";

import BtnPry from "@/components/ui/BtnPry";

const SERVICES = [
    {
        id: "publi",
        title: "PUBLI",
        description: "Captar reservas directas a través de campañas de publicidad rentables y segmentadas."
    },
    {
        id: "web",
        title: "WEB",
        description: "Páginas rápidas, visuales y con motor de reservas integrado."
    },
    {
        id: "seo",
        title: "SEO",
        description: "Estrategias de posicionamiento orgánico para dominar las búsquedas en Google."
    },
    {
        id: "crm",
        title: "CRM",
        description: "Fidelización de tus huéspedes y automatización para maximizar el valor por reserva."
    }
];

export default function Strategy() {
    const handleServiceClick = (id: string) => {
        const getServiceIndex = (serviceId: string) => {
            switch (serviceId) {
                case "publi": return 0; // Marketing Online
                case "web": return 1; // Desarrollo Web
                case "seo": return 2; // Posicionamiento Orgánico
                case "crm": return 0; // Marketing Online
                default: return 0;
            }
        };

        const targetIndex = getServiceIndex(id);

        // Dispatch a custom event to tell Services.tsx to handle the scroll natively via GSAP
        const event = new CustomEvent("navigateToService", {
            detail: { index: targetIndex }
        });
        window.dispatchEvent(event);
    };

    return (
        <section id="estrategia" className="relative w-full min-h-screen bg-[#083e45] text-white py-[120px] lg:py-[190px]">
            <div className="grid-desktop">
                {/* Headers Block (Aligned Left) */}
                <div className="col-span-12 flex flex-col items-start px-0 mb-[120px] lg:mb-[180px]">
                    {/* Header Pill */}
                    <div className="border border-[#48d7de] rounded-[99px] px-[32px] py-[24px] flex items-center justify-center w-fit mb-[40px] lg:mb-[60px]">
                        <p className="font-['Gebuk'] text-[32px] leading-[normal] text-white">
                            ¿Por qué te interesa?
                        </p>
                    </div>

                    <div className="flex flex-col w-full items-start justify-start gap-[24px]">
                        {/* Main Headline */}
                        <h2 className="font-sans text-[40px] lg:text-[60px] leading-[1.1] lg:leading-[70px] text-[#48d7de] max-w-[1043px]">
                            Te ayudamos a conseguir más huéspedes y a olvidarte de las comisiones.
                        </h2>

                        {/* Subheading */}
                        <p className="font-sans text-[16px] lg:text-[20px] lg:leading-[normal] text-white max-w-[490px]">
                            Con nuestra estrategia 360º estaremos contigo para impulsar el crecimiento de tu hotel.
                        </p>
                    </div>
                </div>

                {/* Services Grid (Shifted Right) */}
                <div className="col-span-12 lg:col-span-10 lg:col-start-3 w-full grid grid-cols-1 lg:grid-cols-4 gap-[40px] lg:gap-[64px] items-stretch">
                    {SERVICES.map((service) => (
                        <div key={service.id} className="grid grid-rows-[auto_1fr_auto] gap-[16px] items-start w-full">
                            <h3 className="font-sans text-[48px] lg:text-[60px] leading-[1.1] lg:leading-[70px] text-[#48d7de]">
                                {service.title}
                            </h3>
                            <p className="font-sans text-[18px] lg:text-[20px] leading-[normal] text-white">
                                {service.description}
                            </p>

                            <BtnPry
                                className="mt-[8px] lg:mt-[16px]"
                                action="expand"
                                text="saber más"
                                onClick={() => handleServiceClick(service.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
