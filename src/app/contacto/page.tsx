import Link from "next/link";
import BtnPry from "@/components/ui/BtnPry";

export default function ContactoPage() {
    return (
        <main className="bg-[#083e45] w-full min-h-screen pt-[192px] pb-[96px] relative overflow-hidden">
            <div className="grid-desktop w-full h-full">

                {/* Top Heading */}
                <div className="col-span-12">
                    <h1 className="font-sans font-normal text-[#48d7de] text-[40px] lg:text-[72px] leading-[tight] lg:leading-[80px] text-left max-w-[1024px] mb-[48px]">
                        Hablemos sobre cómo podemos impulsar tu hotel
                    </h1>
                </div>

                <div className="col-span-12 lg:col-span-8 lg:col-start-5 flex flex-col items-center">

                    {/* White Form Card */}
                    <div className="bg-white rounded-[24px] p-[32px] lg:p-[48px] flex flex-col items-start w-full">
                        <h2 className="font-sans text-[24px] lg:text-[32px] text-[#1a1a1a] mb-[48px] w-full text-left">
                            Déjanos tus datos y nos pondremos en contacto contigo lo antes posible.
                        </h2>

                        <form className="w-full flex flex-col gap-[64px] items-stretch">
                            {/* Inputs Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[48px] gap-x-[24px] w-full">

                                {/* Nombre */}
                                <div className="col-span-1 md:col-span-12 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Nombre</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tu nombre completo"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-span-1 md:col-span-6 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Email</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="hola@ejemplo.com"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                        required
                                    />
                                </div>

                                {/* Teléfono */}
                                <div className="col-span-1 md:col-span-6 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Teléfono</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+34"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                    />
                                </div>

                                {/* Mensaje */}
                                <div className="col-span-1 md:col-span-12 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Mensaje</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <textarea
                                        placeholder="¿En qué podemos ayudarte?"
                                        rows={4}
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[24px] w-full outline-none focus:ring-2 focus:ring-[#48d7de] resize-none"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {/* Enviar Button */}
                            <div className="mt-[16px] flex w-full justify-center lg:justify-end">
                                <button type="submit" className="bg-[#48d7de] rounded-[99px] px-[40px] py-[24px] flex items-center justify-center gap-[12px] w-fit hover:scale-[0.98] transition-transform active:scale-95 group">
                                    <p className="font-['Gebuk'] text-[32px] text-[#083e45] leading-[normal] mt-1">
                                        Enviar
                                    </p>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                        <path d="M6 18V8H9V12.75L15.8 5.95L18 8.15L11.15 15H16V18H6Z" fill="#083e45" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    );
}
