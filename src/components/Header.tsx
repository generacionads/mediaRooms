"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BtnMenu from "@/components/ui/BtnMenu";
import BtnPry from "@/components/ui/BtnPry";
import Enlaces from "@/components/ui/Enlaces";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        <Link href="/" className="flex items-center gap-[2px] pt-[12px] pointer-events-auto cursor-pointer">
          <span className="font-['Gebuk'] text-[32px] lg:text-[47px] tracking-[-0.94px] text-white">
            media
          </span>
          <span className="font-['Gebuk'] text-[32px] lg:text-[47px] tracking-[-0.47px] text-[#083e45]">
            Rooms
          </span>
        </Link>

        <div className="pointer-events-auto z-10 w-fit h-fit">
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
          <div className="grid-desktop relative h-full lg:h-auto">
            {/* Menu Links */}
            <div className="flex flex-col gap-[32px] lg:gap-[64px] col-span-12 w-full lg:w-[1320px]">
              <div className="flex flex-col gap-[12px] w-full items-start">
                <Enlaces href="/" variant="link_default">Inicio</Enlaces>
                <Enlaces href="/calculadora" variant="link_default">Calculadora de ahorro</Enlaces>
              </div>

              <div className="flex w-fit">
                <Link href="/calculadora" className="w-fit cursor-pointer">
                  <BtnPry theme="dark" />
                </Link>
              </div>
            </div>

            {/* Contact Info Footer */}
            <div className="absolute bottom-[40px] lg:bottom-auto lg:top-[694px] left-6 lg:left-[96px] flex flex-col lg:flex-row gap-2 lg:gap-12 font-sans text-[16px] lg:text-[20px] text-[#083e45]">
              <a href="tel:+34611191139">+34 611 19 11 39</a>
              <a href="mailto:hola@mediarooms.es">hola@mediarooms.es</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
