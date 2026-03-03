import BtnRounded from "@/components/ui/BtnRounded";
import UnderlineHoverLink from "@/components/ui/UnderlineHoverLink";

export default function Footer() {
    return (
        <footer id="footerDEF" className="relative w-full min-h-[90vh] bg-[#083e45] overflow-hidden pt-[192px] pb-[60px] flex flex-col justify-between">
            {/* Top Grid for Text */}
            <div className="grid-desktop relative z-10 w-full">
                <div className="col-span-12">
                    <h2 className="font-sans font-normal text-left text-[#48d7de] text-[48px] lg:text-[112px] leading-[1.1] lg:leading-[102px]">
                        Si tú también quieres<br className="hidden lg:block" /> impulsar tu negocio,<br className="hidden lg:block" />
                        ¡contáctanos hoy<br className="hidden lg:block" /> mismo sin compromiso!
                    </h2>
                </div>
            </div>

            {/* Bottom Grid for Links */}
            <div className="grid-desktop relative z-10 w-full mt-auto pt-[100px] lg:pt-[200px] items-start lg:items-center">

                {/* Legal Links */}
                <div className="col-start-4 col-span-9 lg:col-start-4 lg:col-span-6 flex flex-col lg:flex-row font-sans gap-[16px] lg:gap-[64px] text-[#48d7de] text-[11px] text-left lg:items-center">
                    <UnderlineHoverLink href="#" label="Aviso legal y política de privacidad" />
                    <UnderlineHoverLink href="#" label="Política de cookies" />
                    <UnderlineHoverLink href="#" label="Diseñado por Generación Ads" />
                </div>

                {/* Social Buttons */}
                <div className="col-start-4 col-span-9 lg:col-start-11 lg:col-span-2 flex flex-row gap-[16px] items-center justify-start lg:justify-end mt-[32px] lg:mt-0">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <BtnRounded variant="instagram" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <BtnRounded variant="linkedin" />
                    </a>
                </div>

            </div>
        </footer>
    );
}
