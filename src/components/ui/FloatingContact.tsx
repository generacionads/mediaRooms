"use client";

import BtnRounded from "@/components/ui/BtnRounded";

export default function FloatingContact() {
    return (
        <div className="fixed bottom-[48px] left-[96px] flex flex-col items-start gap-[24px] z-40 pointer-events-auto">
            <a href="tel:+34611191139">
                <BtnRounded variant="telf-closed" />
            </a>
            <a href="mailto:hola@mediarooms.es">
                <BtnRounded variant="mail-closed" />
            </a>
        </div>
    );
}
