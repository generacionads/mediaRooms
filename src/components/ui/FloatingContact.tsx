"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import BtnRounded from "@/components/ui/BtnRounded";

export default function FloatingContact() {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        // We need to wait a tiny bit for the new page's DOM to paint after a route change
        const checkAndObserve = () => {
            const target = document.querySelector("#footerDEF");
            if (!target) return null;

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
            return observer;
        };

        // Try immediately
        let observer = checkAndObserve();

        // If not found yet (e.g. Next.js transition in progress), set a small timeout fallback
        let timeoutId: NodeJS.Timeout;
        if (!observer) {
            timeoutId = setTimeout(() => {
                observer = checkAndObserve();
            }, 500);
        }

        return () => {
            if (observer) observer.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [pathname]);

    return (
        <div className="fixed bottom-[48px] left-0 w-full pointer-events-none z-40 flex justify-center">
            <div className="max-w-[1512px] w-full px-6 flex flex-col items-start gap-[24px]">
                <div className="pointer-events-auto flex flex-col gap-[24px]">
                    <a href="tel:+34611191139">
                        <BtnRounded variant="telf-closed" isForcedOpen={isFooterVisible} />
                    </a>
                    <a href="mailto:hola@mediarooms.es">
                        <BtnRounded variant="mail-closed" isForcedOpen={isFooterVisible} />
                    </a>
                </div>
            </div>
        </div>
    );
}
