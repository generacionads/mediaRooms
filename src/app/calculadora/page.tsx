"use client";

import { useState } from "react";
import Link from "next/link";
import BtnPry from "@/components/ui/BtnPry";

export default function CalculadoraPaso1() {
    const [step, setStep] = useState(1);

    // Form States
    const [numHabitaciones, setNumHabitaciones] = useState("50");
    const [reservasAnuales, setReservasAnuales] = useState("");
    const [porcentajeWeb, setPorcentajeWeb] = useState("15");
    const [comisionOta, setComisionOta] = useState("18"); // Percentage
    const [ticketMedio, setTicketMedio] = useState("850");

    // Result States
    const [ahorroEstimado, setAhorroEstimado] = useState(0);
    const [rentabilidad, setRentabilidad] = useState(0);

    const calculateSavings = () => {
        // Parse inputs securely
        const rAnuales = parseFloat(reservasAnuales.replace(/\./g, '').replace(/,/g, '.')) || 0;
        const pWeb = parseFloat(porcentajeWeb.replace(/%/g, '')) || 0;
        const cOta = parseFloat(comisionOta.replace(/%/g, '')) || 0;
        const ticket = parseFloat(ticketMedio.replace(/\./g, '').replace(/,/g, '').replace(/€/g, '')) || 0;

        // Current Situation
        const pOta = 100 - pWeb; // Percentage of bookings from OTAs
        const totalIngresos = rAnuales * ticket;

        const ingresosOta = totalIngresos * (pOta / 100);
        const costeOtaActual = ingresosOta * (cOta / 100);

        // Projected Situation: mediaRooms strategy shifts e.g. 25% of OTA bookings to Direct Web
        const shiftToDirect = 25; // Target shift percentage
        const transvasoIngresos = ingresosOta * (shiftToDirect / 100);

        // Let's assume the blended cost of direct acquisition (Ads + tools) is around 6% 
        // compared to the heavy 18-20% from OTAs.
        const costeDirectoEstimado = transvasoIngresos * 0.06;
        const costeOtaAhorrado = transvasoIngresos * (cOta / 100);

        // Final Formula
        const ahorroNetoAnual = Math.round(costeOtaAhorrado - costeDirectoEstimado);

        // If they barely have OTAs or weird numbers, ensure a minimum positive phrasing
        setAhorroEstimado(Math.max(0, ahorroNetoAnual));

        // Rentabilidad ratio over the shifted amount
        const porcentajeMejora = costeOtaAhorrado > 0 ? ((costeOtaAhorrado - costeDirectoEstimado) / costeOtaAhorrado) * 100 : 0;
        setRentabilidad(Math.round(Math.max(0, Math.min(porcentajeMejora, 99))));
    };

    const handleNext1 = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleNext2 = (e: React.FormEvent) => {
        e.preventDefault();
        calculateSavings();
        setStep(3);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
    };

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
                        {/* Step 1 */}
                        <div className={`w-[64px] h-[64px] rounded-full flex items-center justify-center transition-colors ${step >= 1 ? 'bg-[#48d7de]' : 'bg-[#1c5d63] opacity-80'}`}>
                            <span className="font-sans text-[24px] text-[#083e45]">1</span>
                        </div>
                        {/* Step 2 */}
                        <div className={`w-[64px] h-[64px] rounded-full flex items-center justify-center transition-colors ${step >= 2 ? 'bg-[#48d7de]' : 'bg-[#1c5d63] opacity-80'}`}>
                            <span className="font-sans text-[24px] text-[#083e45]">2</span>
                        </div>
                        {/* Step 3 */}
                        <div className={`w-[64px] h-[64px] rounded-full flex items-center justify-center transition-colors ${step >= 3 ? 'bg-[#48d7de]' : 'bg-[#1c5d63] opacity-80'}`}>
                            <span className="font-sans text-[24px] text-[#083e45]">3</span>
                        </div>
                    </div>

                    {/* White Form Card */}
                    <div className="bg-white rounded-[24px] p-[32px] lg:p-[48px] flex flex-col items-start w-full">

                        {step === 1 && (
                            <>
                                <h2 className="font-sans text-[24px] lg:text-[32px] text-[#1a1a1a] mb-[48px] w-full text-left">
                                    Paso 1: introduce los siguientes datos sobre tu hotel.
                                </h2>

                                <form className="w-full flex flex-col gap-[64px] items-stretch" onSubmit={handleNext1}>
                                    {/* Inputs Grid Layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[48px] gap-x-[24px] w-full">

                                        {/* 1. Número de habitaciones (Wide) */}
                                        <div className="col-span-1 md:col-span-7 flex flex-col gap-[8px]">
                                            <label className="font-sans text-[16px] tracking-[0.16px]">
                                                <span className="text-[#9f2b1e]">Número de habitaciones totales</span> <span className="text-[#ed0131]">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Ej: 50"
                                                value={numHabitaciones}
                                                onChange={(e) => setNumHabitaciones(e.target.value)}
                                                className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                                required
                                            />
                                        </div>

                                        {/* 2. Días abierto al año (Narrow) */}
                                        <div className="col-span-1 md:col-span-5 flex flex-col gap-[8px]">
                                            <label className="font-sans text-[16px] tracking-[0.16px]">
                                                <span className="text-[#9f2b1e]">Días abierto al año</span> <span className="text-[#ed0131]">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Ej: 365"
                                                defaultValue="365"
                                                className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                                required
                                                min="1"
                                                max="365"
                                            />
                                        </div>

                                        {/* 3. Número de reservas anuales (Wide) */}
                                        <div className="col-span-1 md:col-span-6 flex flex-col gap-[8px]">
                                            <label className="font-sans text-[16px] tracking-[0.16px]">
                                                <span className="text-[#9f2b1e]">Nº de reservas totales anuales</span> <span className="text-[#ed0131]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Ej: 4.500"
                                                value={reservasAnuales}
                                                onChange={(e) => setReservasAnuales(e.target.value)}
                                                className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                                required
                                            />
                                        </div>

                                        {/* 4. Ticket medio */}
                                        <div className="col-span-1 md:col-span-6 flex flex-col gap-[8px]">
                                            <label className="font-sans text-[16px] tracking-[0.16px]">
                                                <span className="text-[#9f2b1e]">Valor promedio por reserva (€)</span> <span className="text-[#ed0131]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Ej: 850€"
                                                value={ticketMedio}
                                                onChange={(e) => setTicketMedio(e.target.value)}
                                                className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                                required
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
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="w-full flex justify-start mb-[16px]">
                                    <button type="button" onClick={() => setStep(1)} className="text-[#083e45] font-sans text-[16px] hover:underline flex items-center gap-[8px]">
                                        &larr; Volver al Paso 1
                                    </button>
                                </div>
                                <h2 className="font-sans text-[24px] lg:text-[32px] text-[#1a1a1a] mb-[48px] w-full text-left">
                                    Paso 2: cuéntanos qué margen de reservas te cuestan dinero.
                                </h2>

                                <form className="w-full flex flex-col gap-[64px] items-stretch" onSubmit={handleNext2}>

                                    <div className="grid grid-cols-1 gap-y-[48px] gap-x-[24px] w-full">
                                        <div className="flex flex-col gap-[8px]">
                                            <label className="font-sans text-[16px] tracking-[0.16px]">
                                                <span className="text-[#9f2b1e]">¿Qué porcentaje de ventas provienen de web propia? (%)</span> <span className="text-[#ed0131]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Ej: 15%"
                                                value={porcentajeWeb}
                                                onChange={(e) => setPorcentajeWeb(e.target.value)}
                                                className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col gap-[8px]">
                                            <label className="font-sans text-[16px] tracking-[0.16px]">
                                                <span className="text-[#9f2b1e]">¿Qué porcentaje de comisión aproximado pagas a las OTAs? (Booking, Expedia...)</span> <span className="text-[#ed0131]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Ej: 18%"
                                                value={comisionOta}
                                                onChange={(e) => setComisionOta(e.target.value)}
                                                className="bg-[#083e45] text-[#48d7de] text-[16px] font-sans p-[16px] px-[24px] rounded-[99px] w-full outline-none focus:ring-2 focus:ring-[#48d7de]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-[16px] flex w-full justify-center">
                                        <button type="submit" className="bg-[#48d7de] rounded-[99px] px-[40px] py-[24px] flex items-center justify-center gap-[12px] w-fit hover:scale-[0.98] transition-transform active:scale-95 group">
                                            <p className="font-['Gebuk'] text-[32px] text-[#083e45] leading-[normal] mt-1">
                                                Calcular Ahorro
                                            </p>
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col items-center justify-center w-full gap-[24px] py-[32px]">
                                <div className="w-full flex justify-start mb-[24px]">
                                    <button type="button" onClick={() => setStep(2)} className="text-[#083e45] font-sans text-[16px] hover:underline flex items-center gap-[8px]">
                                        &larr; Volver al Paso 2
                                    </button>
                                </div>

                                <p className="font-sans font-normal leading-[1.2] text-[#1a1a1a] text-[24px] lg:text-[32px] text-left w-full">
                                    Si aplicaramos nuestra estrategia directa para recuperar el 25% de las ventas que actualmente se llevan las OTAs, podrías llegar a ahorrar:
                                </p>

                                <div className="bg-[#f0f9fa] rounded-[24px] p-[32px] lg:p-[48px] border border-[#48d7de] w-full flex flex-col items-center gap-[16px] my-[24px]">
                                    <p className="font-['Gebuk'] text-[#083e45] text-[64px] lg:text-[96px] leading-none">
                                        +{rentabilidad}%
                                    </p>
                                    <p className="font-sans text-[#1c5d63] text-[18px] lg:text-[20px] text-center">
                                        De rentabilidad extra en tus reservas por la reducción de las comisiones en OTAs.
                                    </p>
                                </div>

                                <div className="mt-[40px] flex w-full justify-center">
                                    <Link href="/contacto">
                                        <button type="button" className="bg-[#48d7de] rounded-[99px] px-[40px] py-[24px] flex items-center justify-center gap-[12px] w-fit hover:scale-[0.98] transition-transform active:scale-95 group">
                                            <p className="font-['Gebuk'] text-[32px] text-[#083e45] leading-[normal] mt-1">
                                                Solicitar información
                                            </p>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                                <path d="M6 18V8H9V12.75L15.8 5.95L18 8.15L11.15 15H16V18H6Z" fill="#083e45" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
