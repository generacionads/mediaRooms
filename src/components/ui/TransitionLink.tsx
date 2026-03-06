"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
    children: React.ReactNode;
    href: string;
}

export default function TransitionLink({
    children,
    href,
    onClick,
    ...props
}: TransitionLinkProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleTransitionClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (onClick) onClick(e);

        // If we are already on this path, just act like a normal anchor link (e.g. scroll to top)
        if (window.location.pathname === href) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        // Prevent multiple overlays from stacking if the user spam-clicks
        if (document.getElementById("page-transition-overlay")) return;

        // Scale down the clicked link to mimic a permanently held pressed state
        e.currentTarget.style.transform = "scale(0.93)";
        e.currentTarget.style.transition = "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)";

        // 1. Create a full-screen overlay covering everything
        const overlay = document.createElement("div");
        overlay.id = "page-transition-overlay";
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.backgroundColor = "transparent"; // Start transparent
        overlay.style.zIndex = "9999999";
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1), background-color 0.8s cubic-bezier(0.76, 0, 0.24, 1)";
        overlay.style.pointerEvents = "all"; // Block clicks while transitioning

        document.body.appendChild(overlay);

        // 2. Trigger the color fade in the next frame
        requestAnimationFrame(() => {
            overlay.style.opacity = "1";
            overlay.style.backgroundColor = "rgba(72, 215, 222, 1)"; // Fully solid #48d7de to match the primary cyan
        });

        // 3. Wait for the fade-out illusion to finish, then navigate
        setTimeout(() => {
            startTransition(() => {
                router.push(href);
            });

            // 4. After navigation, fade the overlay back out
            // We give it a slight delay to allow the new page component to mount
            setTimeout(() => {
                // Return pointer events to the page
                overlay.style.pointerEvents = "none";
                overlay.style.opacity = "0";
                overlay.style.backgroundColor = "transparent";

                // 5. Remove from DOM once completely invisible
                setTimeout(() => {
                    overlay.remove();
                }, 800); // Changed to match the new 0.8s CSS transition

            }, 400); // 400ms delay to ensure the new DOM settles before pulling the curtain 
        }, 800); // Wait 800ms for the inward transition to complete
    };

    return (
        <Link href={href} onClick={handleTransitionClick} {...props}>
            {children}
        </Link>
    );
}
