import BtnPry from "@/components/ui/BtnPry";
import { BackgroundCircles } from "@/components/ui/BackgroundCircles";

export default function Hero() {
    return (
        <section id="hero" className="relative w-full min-h-[600px] lg:min-h-[982px] h-[100svh] lg:h-screen bg-[#083e45] overflow-hidden pt-[160px] lg:pt-[189px]">
            {/* Animated Background Graphic Asset */}
            {/* Math: 600px box scaled by 0.55 with origin-bottom-right leaves a physical 24px right gap (px-6 aligned) and no internal masking crop */}
            <div className="absolute right-[-9px] bottom-[2%] w-[600px] h-[600px] origin-bottom-right scale-[0.55] lg:right-0 lg:bottom-auto lg:top-0 lg:w-[50%] lg:h-full lg:origin-center lg:scale-100 pointer-events-none flex items-center justify-center opacity-60 lg:opacity-100">
                <BackgroundCircles variant="primary" />
            </div>

            <div className="grid-desktop h-full relative z-10 text-white pointer-events-none lg:pt-[24px]">
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start justify-start">
                    {/* Main Headline */}
                    <h1 className="font-['Gebuk'] text-[48px] md:text-[64px] lg:text-[96px] leading-[1.1] lg:leading-[90px] max-w-[766px] whitespace-pre-wrap mb-[16px] pointer-events-auto">
                        Llena tu hotel con reservas directas
                    </h1>

                    {/* Subheading */}
                    <p className="font-sans text-[18px] lg:text-[24px] text-[#48d7de] max-w-[766px] mb-[32px] lg:mb-[48px] pointer-events-auto">
                        Te ayudamos a conseguir más clientes sin depender de terceros
                    </p>

                    {/* CTA Button */}
                    <div className="mb-[64px] pointer-events-auto">
                        <BtnPry theme="cyan" />
                    </div>

                </div>
            </div>
        </section>
    );
}
