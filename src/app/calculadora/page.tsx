"use client";

import Link from "next/link";
import BtnPry from "@/components/ui/BtnPry";

export default function CalculadoraPaso1() {
    return (
        <main className="bg-[#083e45] w-full min-h-screen pt-[192px] pb-[96px] relative overflow-hidden">
            <div className="grid-desktop w-full h-full">

                {/* Top Heading */}
                <div className="col-span-12">
                    <h1 className="font-sans font-normal text-[#48d7de] text-[40px] lg:text-[72px] leading-[tight] lg:leading-[80px] text-left max-w-[1024px] mb-[48px]">
                        Calcula tu incremento estimado de rentabilidad con mediaRooms
                    </h1>
                </div>

                <div className="col-span-12 lg:col-span-8 lg:col-start-5 flex flex-col items-center">
                    {/* Step Indicators */}
                    <div className="flex gap-[16px] items-center mb-[40px] lg:mb-[80px]">
                        {/* Active Step 1 */}
                        <div className="w-[64px] h-[64px] rounded-full bg-[#48d7de] flex items-center justify-center">
                            <span className="font-sans text-[24px] text-[#083e45]">1</span>
                        </div>
                        {/* Inactive Step 2 */}
                        <div className="w-[64px] h-[64px] rounded-full bg-[#1c5d63] flex items-center justify-center opacity-80">
                            <span className="font-sans text-[24px] text-[#083e45]">2</span>
                        </div>
                        {/* Inactive Step 3 */}
                        <div className="w-[64px] h-[64px] rounded-full bg-[#1c5d63] flex items-center justify-center opacity-80">
                            <span className="font-sans text-[24px] text-[#083e45]">3</span>
                        </div>
                    </div>

                    {/* White Form Card */}
                    <div className="bg-white rounded-[24px] p-[32px] lg:p-[48px] flex flex-col items-start w-full">

                        <h2 className="font-sans text-[24px] lg:text-[32px] text-[#1a1a1a] mb-[48px] w-full text-left">
                            Paso 1: introduce los siguientes datos sobre tu hotel.
                        </h2>

                        <form className="w-full flex flex-col gap-[64px] items-stretch">

                            {/* Inputs Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[48px] gap-x-[24px] w-full">

                                {/* 1. Número de hoteles (Narrow) */}
                                <div className="col-span-1 md:col-span-5 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Número de hoteles</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="1"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                        required
                                    />
                                </div>

                                {/* 2. Número de habitaciones (Wide) */}
                                <div className="col-span-1 md:col-span-7 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Número de habitaciones</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="50"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                    />
                                </div>

                                {/* 3. Número de reservas directas (Wide) */}
                                <div className="col-span-1 md:col-span-7 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Número de reservas directas en la última campaña</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="88.500"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                        required
                                    />
                                </div>

                                {/* 4. Días abierto al año (Narrow) */}
                                <div className="col-span-1 md:col-span-5 flex flex-col gap-[8px]">
                                    <label className="font-sans text-[16px] tracking-[0.16px]">
                                        <span className="text-[#9f2b1e]">Días abierto al año</span> <span className="text-[#ed0131]">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="365"
                                        className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                        required
                                        min="1"
                                        max="365"
                                    />
                                </div>
                            </div>

                            {/* Siguiente Button */}
                            <div className="mt-[16px] flex w-full justify-center">
                                <button type="submit" className="bg-[#48d7de] rounded-[99px] px-[40px] py-[24px] flex items-center justify-center gap-[12px] w-fit hover:scale-[0.98] transition-transform active:scale-95 group">
                                    <p className="font-['Gebuk'] text-[32px] text-[#083e45] leading-[normal]">
                                        Siguiente
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
