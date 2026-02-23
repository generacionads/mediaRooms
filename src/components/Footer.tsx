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
                <div className="col-span-12 flex justify-start lg:justify-end">
                    <div className="flex flex-col lg:flex-row font-sans gap-[24px] lg:gap-[64px] text-[#48d7de] text-[11px] text-left lg:text-right w-full lg:w-auto">
                        <a href="#" className="hover:underline">Aviso legal y política de privacidad</a>
                        <a href="#" className="hover:underline">Política de cookies</a>
                        <a href="#" className="hover:underline">Diseñado por Generación Ads</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
