"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BtnMenu from "@/components/ui/BtnMenu";
import BtnPry from "@/components/ui/BtnPry";
import Enlaces from "@/components/ui/Enlaces";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // States for the custom page transition sequence
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [navPhase, setNavPhase] = useState<0 | 1 | 2>(0);
  const [isPending, startTransition] = useTransition();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    // Reset transition states when opening/closing normally
    setClickedId(null);
    setNavPhase(0);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    if (navPhase !== 0) return; // Prevent double clicks

    setClickedId(id);
    setNavPhase(1); // Phase 1: Hide unselected elements

    setTimeout(() => {
      setNavPhase(2); // Phase 2: Hide the selected element

      // Small delay before starting the route transition to allow Phase 2 animation to play
      setTimeout(() => {
        if (window.location.pathname === href) {
          // We are already on the page, don't trigger a router push, just close the menu
          setIsMenuOpen(false);
          setTimeout(() => {
            setNavPhase(0);
            setClickedId(null);
          }, 600);
        } else {
          isNavigatingRef.current = true;
          // In Next.js App Router, wrapping router.push in startTransition allows tracking page load
          startTransition(() => {
            router.push(href);
          });
        }
      }, 300);
    }, 400);
  };

  // Effect to securely close the menu only AFTER the new page has finished loading in the background
  useEffect(() => {
    // If we flagged navigation but isPending has flipped from true to false, it means loading is done
    if (isNavigatingRef.current && !isPending) {
      isNavigatingRef.current = false;
      setIsMenuOpen(false); // Phase 3: Slide up menu, revealing the new page that's already loaded underneath
      setTimeout(() => {
        setNavPhase(0); // Phase 4: clean resets immediately
        setClickedId(null);
      }, 600);
    }
  }, [isPending]);

  // Helper to determine the animation state of an element during the exit sequence
  const getNavAnimation = (id: string) => {
    if (navPhase === 2) return { opacity: 0, y: 20 }; // Everything fades down in Phase 2
    if (navPhase === 1 && clickedId !== id) return { opacity: 0, y: 20 }; // Hide others in Phase 1 start with fade down
    return { opacity: 1, y: 0 }; // Default state
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex items-start justify-between px-6 lg:px-[96px] bg-[#48d7de] overflow-hidden ${isScrolled && !isMenuOpen ? "py-[10px]" : "py-[20px] lg:py-[26px]"
          } ${!isMenuOpen ? "pointer-events-none" : ""}`}
        style={{
          height: isMenuOpen ? "100vh" : (isScrolled ? "92px" : "127px"),
          transition: "height 0.6s cubic-bezier(0.76, 0, 0.24, 1), padding 0.6s cubic-bezier(0.76, 0, 0.24, 1)"
        }}
      >
        <Link
          href="/"
          className={`flex items-center gap-[2px] pt-[12px] pointer-events-auto cursor-pointer`}
          style={{
            transform: isScrolled ? "scale(0.75)" : "scale(1)",
            transformOrigin: "left center",
            transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)"
          }}
        >
          <span className="font-['Gebuk'] text-[32px] lg:text-[47px] tracking-[-0.94px] text-white">
            media
          </span>
          <span className="font-['Gebuk'] text-[32px] lg:text-[47px] tracking-[-0.47px] text-[#083e45]">
            Rooms
          </span>
        </Link>

        <div
          className="pointer-events-auto z-10 w-fit h-fit"
          style={{
            transform: isScrolled ? "scale(0.75)" : "scale(1)",
            transformOrigin: "right center",
            transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)"
          }}
        >
          <BtnMenu
            variant={isMenuOpen ? "btn_open" : "btn_close"}
            onClick={toggleMenu}
          />
        </div>

        <div
          className="absolute top-[160px] lg:top-[226px] left-0 w-full h-[calc(100vh-160px)] lg:h-auto text-white pointer-events-auto"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? "visible" : "hidden",
            transition: "opacity 0.4s ease-out, visibility 0.4s",
          }}
        >
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="grid-desktop relative h-full lg:h-auto"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                }}
              >
                {/* Menu Links */}
                <div className="flex flex-col gap-[32px] lg:gap-[64px] col-span-12 w-full lg:w-[1320px]">
                  <div className="flex flex-col gap-[12px] w-full items-start">
                    <motion.div
                      animate={getNavAnimation("link_inicio")}
                      transition={{ duration: 0.3 }}
                    >
                      <Enlaces href="/" variant="link_default" onClick={(e) => handleNavClick(e, "/", "link_inicio")}>
                        Inicio
                      </Enlaces>
                    </motion.div>
                    <motion.div
                      animate={getNavAnimation("link_calculadora")}
                      transition={{ duration: 0.3 }}
                    >
                      <Enlaces href="/calculadora" variant="link_default" onClick={(e) => handleNavClick(e, "/calculadora", "link_calculadora")}>
                        Calculadora de ahorro
                      </Enlaces>
                    </motion.div>
                  </div>

                  <div className="flex w-fit">
                    <motion.a
                      href="/calculadora"
                      className="w-fit cursor-pointer"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "/calculadora", "btn_calculadora")}
                      animate={getNavAnimation("btn_calculadora")}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                        }}
                      >
                        <BtnPry theme="dark" />
                      </motion.div>
                    </motion.a>
                  </div>
                </div>

                {/* Contact Info Footer */}
                <motion.div
                  className="absolute bottom-[40px] lg:bottom-auto lg:top-[694px] left-6 lg:left-[96px] flex flex-col lg:flex-row gap-2 lg:gap-12 font-sans text-[16px] lg:text-[20px] text-[#083e45]"
                  animate={navPhase > 0 ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                  }}
                >
                  <a href="tel:+34611191139">+34 611 19 11 39</a>
                  <a href="mailto:hola@mediarooms.es">hola@mediarooms.es</a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
