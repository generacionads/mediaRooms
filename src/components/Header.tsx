"use client";

import { useState } from "react";
import Link from "next/link";
import BtnMenu from "@/components/ui/BtnMenu";
import BtnPry from "@/components/ui/BtnPry";
import Enlaces from "@/components/ui/Enlaces";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex items-start justify-between px-[96px] py-[26px] bg-[#48d7de] overflow-hidden ${!isMenuOpen ? "pointer-events-none" : ""
          }`}
        style={{
          height: isMenuOpen ? "100vh" : "127px",
          transition: "height 0.8s cubic-bezier(0.76, 0, 0.24, 1)"
        }}
      >
        <Link href="/" className="flex items-center gap-[2px] pt-[12px] pointer-events-auto cursor-pointer">
          <span className="font-['Gebuk'] text-[47px] tracking-[-0.94px] text-white">
            media
          </span>
          <span className="font-['Gebuk'] text-[47px] tracking-[-0.47px] text-[#083e45]">
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
          className="absolute top-[226px] left-0 w-full text-white pointer-events-auto"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? "visible" : "hidden",
            transition: "opacity 0.4s ease-out, visibility 0.4s",
          }}
        >
          <div className="grid-desktop relative">
            {/* Menu Links */}
            <div className="flex flex-col gap-[64px] col-span-12 w-full lg:w-[1320px]">
              <div className="flex flex-col gap-[12px] w-full items-start">
                <Enlaces href="#" variant="link_default">Inicio</Enlaces>
                <Enlaces href="#" variant="link_default">Calculadora de ahorro</Enlaces>
              </div>

              <div className="flex w-fit">
                <BtnPry theme="dark" />
              </div>
            </div>

            {/* Contact Info Footer */}
            <div className="absolute top-[694px] left-[96px] flex gap-12 font-sans text-[20px] text-[#083e45]">
              <a href="tel:+34611191139">+34 611 19 11 39</a>
              <a href="mailto:hola@mediarooms.es">hola@mediarooms.es</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
