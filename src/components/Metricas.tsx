"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircleProgress } from "@/components/ui/CircleProgress";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const METRICAS_DATA = [
    {
        id: "ingresos",
        value: 26,
        maxValue: 43.3, // 26 / 43.3 ≈ 60%
        displayValue: "26",
        suffix: "%",
        label: "Incremento de ingresos al año"
    },
    {
        id: "roas",
        value: 2754,
        maxValue: 3060, // 2754 / 3060 = 90%
        displayValue: "2754",
        suffix: "%",
        label: "ROAS medio"
    },
    {
        id: "cpa",
        value: 39.4,
        maxValue: 56.3, // 39.4 / 56.3 ≈ 70%
        displayValue: "39,4",
        suffix: "€",
        label: "CPA medio"
    }
];

export default function Metricas() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useGSAP(() => {
        if (!sectionRef.current) return;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 75%", // Triggers when the top of the section hits 75% down the viewport
            onEnter: () => setIsVisible(true),
            once: true // Only animate in once
        });

        // Small fade up animation for the layout parts
        gsap.from(".metricas-fade", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="metricas" className="relative w-full bg-[#083e45] text-white pt-[100px] pb-[100px] lg:pt-[200px] lg:pb-[150px]">
            <div className="grid-desktop">

                {/* Top Block: Heading spanning full width */}
                <div className="col-span-12 flex flex-col items-start gap-8 metricas-fade">
                    <div className="border border-[#48d7de] rounded-full px-6 lg:px-[32px] py-3 lg:py-[24px]">
                        <span className="font-['Gebuk'] text-[24px] lg:text-[32px] leading-none text-white tracking-wide">
                            Nuestra estrategia
                        </span>
                    </div>

                    <h3 className="font-sans text-[40px] lg:text-[60px] leading-[1.1] text-[#48d7de] font-normal tracking-tight w-full max-w-[1320px]">
                        Implementamos soluciones tecnológicas y de marketing que generan un crecimiento medible en las reservas directas.
                    </h3>
                </div>

                {/* Bottom Block: Stats Columns shifted right to match Strategy */}
                <div className="col-span-12 lg:col-span-10 lg:col-start-3 flex flex-col lg:flex-row gap-[40px] lg:gap-[64px] justify-between mt-[60px] lg:mt-[80px] metricas-fade w-full h-full">
                    {METRICAS_DATA.map((item, i) => (
                        <div key={item.id} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full lg:max-w-[280px]">

                            {/* Circle Progress */}
                            <CircleProgress
                                value={isVisible ? item.value : 0}
                                maxValue={item.maxValue} // Fills to specific percentage instead of 100%
                                size={120}
                                strokeWidth={2.5}
                                animationDuration={1500 + (i * 200)} // Staggered animations
                                getColor={() => "stroke-[#48d7de]"} // Solid cyan color matching Figma
                                className="mb-4 text-[#48d7de]"
                            />

                            {/* Large Number */}
                            <div className="font-['Gebuk'] text-[80px] lg:text-[96px] leading-none text-white tracking-wide">
                                {isVisible ? item.displayValue : 0}<span className="text-[60px] lg:text-[96px]">{item.suffix}</span>
                            </div>

                            {/* Optional formatting to match Figma's multi-line text exactly */}
                            <p className="font-sans text-[18px] lg:text-[20px] leading-tight text-white whitespace-pre-wrap">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
