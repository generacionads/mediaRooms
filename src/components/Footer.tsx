import BtnRounded from "@/components/ui/BtnRounded";

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
            <div className="grid-desktop relative z-10 w-full mt-auto pt-[100px] lg:pt-[200px]">
                {/* On mobile: span from col 5 to col 12 to push past floating buttons. On desktop: span all 12. */}
                <div className="col-start-6 col-span-7 lg:col-start-1 lg:col-span-12 flex flex-col lg:flex-row justify-between lg:justify-end gap-[32px] lg:gap-[64px] items-start lg:items-center">

                    {/* Legal Links */}
                    <div className="flex flex-col lg:flex-row font-sans gap-[16px] lg:gap-[64px] text-[#48d7de] text-[11px] text-left lg:text-right w-full lg:w-auto">
                        <a href="#" className="hover:underline">Aviso legal y política de privacidad</a>
                        <a href="#" className="hover:underline">Política de cookies</a>
                        <a href="#" className="hover:underline">Diseñado por Generación Ads</a>
                    </div>

                    {/* Social Buttons (Right Margin) */}
                    <div className="flex flex-row gap-[16px] w-full lg:w-auto lg:ml-[64px] items-center justify-start lg:justify-end">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <BtnRounded variant="instagram" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <BtnRounded variant="linkedin" />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}
