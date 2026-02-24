"use client";

import { motion } from "framer-motion";
import BtnPry from "./BtnPry";
import BtnMenu from "./BtnMenu";
import Link from "next/link";

export type StatData = {
    value: string;
    label: string;
    desc: string;
};

export type ServiceData = {
    id: string;
    title: string;
    description: string;
    modalTitle?: string;
    modalDescription?: string;
    stats?: StatData[];
    image?: string;
};

export type ServiciosModalProps = {
    isOpen: boolean;
    onClose: () => void;
    service: ServiceData | null;
    hideIcon?: boolean;
    hideButton?: boolean;
    maxWidth?: string;
};

export default function ServiciosModal({ isOpen, onClose, service, hideIcon = false, hideButton = false, maxWidth = "max-w-[500px]" }: ServiciosModalProps) {
    if (!isOpen || !service) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 lg:p-12 lg:pr-[40px] overflow-hidden">
            {/* Blurred Backdrop */}
            <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Modal Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                className={`bg-[#48d7de] relative z-10 w-full ${maxWidth} max-h-[90vh] lg:max-h-[800px] rounded-[24px] p-[24px] lg:p-[48px] flex flex-col gap-[32px] overflow-y-auto shadow-2xl`}
            >
                {/* Header (Icon + Close) */}
                <div className="flex justify-between items-start w-full">
                    {hideIcon ? (
                        <div className="flex-1" /> // Spacer to push close button to right
                    ) : (
                        <div className="w-[64px] h-[64px] bg-[#083e45] shrink-0 rounded-[12px] flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18" stroke="#48d7de" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 18V6H6" stroke="#48d7de" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}

                    <BtnMenu variant="btn_open" onClick={onClose} text="Cerrar" className="shrink-0 ml-auto" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-[16px]">
                    <h3 className="font-sans text-[32px] lg:text-[40px] text-[#083e45] leading-[1.1] text-left">
                        {service.modalTitle || service.title}
                    </h3>
                    <p className="font-sans text-[16px] lg:text-[18px] text-[#083e45]/80 leading-relaxed text-left">
                        {service.modalDescription || service.description}
                    </p>
                </div>

                {/* Stats Container (Grid) */}
                {service.stats && service.stats.length > 0 && (
                    <div className={service.stats.length > 1 ? "grid grid-cols-1 md:grid-cols-12 gap-[16px]" : "flex flex-col gap-[16px]"}>
                        {service.stats.map((stat, idx) => {
                            const isFullWidth = service.stats && service.stats.length > 1 && idx === 0;
                            const colSpan = isFullWidth
                                ? "md:col-span-12 items-center text-center"
                                : "md:col-span-6 items-start text-left";

                            return (
                                <div key={idx} className={`bg-[#083e45]/5 border border-[#083e45]/10 rounded-[24px] p-[24px] flex flex-col justify-center gap-[8px] ${colSpan}`}>
                                    <div className={`flex flex-col xl:flex-row xl:items-baseline gap-[4px] xl:gap-[16px] ${isFullWidth ? 'justify-center' : 'justify-start'}`}>
                                        <span className="font-['Gebuk'] text-[40px] lg:text-[45px] text-[#083e45] leading-none shrink-0">
                                            {stat.value}
                                        </span>
                                        <span className="font-sans text-[20px] lg:text-[24px] text-[#083e45]/70 leading-normal">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="font-sans text-[14px] lg:text-[16px] text-[#083e45]/60 mt-1">
                                        {stat.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Button */}
                {!hideButton && (
                    <div className="w-full flex justify-center lg:justify-start">
                        <Link href="/calculadora" className="w-fit cursor-none" onClick={onClose}>
                            <BtnPry theme="dark" text="Calcula tu Ahorro" />
                        </Link>
                    </div>
                )}

            </motion.div>
        </div>
    );
}
