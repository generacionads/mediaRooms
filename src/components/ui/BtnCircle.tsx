"use client";

import { motion } from "framer-motion";

export type BtnCircleProps = {
    className?: string;
    onClick?: () => void;
};

const PATH_ARROW = "M6 18V8H9V12.75L15.8 5.95L18 8.15L11.15 15H16V18H6Z";

export default function BtnCircle({ className, onClick }: BtnCircleProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={onClick}
            className={`flex items-center justify-center relative rounded-[99px] h-[53px] w-[64px] bg-[#48d7de] text-[#083e45] cursor-pointer ${className || ""}`}
        >
            <div className="relative shrink-0 w-[17.5px] h-[17.5px] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-[24px] h-[24px] max-w-none">
                    <path d={PATH_ARROW} fill="currentColor" />
                </svg>
            </div>
        </motion.button>
    );
}
