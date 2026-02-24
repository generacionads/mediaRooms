"use client";

import { useState, useEffect } from "react";
import BtnRounded from "@/components/ui/BtnRounded";

export default function FloatingContact() {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const target = document.querySelector("#footerDEF");
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsFooterVisible(entry.isIntersecting);
                });
            },
            {
                root: null, // viewport
                rootMargin: "0px 0px 50px 0px", // Trigger 50px before footer enters viewport
                threshold: 0, // trigger as soon as ONE pixel of the footer is visible
            }
        );

        observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, []);

    return (
        <div className="fixed bottom-[48px] left-6 lg:left-[96px] flex flex-col items-start gap-[24px] z-40 pointer-events-auto">
            <a href="tel:+34611191139">
                <BtnRounded variant="telf-closed" isForcedOpen={isFooterVisible} />
            </a>
            <a href="mailto:hola@mediarooms.es">
                <BtnRounded variant="mail-closed" isForcedOpen={isFooterVisible} />
            </a>
        </div>
    );
}
