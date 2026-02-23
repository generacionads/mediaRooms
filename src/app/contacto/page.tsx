export default function Contacto() {
    return (
        <main className="bg-[#083e45] w-full min-h-screen pt-[192px] pb-[96px] relative overflow-hidden flex flex-col items-center">
            <div className="grid-desktop w-full relative z-10 flex-grow">
                {/* Left Column: Heading */}
                <div className="col-span-12 lg:col-span-6 flex items-start">
                    <h1 className="font-sans font-normal text-[#48d7de] text-[40px] lg:text-[60px] leading-[tight] lg:leading-[70px] whitespace-pre-wrap max-w-[766px]">
                        Soluciones digitales de marketing y desarrollo para hoteles
                    </h1>
                </div>

                {/* Right Column: Form Card */}
                <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-12 lg:mt-0">
                    <div className="bg-white border border-[#e7e5e4] rounded-[24px] p-[24px] lg:p-[48px] flex flex-col gap-[24px] w-full max-w-[490px] mx-auto lg:mx-0">
                        <h2 className="font-['Gebuk'] text-[#1a1a1a] text-[32px] lg:text-[48px] leading-[normal]">
                            Rellena el formulario
                        </h2>

                        <form className="flex flex-col gap-[48px] w-full items-center">
                            <div className="flex flex-col gap-[24px] w-full">
                                {/* Name Input */}
                                <div className="flex flex-col gap-[2px] w-full">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Nombre</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Federico"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[12px] px-[20px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col gap-[2px] w-full">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">E-mail</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="f.tan@gmail.com"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[12px] px-[20px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="flex flex-col gap-[2px] w-full">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Teléfono</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+34 666 66 66 66"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[12px] px-[20px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                    />
                                </div>

                                {/* Comments Textarea */}
                                <div className="flex flex-col gap-[2px] w-full">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Comentario</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <textarea
                                        placeholder="Escribe un mensaje"
                                        rows={5}
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[20px] rounded-[24px] w-full outline-none resize-none focus:ring-2 focus:ring-[#48d7de]"
                                    />
                                </div>
                            </div>

                            {/* Submit Button manually matching BtnPry sizing */}
                            <button type="submit" className="bg-[#48d7de] rounded-[99px] px-[32px] py-[24px] flex items-center justify-center gap-[12px] w-fit hover:scale-[0.98] transition-transform active:scale-95 group">
                                <p className="font-['Gebuk'] text-[32px] text-[#083e45] leading-[normal]">
                                    Infórmate gratis
                                </p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M6 18V8H9V12.75L15.8 5.95L18 8.15L11.15 15H16V18H6Z" fill="#083e45" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
