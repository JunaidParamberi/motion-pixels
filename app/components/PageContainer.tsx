"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  bgContent?: ReactNode;
  className?: string;
}

export default function PageContainer({ children, bgContent, className = "" }: PageContainerProps) {
  return (
    <motion.div
      className={`w-full min-h-screen container mx-auto px-4 py-32 relative ${className}`.trim()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {bgContent && (
        <motion.div
          className="fixed inset-0 -z-20 overflow-hidden [will-change:transform]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {bgContent}
        </motion.div>
      )}
      <div className="fixed inset-0 bg-black/60 -z-10" />
      {children}
    </motion.div>
  );
}
