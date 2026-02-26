"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import Icon from "../Assets/Logo/Icon.png";

const INITIAL_LOAD_DURATION_MS = 1400;
const REVEAL_DURATION_S = 0.8;

function LoaderContent() {
  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 bg-black"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-black"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      />
    </>
  );
}

/**
 * Only shows on initial app load (first paint). Not shown on route changes.
 * Next.js loading.tsx still shows when a route segment is loading (data/assets delayed).
 */
export default function InitialLoadReveal() {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const revealR = useMotionValue(0);
  const maskImage = useTransform(revealR, (v) =>
    `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${v}%, black ${v}%)`
  );

  const showOverlay = !initialLoadComplete || isRevealing;

  useEffect(() => {
    const t = setTimeout(() => {
      setIsRevealing(true);
      revealR.set(0);
      animate(revealR, 150, {
        type: "tween",
        duration: REVEAL_DURATION_S,
        ease: [0.33, 1, 0.68, 1],
        onComplete: () => {
          setIsRevealing(false);
          setInitialLoadComplete(true);
        },
      });
    }, INITIAL_LOAD_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  if (!showOverlay) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        maskSize: "cover",
        WebkitMaskSize: "cover",
      }}
    >
      <LoaderContent />
    </motion.div>
  );
}
