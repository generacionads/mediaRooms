import BtnPry from "@/components/ui/BtnPry";
import { BackgroundCircles } from "@/components/ui/BackgroundCircles";

export default function Hero() {
    return (
        <section id="hero" className="relative w-full min-h-[982px] h-screen bg-[#083e45] overflow-hidden pt-[189px]">
            {/* Animated Background Graphic Asset */}
            <div className="absolute right-0 top-0 w-[50%] h-full pointer-events-none hidden lg:flex items-center justify-center">
                <BackgroundCircles variant="primary" />
            </div>

            <div className="grid-desktop h-full relative z-10 text-white pointer-events-none lg:pt-[24px]">
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start justify-start">
                    {/* Main Headline */}
                    <h1 className="font-['Gebuk'] text-[64px] lg:text-[96px] leading-[1.1] lg:leading-[90px] max-w-[766px] whitespace-pre-wrap mb-[16px] pointer-events-auto">
                        Llena tu hotel con reservas directas
                    </h1>

                    {/* Subheading */}
                    <p className="font-sans text-[20px] lg:text-[24px] text-[#48d7de] max-w-[766px] mb-[48px] pointer-events-auto">
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
