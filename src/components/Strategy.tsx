import BtnCircle from "@/components/ui/BtnCircle";

const SERVICES = [
    {
        id: "publi",
        title: "PUBLI",
        description: "Captar reservas directas a través de campañas segmentadas."
    },
    {
        id: "web",
        title: "WEB",
        description: "Páginas rápidas, visuales y con motor de reservas integrado."
    },
    {
        id: "seo",
        title: "SEO",
        description: "Captar reservas directas a través de campañas segmentadas."
    },
    {
        id: "crm",
        title: "CRM",
        description: "Captar reservas directas a través de campañas segmentadas."
    }
];

export default function Strategy() {
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
                            Te ayudamos a conseguir más clientes y a olvidarte de las comisiones.
                        </h2>

                        {/* Subheading */}
                        <p className="font-sans text-[16px] lg:text-[20px] lg:leading-[normal] text-white max-w-[490px]">
                            Con nuestra estrategia 360º estaremos contigo para impulsar el crecimiento de tu hotel.
                        </p>
                    </div>
                </div>

                {/* Services Grid (Shifted Right) */}
                <div className="col-span-12 lg:col-span-10 lg:col-start-3 w-full flex flex-col lg:flex-row gap-[40px] lg:gap-[64px] justify-between">
                    {SERVICES.map((service) => (
                        <div key={service.id} className="flex flex-col h-auto min-h-[267px] justify-between items-start w-full lg:w-[213px]">
                            <div className="flex flex-col gap-[16px] items-start w-full mb-[32px]">
                                <h3 className="font-sans text-[48px] lg:text-[60px] leading-[1.1] lg:leading-[70px] text-[#48d7de]">
                                    {service.title}
                                </h3>
                                <p className="font-sans text-[18px] lg:text-[20px] leading-[normal] text-white">
                                    {service.description}
                                </p>
                            </div>

                            <BtnCircle className="mt-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
