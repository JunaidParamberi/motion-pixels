"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Icon from "./Assets/Logo/Icon.png";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10"
        >
          <Image
            src={Icon}
            alt="Motion Pixels"
            width={100}
            height={100}
            priority
            className="opacity-95"
          />
        </motion.div>

        <div className="relative mt-10 h-0.5 w-28 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            animate={{ x: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Curtain panels */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 bg-black"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-black"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  );
}
