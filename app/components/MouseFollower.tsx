"use client";

import { motion, useSpring } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

export default function MouseFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 w-16 h-16 bg-transparent border cursor-pointer rounded-full shadow-lg pointer-events-none z-50"
      style={{ x, y }}
    />
  );
}

const springConfig = { damping: 20, stiffness: 150 };

function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      x.set(clientX - 32); // Adjusted for half the size of the circle (16px radius)
      y.set(clientY - 32);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}
