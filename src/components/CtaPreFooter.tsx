import Link from "next/link";
import Image from "next/image";
import BtnPry from "@/components/ui/BtnPry";

export default function CtaPreFooter() {
    return (
        <section className="relative w-full bg-[#083e45] overflow-hidden pt-[120px] pb-[120px] lg:pt-[192px] lg:pb-[192px]">
            <div className="grid-desktop relative z-10 w-full h-full">

                {/* Left Column: Text and CTA Button */}
                <div className="col-span-12 lg:col-span-6 flex flex-col items-start justify-center gap-[32px] relative z-20">
                    <h2 className="font-sans font-normal text-[#48d7de] text-[40px] lg:text-[60px] leading-[tight] lg:leading-[70px] whitespace-pre-wrap max-w-[766px]">
                        Soluciones digitales de marketing y desarrollo para hoteles
                    </h2>

                    <Link href="/contacto" className="w-fit cursor-pointer">
                        <BtnPry theme="cyan" text="Infórmate gratis" />
                    </Link>
                </div>

                {/* Right Column: Abstract Logo Overlap */}
                <div className="col-span-12 lg:col-span-5 lg:col-start-8 relative mt-20 lg:mt-0 flex items-center justify-center lg:justify-end min-h-[400px]">
                    <div className="absolute top-1/2 lg:right-0 -translate-y-1/2 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] pointer-events-none opacity-90 flex justify-center lg:justify-end">
                        <Image
                            src="/assets/Logo-isologo.svg"
                            alt="mediaRooms mR Logo Background"
                            fill
                            className="object-contain lg:object-right object-center"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
