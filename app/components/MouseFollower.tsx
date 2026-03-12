"use client";

import { motion, useSpring } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "zoom" | "play";

const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };

export default function MouseFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const closest = target?.closest("[data-cursor],a,button");
      const datasetType = closest?.getAttribute("data-cursor");

      if (datasetType === "zoom") {
        setMode("zoom");
      } else if (datasetType === "play") {
        setMode("play");
      } else if (
        closest instanceof HTMLAnchorElement ||
        closest instanceof HTMLButtonElement ||
        closest?.getAttribute("role") === "button" ||
        datasetType === "link"
      ) {
        setMode("link");
      } else {
        setMode("default");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related || !related.closest("[data-cursor],a,button")) {
        setMode("default");
      }
    };

    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="fixed max-md:hidden top-0 left-0 z-[60] pointer-events-none mix-blend-screen"
      style={{ x, y }}
      aria-hidden
    >
      {/* Outer soft glow */}
      <motion.div
        className="w-20 h-20 rounded-full bg-white/5 blur-3xl"
        animate={{
          opacity: mode === "default" ? 0.25 : 0.55,
          scale: mode === "default" ? 1 : 1.15,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      />
      {/* Inner content by mode */}
      {mode === "default" && (
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.8)]"
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
        />
      )}
      {mode === "link" && (
        <motion.div
          className="absolute inset-0 m-auto flex items-center justify-center"
          animate={{ scale: 1 }}
        >
          <div className="w-7 h-7 rounded-full border border-white/80 bg-transparent" />
        </motion.div>
      )}
      {mode === "zoom" && (
        <motion.div
          className="absolute inset-0 m-auto flex items-center justify-center text-white/90"
          animate={{ scale: 1 }}
        >
          <div className="w-8 h-8 rounded-full border border-white/80 bg-black/40 flex items-center justify-center text-xs font-semibold tracking-[0.2em] uppercase">
            +
          </div>
        </motion.div>
      )}
      {mode === "play" && (
        <motion.div
          className="absolute inset-0 m-auto flex items-center justify-center"
          animate={{ scale: 1 }}
        >
          <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.7)]">
            <span className="ml-0.5 text-xs">▶</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const size = 40; // cursor wrapper half-size (80px)
      x.set(clientX - size);
      y.set(clientY - size);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [x, y]);

  return { x, y };
}
